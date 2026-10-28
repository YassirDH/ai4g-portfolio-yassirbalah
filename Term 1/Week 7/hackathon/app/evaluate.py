"""
Honest test on photos the model has never seen
==============================================

Runs the Roboflow model on every photo in the `unseen/` folder (25 per class,
never uploaded to Roboflow) and writes:

  results/unseen_results.csv     per photo: true label, prediction, confidence
  results/confusion_matrix.png   which classes get mixed up
  results/report.md              scores in plain language

Run:
  PowerShell:  $env:ROBOFLOW_API_KEY="your_key"; $env:ROBOFLOW_MODEL="workspace/model-name"
  then:        python evaluate.py
"""

import csv
import sys
from collections import Counter
from pathlib import Path

from PIL import Image

from roboflow_client import classify, settings

CLASSES = ["asian_hornet", "european_hornet", "wasp", "hornet_hoverfly"]
CONFIDENT = 0.60
AH_ALERT = 0.25  # same as in app.py
HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "results"


def main(unseen_dir):
    model_id, api_key = settings()
    if not api_key or not model_id:
        sys.exit("Set ROBOFLOW_API_KEY and ROBOFLOW_MODEL first (see the top of this file).")
    OUT.mkdir(exist_ok=True)

    rows = []
    for true in CLASSES:
        for f in sorted(Path(unseen_dir, true).glob("*.jpg")):
            scores = classify(Image.open(f), model_id, api_key)
            scores = [(c, p) for c, p in scores if c in CLASSES] or scores  # drop Roboflow's empty extra class
            pred, conf = scores[0] if scores else ("none", 0.0)
            ah = dict(scores).get("asian_hornet", 0.0)
            rows.append({"file": f.name, "true": true, "pred": pred, "confidence": round(conf, 3),
                         "correct": pred == true, "not_sure": conf < CONFIDENT,
                         "asian_hornet_score": round(ah, 3),
                         "ah_warning": pred != "asian_hornet" and ah >= AH_ALERT})
            print(f"{'OK ' if pred == true else 'XX '} {true:16s} -> {pred:16s} {conf:.0%}  {f.name}")

    with open(OUT / "unseen_results.csv", "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    n = len(rows)
    acc = sum(r["correct"] for r in rows) / n
    matrix = Counter((r["true"], r["pred"]) for r in rows)

    # what matters most for the user
    ah = [r for r in rows if r["true"] == "asian_hornet"]
    ah_found = sum(r["pred"] == "asian_hornet" for r in ah)
    ah_rescued = sum(r["pred"] != "asian_hornet" and r["ah_warning"] for r in ah)
    extra_warnings = sum(r["ah_warning"] for r in rows if r["true"] != "asian_hornet")
    false_alarms = [r for r in rows if r["pred"] == "asian_hornet" and r["true"] != "asian_hornet"]
    confident = [r for r in rows if not r["not_sure"]]
    conf_acc = sum(r["correct"] for r in confident) / len(confident) if confident else 0

    lines = [
        "# Test on unseen photos",
        "",
        f"Model: `{model_id}` · {n} photos the model never saw (25 per class, Dutch iNaturalist observations).",
        "",
        f"- **Overall accuracy:** {acc:.0%} ({sum(r['correct'] for r in rows)}/{n})",
        f"- **Asian hornets recognised:** {ah_found}/{len(ah)} (the rest would be missed and not reported)",
        f"- **Missed Asian hornets that still get the extra warning** (Asian hornet score >= {AH_ALERT:.0%}): {ah_rescued}/{len(ah) - ah_found}",
        f"- **False alarms** (look-alike called Asian hornet): {len(false_alarms)}",
        f"- **Extra warnings on look-alikes** (the price of that safety net): {extra_warnings}",
        f"- **'Not sure' answers** (confidence < {CONFIDENT:.0%}): {n - len(confident)}/{n}",
        f"- **Accuracy when the app does give a verdict:** {conf_acc:.0%} ({len(confident)} photos)",
        "",
        "## Confusion matrix (rows = truth, columns = prediction)",
        "",
        "| truth \\ prediction | " + " | ".join(CLASSES) + " |",
        "|---|" + "---|" * len(CLASSES),
    ]
    for t in CLASSES:
        lines.append(f"| {t} | " + " | ".join(str(matrix[(t, p)]) for p in CLASSES) + " |")
    lines += ["", "## Every mistake", "", "| file | truth | prediction | confidence |", "|---|---|---|---|"]
    for r in rows:
        if not r["correct"]:
            lines.append(f"| {r['file']} | {r['true']} | {r['pred']} | {r['confidence']:.0%} |")
    (OUT / "report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        grid = [[matrix[(t, p)] for p in CLASSES] for t in CLASSES]
        fig, ax = plt.subplots(figsize=(6, 5))
        ax.imshow(grid, cmap="Greens")
        ax.set_xticks(range(4), CLASSES, rotation=30, ha="right")
        ax.set_yticks(range(4), CLASSES)
        ax.set_xlabel("prediction")
        ax.set_ylabel("truth")
        for i in range(4):
            for j in range(4):
                ax.text(j, i, grid[i][j], ha="center", va="center",
                        color="white" if grid[i][j] > 12 else "black")
        ax.set_title(f"Unseen photos · accuracy {acc:.0%}")
        fig.tight_layout()
        try:
            fig.savefig(OUT / "confusion_matrix.png", dpi=150)
        except OSError:
            print("Could not save confusion_matrix.png. Is it open in another program? Close it and run again.")
    except ImportError:
        print("(matplotlib not installed, skipped the picture)")

    print("\n" + "\n".join(lines[:11]))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else HERE.parent / "data" / "unseen")
