"""
Hornet Check - dataset scraper
==============================

Downloads photos of 4 look-alike insects observed in the NETHERLANDS from
iNaturalist (https://www.inaturalist.org), so we can train a Roboflow
classification model.

Only observations that are:
  - in the Netherlands
  - "research grade" (at least 2 people agree on the species)
  - photographed under an open licence (CC0, CC-BY, CC-BY-NC)

Classes (folder name = label in Roboflow):
  asian_hornet     Vespa velutina      invasive, report it
  european_hornet  Vespa crabro        native, leave it alone
  wasp             Vespula vulgaris + Vespula germanica
  hornet_hoverfly  Volucella zonaria + Volucella inanis (harmless flies that mimic hornets)

Output:
  hornet_data/train/<class>/*.jpg    -> upload this to Roboflow
  hornet_data/unseen/<class>/*.jpg   -> NOT uploaded; used to test the model on new images
  hornet_data/attribution.csv        -> photographer, licence and link for every photo
  hornet_data/summary.txt            -> counts per class
  hornet_data.zip                    -> everything above in one file

Rules we follow so the data is fair:
  - one photo per observation (no near-duplicate shots of the same insect)
  - at most MAX_PER_USER photos per photographer per class (no single person dominates)
  - the train and unseen sets never share an observation
"""

import csv
import json
import random
import shutil
import sys
import time
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

# --------------------------------------------------------------------------
# Settings
# --------------------------------------------------------------------------
CLASSES = {
    "asian_hornet": ["Vespa velutina"],
    "european_hornet": ["Vespa crabro"],
    "wasp": ["Vespula vulgaris", "Vespula germanica"],
    "hornet_hoverfly": ["Volucella zonaria", "Volucella inanis"],
}
TRAIN_PER_CLASS = 150      # 4 x 150 = 600 labelled images (requirement: 300+)
UNSEEN_PER_CLASS = 25      # kept apart to test the model on new images
MAX_PER_USER = 15
LICENSES = "cc0,cc-by,cc-by-nc"
NETHERLANDS_PLACE_ID = 7506
SEED = 42
OUT = Path("hornet_data")

API = "https://api.inaturalist.org/v1"
HEADERS = {"User-Agent": "HornetCheck-student-project/1.0 (HHS AI for Good)"}


def get_json(path, **params):
    url = f"{API}/{path}?{urllib.parse.urlencode(params)}"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=30) as r:
                data = json.load(r)
            time.sleep(1.1)  # iNaturalist asks for max ~1 request per second
            return data
        except Exception as e:
            print(f"  retry {attempt + 1} for {path}: {e}")
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(f"Could not reach iNaturalist: {url}")


def check_place():
    data = get_json(f"places/{NETHERLANDS_PLACE_ID}")
    name = data["results"][0]["name"]
    if name != "Netherlands":
        # fall back to searching the place by name
        res = get_json("places/autocomplete", q="Netherlands")["results"]
        nl = next(p for p in res if p["name"] == "Netherlands" and p.get("admin_level") == 0)
        print(f"Place id corrected to {nl['id']}")
        return nl["id"]
    print(f"Place {NETHERLANDS_PLACE_ID} = {name}")
    return NETHERLANDS_PLACE_ID


def taxon_id(scientific_name):
    res = get_json("taxa", q=scientific_name, rank="species")["results"]
    for t in res:
        if t["name"].lower() == scientific_name.lower():
            return t["id"]
    raise RuntimeError(f"Species not found on iNaturalist: {scientific_name}")


def fetch_observations(tid, place_id, max_obs=600):
    obs, page = [], 1
    while len(obs) < max_obs:
        data = get_json(
            "observations",
            taxon_id=tid,
            place_id=place_id,
            quality_grade="research",
            photos="true",
            photo_license=LICENSES,
            per_page=200,
            page=page,
            order_by="id",
            order="desc",
        )
        results = data["results"]
        if not results:
            break
        obs.extend(results)
        if len(obs) >= data["total_results"]:
            break
        page += 1
    return obs


def pick(observations):
    """One photo per observation, max MAX_PER_USER per photographer."""
    per_user = Counter()
    picked = []
    for o in observations:
        photos = [p for p in o.get("photos", []) if p.get("license_code")]
        if not photos:
            continue
        user = (o.get("user") or {}).get("login", "unknown")
        if per_user[user] >= MAX_PER_USER:
            continue
        per_user[user] += 1
        p = photos[0]
        picked.append({
            "observation_id": o["id"],
            "observation_url": o.get("uri") or f"https://www.inaturalist.org/observations/{o['id']}",
            "species": o["taxon"]["name"],
            "observed_on": o.get("observed_on") or "",
            "photographer": user,
            "license": p["license_code"],
            "attribution": p.get("attribution", ""),
            "image_url": p["url"].replace("/square.", "/medium."),
        })
    return picked


def download(url, dest):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r, open(dest, "wb") as f:
        shutil.copyfileobj(r, f)


def main():
    random.seed(SEED)
    if OUT.exists():
        shutil.rmtree(OUT)
    place_id = check_place()
    rows = []
    summary = []

    for label, species_list in CLASSES.items():
        print(f"\n== {label} ==")
        candidates = []
        for sp in species_list:
            tid = taxon_id(sp)
            obs = fetch_observations(tid, place_id)
            print(f"  {sp} (taxon {tid}): {len(obs)} Dutch research-grade observations with open photos")
            candidates.extend(obs)

        random.shuffle(candidates)
        chosen = pick(candidates)
        need = TRAIN_PER_CLASS + UNSEEN_PER_CLASS
        if len(chosen) < need:
            print(f"  WARNING: only {len(chosen)} usable photos (wanted {need}).")
        n_unseen = min(UNSEEN_PER_CLASS, len(chosen) // 7)
        splits = [("unseen", chosen[:n_unseen]), ("train", chosen[n_unseen:need])]

        for split, items in splits:
            folder = OUT / split / label
            folder.mkdir(parents=True, exist_ok=True)
            ok = 0
            for it in items:
                fname = f"{label}_{it['observation_id']}.jpg"
                try:
                    download(it["image_url"], folder / fname)
                except Exception as e:
                    print(f"  skip {it['observation_id']}: {e}")
                    continue
                ok += 1
                rows.append({"split": split, "label": label, "file": f"{split}/{label}/{fname}", **it})
            print(f"  {split}: {ok} images")
            summary.append(f"{label:16s} {split:7s} {ok}")

    with open(OUT / "attribution.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    per_class_users = defaultdict(set)
    for r in rows:
        per_class_users[r["label"]].add(r["photographer"])
    lic = Counter(r["license"] for r in rows)
    text = "\n".join(summary)
    text += "\n\nDifferent photographers per class: " + ", ".join(f"{k}={len(v)}" for k, v in per_class_users.items())
    text += "\nLicences: " + ", ".join(f"{k}={v}" for k, v in lic.items())
    text += f"\nTotal images: {len(rows)}\n"
    (OUT / "summary.txt").write_text(text, encoding="utf-8")
    print("\n" + text)

    shutil.make_archive("hornet_data", "zip", ".", OUT.name)
    print("Done: hornet_data.zip")


if __name__ == "__main__":
    sys.exit(main())
