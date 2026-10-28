"""
Small helper that sends one photo to our Roboflow classification model
and returns the scores per class, sorted from high to low.

Used by app.py (the Streamlit app) and evaluate.py (the test on unseen photos).
"""

import base64
import io
import os

import requests
from PIL import Image, ImageOps

HOSTS = ["https://serverless.roboflow.com", "https://classify.roboflow.com"]


def _prepare(image: Image.Image, max_side: int = 640) -> str:
    """Rotate according to EXIF, shrink to max 640 px and encode as base64 JPEG."""
    image = ImageOps.exif_transpose(image).convert("RGB")
    image.thumbnail((max_side, max_side))
    buf = io.BytesIO()
    image.save(buf, format="JPEG", quality=90)
    return base64.b64encode(buf.getvalue()).decode("ascii")


def _parse(data: dict) -> list[tuple[str, float]]:
    """Roboflow returns predictions as a list or as a dict, depending on the version."""
    preds = data.get("predictions", [])
    scores = []
    if isinstance(preds, dict):
        for name, v in preds.items():
            scores.append((name, float(v["confidence"] if isinstance(v, dict) else v)))
    else:
        for p in preds:
            scores.append((p["class"], float(p["confidence"])))
    if not scores and data.get("top"):
        scores = [(data["top"], float(data.get("confidence", 0)))]
    return sorted(scores, key=lambda s: s[1], reverse=True)


def classify(image: Image.Image, model_id: str, api_key: str) -> list[tuple[str, float]]:
    """model_id is the 'Model URL' from Roboflow (workspace/model-name) or 'project/version'.
    Returns [(class, confidence), ...]."""
    model_id = model_id.strip().strip("/")
    for prefix in ("https://", "http://"):
        if model_id.startswith(prefix):  # someone pasted a full link
            model_id = model_id.split("/", 3)[-1]
    body = _prepare(image)
    last_error = None
    for host in HOSTS:
        try:
            r = requests.post(
                f"{host}/{model_id}",
                params={"api_key": api_key, "confidence": 0},  # 0 = return the score of every class, not only the winner
                data=body,
                headers={"Content-Type": "application/x-www-form-urlencoded",
                         "Authorization": f"Bearer {api_key}"},
                timeout=30,
            )
            if r.status_code == 200:
                return _parse(r.json())
            last_error = f"{host}: HTTP {r.status_code} {r.text[:200]}"
        except requests.RequestException as e:
            last_error = f"{host}: {e}"
    raise RuntimeError(f"Roboflow did not answer. Last error: {last_error}")


def settings():
    """Read model id and API key from environment variables (or Streamlit secrets in app.py)."""
    return os.environ.get("ROBOFLOW_MODEL", ""), os.environ.get("ROBOFLOW_API_KEY", "")
