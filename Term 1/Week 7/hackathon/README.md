# 🐝 Hornet Check — Asian hornet or harmless look-alike?

**Team:** Yassir Balah & Morat · **Course:** Minor AI for Good — Hackathon 7 "Eyes on Earth" · **Tool:** Roboflow · **SDG 15 — Life on Land**

## What it does
You take or upload a photo of a large wasp-like insect. A Roboflow image classifier tells you which of four look-alikes it is, how sure it is, and what to do:

| Prediction | Advice in the app |
|---|---|
| 🚨 Asian hornet (*Vespa velutina*) | Invasive: report it with your photo on waarneming.nl, keep away from nests |
| 🟤 European hornet (*Vespa crabro*) | Native, do not report as Asian hornet |
| 🟡 Wasp (*Vespula*) | Common wasp, nothing to report |
| 🪰 Hornet hoverfly (*Volucella*) | A fly that mimics a hornet, cannot sting |

Below 60% confidence the app says **"not sure"** instead of guessing. Because missing an Asian hornet is the worst mistake, the app also shows an extra warning when the Asian hornet score is 25% or more, even if another insect wins. Every verdict lists 3–4 features you can check yourself, so the human makes the final call.

## Who it is for
Dutch residents, gardeners and beekeepers who see a big hornet-like insect and must decide: *report it, or leave it alone?* Provinces ask people to check that it is **not a European hornet** before reporting, and reports without a photo are not handled. In some provinces (like Limburg) residents pay for nest removal themselves, and Noord-Holland is considering the same, so a wrong guess can also cost money.

## Why SDG 15
Target 15.8 asks to reduce the impact of invasive alien species. The Asian hornet preys on honeybees, wild bees, butterflies and other insects. Good reports help provinces find nests early. False reports of native hornets and hoverflies waste expert time and can lead to native insects being killed.

## Results on unseen photos
Model: DINOv3 (small) classifier trained in Roboflow (Roboflow test split: precision 79.6%, recall 78.5%). We also tested it ourselves on 100 photos it never saw (25 per class, see `results/`):
- **81/100 correct.** When the app gives a verdict (confidence ≥ 60%) it is right **89%** of the time; 19 photos get "not sure".
- **18/25 Asian hornets recognised.** 2 of the 7 misses still trigger the extra warning; **4 are confidently called "wasp"** (two of them are photos with several insects).
- **7 false alarms** (look-alikes called Asian hornet), mostly European hornets that are small or partly hidden.

## How to run
```bash
cd app
pip install -r requirements.txt
streamlit run app.py
```
The app opens in your browser. Paste your Roboflow API key and the Model URL from Roboflow (ours: `yassirs-workspace-wy4vu/hornet-check-2-vit_small_patch16_dinov3.lvd1689m-t1`) in the sidebar (or put them in `app/.streamlit/secrets.toml`, see the example file). On a phone you can use the **📷 Foto maken** tab.

To repeat the test: set `ROBOFLOW_API_KEY` and `ROBOFLOW_MODEL`, then run `python evaluate.py` (writes to `results/`).

## What is in this folder
- `app/` — the Streamlit app, the Roboflow client and the test script
- `scraper/` — the Colab notebook that built the dataset from iNaturalist
- `data/` — the 100 unseen test photos and `attribution.csv` (photographer, licence and link for all 700 photos)
- `results/` — test report, confusion matrix, per-photo results and examples of mistakes
- `DATA_CARD.md` — our ethical reflection: data, limitations, failure modes and risks
- `slides.pdf` — presentation
