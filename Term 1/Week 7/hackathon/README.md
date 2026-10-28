# 🐝 Hornet Check: Asian hornet or harmless look-alike?

**Team:** Yassir Balah & Morat · **Hackathon 7 "Eyes on Earth"** · **Tool:** Roboflow · **SDG 15, Life on Land**

**Live app:** [hornet.streamlit.app](https://hornet.streamlit.app) (no install needed)  
**Dataset scraper:** [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/YassirDH/ai4g-portfolio-yassirbalah/blob/main/Term%201/Week%207/hackathon/scraper/hornet_check_scraper.ipynb) (Runtime → Run all rebuilds our dataset in about 10 minutes)

## What it does
Take or upload a photo of a large wasp-like insect. A Roboflow classifier says which of four look-alikes it is, how sure it is, and what to do:

| Prediction | Advice in the app |
|---|---|
| 🚨 Asian hornet (*Vespa velutina*) | Invasive: report it with your photo on waarneming.nl, keep away from nests |
| 🟤 European hornet (*Vespa crabro*) | Native: do not report it as an Asian hornet |
| 🟡 Wasp (*Vespula*) | Common: nothing to report |
| 🪰 Hornet hoverfly (*Volucella*) | A fly that mimics a hornet: cannot sting |

Below 60% confidence the app says **"not sure"**. Because a missed Asian hornet is the worst mistake, it also warns when the Asian hornet score is 25% or more, even if another insect wins. Every verdict lists features to check yourself.

## Who it is for
Dutch residents, gardeners and beekeepers who see a big hornet-like insect and must decide: report it, or leave it alone? Provinces ask people to check it is **not a European hornet** first, and reports without a photo are not handled. In some provinces residents pay for nest removal themselves, so a wrong guess costs money too.

## Why SDG 15
Target 15.8: reduce the impact of invasive alien species. The Asian hornet preys on honeybees, wild bees and other insects. Good reports help provinces find nests early; false reports waste expert time and can get useful native nests destroyed.

## How we built and tested it
700 photos scraped from Dutch, research-grade, openly licensed iNaturalist observations ([`scraper/`](scraper/)). 600 trained a DINOv3 (small) classifier in Roboflow; 100 were kept apart. On those 100 unseen photos ([`results/`](results/)): **81/100 correct**, **89%** correct when the app gives a verdict, **18/25 Asian hornets** recognised, 7 false alarms.

## How to run it yourself
```bash
pip install -r requirements.txt
cd app
streamlit run app.py
```
Paste a Roboflow API key and our Model URL `yassirs-workspace-wy4vu/hornet-check-2-vit_small_patch16_dinov3.lvd1689m-t1` in the sidebar. `python evaluate.py` repeats the test on the 100 photos in `data/unseen/`.

## Files
[`app/`](app/) app and test script · [`scraper/`](scraper/) Colab scraper · [`data/`](data/) test photos and credits for all 700 photos · [`results/`](results/) test report · [`DATA_CARD.md`](DATA_CARD.md) **ethical reflection** · [`slides.pdf`](slides.pdf) presentation
