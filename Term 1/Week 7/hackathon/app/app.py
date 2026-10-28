"""
Hornet Check
============
Upload or take a photo of a large wasp-like insect. The app tells you whether it
looks like the invasive Asian hornet (report it) or one of its harmless look-alikes.

Run:  streamlit run app.py
"""

import os

import streamlit as st
from PIL import Image

from roboflow_client import classify

CONFIDENT = 0.60  # below this the app says "not sure" instead of giving a verdict
AH_ALERT = 0.25   # extra warning when the Asian hornet score is at least this high, even if another class wins

INFO = {
    "asian_hornet": {
        "name": "Asian hornet (Vespa velutina)",
        "emoji": "🚨",
        "status": "Invasive alien species",
        "advice": (
            "**Report this sighting with your photo on [waarneming.nl](https://waarneming.nl).** "
            "Reports without a photo are not handled. Found a nest? Keep your distance, "
            "do not try to remove it yourself, and report the nest with your contact details."
        ),
        "check": [
            "Body mostly **black / dark brown**",
            "One **orange-yellow band** near the end of the abdomen",
            "**Yellow leg tips** (hence the name 'yellow-legged hornet')",
            "Orange face, a bit smaller than the European hornet",
        ],
    },
    "european_hornet": {
        "name": "European hornet (Vespa crabro)",
        "emoji": "🟤",
        "status": "Native, belongs here",
        "advice": (
            "**Do not report it as an Asian hornet.** This species is native to the Netherlands and eats, "
            "among other things, pest insects. Leave it alone; only remove a nest if it really causes problems."
        ),
        "check": [
            "**Reddish-brown** thorax and head",
            "Abdomen mostly **yellow** with brown/black bands",
            "**Reddish-brown** legs",
            "Bigger than the Asian hornet (up to about 3.5 cm)",
        ],
    },
    "wasp": {
        "name": "Wasp (Vespula)",
        "emoji": "🟡",
        "status": "Native, common",
        "advice": "**Common wasp, nothing to report.** Small, black-and-yellow striped and very common.",
        "check": [
            "Small (1–1.5 cm)",
            "Bright **black-and-yellow** stripes",
            "Yellow face",
        ],
    },
    "hornet_hoverfly": {
        "name": "Hornet hoverfly (Volucella)",
        "emoji": "🪰",
        "status": "Native, harmless",
        "advice": (
            "**This is a fly that mimics a hornet. It cannot sting.** "
            "It is a pollinator, so leave it be."
        ),
        "check": [
            "**Two** wings (wasps and hornets have four)",
            "Big eyes, **short stubby** antennae",
            "No narrow 'wasp waist'",
        ],
    },
}


def get_setting(name, default=""):
    try:
        return st.secrets[name]
    except Exception:
        return os.environ.get(name, default)


st.set_page_config(page_title="Hornet Check", page_icon="🐝", layout="centered")
st.title("🐝 Hornet Check")
st.write(
    "Is it an **Asian hornet**, or a harmless look-alike? "
    "Upload a photo or take one. The app helps you decide whether to report it."
)

model_id = get_setting("ROBOFLOW_MODEL", "")
api_key = get_setting("ROBOFLOW_API_KEY")
if not api_key or not model_id:
    with st.sidebar:
        st.subheader("Settings")
        model_id = st.text_input("Roboflow Model URL", model_id, help="Copy the Model URL of your model in Roboflow")
        api_key = st.text_input("Roboflow API key", type="password")
    if not api_key or not model_id:
        st.info("Enter the Model URL and your Roboflow API key on the left to start.")
        st.stop()

tab_upload, tab_camera = st.tabs(["📁 Upload a photo", "📷 Take a photo"])
with tab_upload:
    uploaded = st.file_uploader("Choose a photo", type=["jpg", "jpeg", "png", "webp"])
with tab_camera:
    snapped = st.camera_input("Take a photo")

source = uploaded or snapped
if source is None:
    st.caption("Tip: photograph **one** insect, **large and sharp**, ideally from above or from the side. "
               "Small insects far away and photos with several insects go wrong most often.")
    st.stop()

image = Image.open(source)
try:
    st.image(image, width="stretch")  # newer Streamlit
except Exception:
    st.image(image, use_container_width=True)  # older Streamlit

with st.spinner("Recognising..."):
    try:
        scores = classify(image, model_id, api_key)
    except Exception as e:
        st.error(f"The model did not answer: {e}")
        st.stop()

# Roboflow can add an empty extra class (e.g. "placeholder"); only keep our four.
scores = [(c, p) for c, p in scores if c in INFO] or scores
if not scores:  # the model did not recognise anything at all
    scores = [("none", 0.0)]
top_class, top_conf = scores[0]
info = INFO.get(top_class)
ah_score = dict(scores).get("asian_hornet", 0.0)

# Missing an Asian hornet is the costliest mistake (the nest grows unnoticed), and in our
# test the model sometimes called real Asian hornets a hoverfly. So even when another
# insect wins, we warn as soon as the Asian hornet score is noticeable.
if top_class != "asian_hornet" and ah_score >= AH_ALERT:
    st.warning(
        f"⚠️ **Careful:** the model also gives a **{ah_score:.0%}** chance of an **Asian hornet**. "
        "Check the features: black body with one orange band, yellow leg tips, orange face. "
        "In doubt? Report it with your photo on [waarneming.nl](https://waarneming.nl) and an expert will check it."
    )

if top_class == "none":
    st.warning(
        "### 🤔 Nothing recognised\nThe model does not recognise any of the four species. Is the insect large "
        "and sharp, and is there only one insect in the photo? If not, try a new photo."
    )
elif info is None:
    st.warning(f"Unknown class from the model: {top_class}")
elif top_conf < CONFIDENT:
    st.warning(
        f"### 🤔 Not sure\n"
        f"The model is in doubt (highest score {top_conf:.0%} for *{info['name']}*). "
        "Take a sharper photo from closer by, or let experts judge the photo on "
        "[waarneming.nl](https://waarneming.nl). It may also be none of these four species."
    )
else:
    box = st.error if top_class == "asian_hornet" else st.success
    box(f"### {info['emoji']} {info['name']}\n**{top_conf:.0%} sure** · {info['status']}")
    st.markdown(info["advice"])
    st.markdown("**Check it yourself, look for:**")
    for item in info["check"]:
        st.markdown(f"- {item}")

with st.expander("All scores from the model"):
    for cls, conf in scores:
        st.progress(min(max(conf, 0.0), 1.0), text=f"{INFO.get(cls, {}).get('name', cls)}: {conf:.0%}")

st.divider()
st.caption(
    "Hornet Check is a student project (The Hague University of Applied Sciences, AI for Good). The model "
    "was trained on 600 Dutch iNaturalist photos and only knows these four species. It can be wrong: use it "
    "as a first check, not as an official identification. For a nest or a sting incident, always ask an expert."
)
