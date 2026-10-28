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
        "name": "Aziatische hoornaar (Vespa velutina)",
        "emoji": "🚨",
        "status": "Invasieve exoot",
        "advice": (
            "**Meld deze waarneming met je foto op [waarneming.nl](https://waarneming.nl).** "
            "Zonder foto wordt een melding niet behandeld. Zie je een nest? Blijf op afstand, "
            "probeer het niet zelf weg te halen en meld het nest met je contactgegevens."
        ),
        "check": [
            "Lijf grotendeels **zwart / donkerbruin**",
            "Eén **oranjegele band** achteraan het achterlijf",
            "**Gele pootuiteinden** (daarom ook 'geelpoothoornaar')",
            "Oranje gezicht, iets kleiner dan de Europese hoornaar",
        ],
    },
    "european_hornet": {
        "name": "Europese hoornaar (Vespa crabro)",
        "emoji": "🟤",
        "status": "Inheems, hoort hier thuis",
        "advice": (
            "**Niet melden als Aziatische hoornaar.** Deze soort hoort in Nederland en eet onder andere "
            "plaaginsecten. Laat hem met rust; alleen bij echte overlast is een nest verwijderen nodig."
        ),
        "check": [
            "**Roodbruin** borststuk en kop",
            "Achterlijf grotendeels **geel** met bruine/zwarte banden",
            "**Roodbruine** poten",
            "Groter dan de Aziatische hoornaar (tot ca. 3,5 cm)",
        ],
    },
    "wasp": {
        "name": "Wesp (Vespula)",
        "emoji": "🟡",
        "status": "Inheems, algemeen",
        "advice": "**Gewone wesp, niet melden.** Klein, zwart-geel gestreept en heel algemeen.",
        "check": [
            "Klein (1–1,5 cm)",
            "Fel **zwart-geel** gestreept",
            "Geel gezicht",
        ],
    },
    "hornet_hoverfly": {
        "name": "Hoornaarzweefvlieg (Volucella)",
        "emoji": "🪰",
        "status": "Inheems, onschuldig",
        "advice": (
            "**Dit is een vlieg die een hoornaar nadoet. Hij kan niet steken.** "
            "Het is een bestuiver, dus laat hem gerust."
        ),
        "check": [
            "**Twee** vleugels (wespen en hoornaars hebben er vier)",
            "Grote ogen, **korte stompe** sprieten",
            "Geen smalle 'wespentaille'",
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
    "Is het een **Aziatische hoornaar**, of een onschuldige look-alike? "
    "Upload een foto of maak er een. De app helpt je te beslissen of je het moet melden."
)

model_id = get_setting("ROBOFLOW_MODEL", "")
api_key = get_setting("ROBOFLOW_API_KEY")
if not api_key or not model_id:
    with st.sidebar:
        st.subheader("Instellingen")
        model_id = st.text_input("Roboflow Model URL", model_id, help="Kopieer de Model URL van je model in Roboflow")
        api_key = st.text_input("Roboflow API-key", type="password")
    if not api_key or not model_id:
        st.info("Vul links de Model URL en je Roboflow API-key in om te beginnen.")
        st.stop()

tab_upload, tab_camera = st.tabs(["📁 Foto uploaden", "📷 Foto maken"])
with tab_upload:
    uploaded = st.file_uploader("Kies een foto", type=["jpg", "jpeg", "png", "webp"])
with tab_camera:
    snapped = st.camera_input("Maak een foto")

source = uploaded or snapped
if source is None:
    st.caption("Tip: zet **één** insect **groot en scherp** in beeld, liefst van boven of van opzij. "
               "Kleine insecten in de verte en foto's met meerdere insecten gaan het vaakst fout.")
    st.stop()

image = Image.open(source)
st.image(image, use_container_width=True)

with st.spinner("Bezig met herkennen..."):
    try:
        scores = classify(image, model_id, api_key)
    except Exception as e:
        st.error(f"Het model gaf geen antwoord: {e}")
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
        f"⚠️ **Let op:** het model geeft ook **{ah_score:.0%}** kans op een **Aziatische hoornaar**. "
        "Controleer de kenmerken: zwart lijf met één oranje band, gele pootuiteinden, oranje gezicht. "
        "Twijfel je? Meld het dan met foto op [waarneming.nl](https://waarneming.nl), een expert kijkt mee."
    )

if top_class == "none":
    st.warning(
        "### 🤔 Niets herkend\nHet model herkent geen van de vier soorten. Staat het insect groot en scherp "
        "in beeld, en staat er maar één insect op de foto? Probeer anders een nieuwe foto."
    )
elif info is None:
    st.warning(f"Onbekende klasse van het model: {top_class}")
elif top_conf < CONFIDENT:
    st.warning(
        f"### 🤔 Niet zeker\n"
        f"Het model twijfelt (hoogste score {top_conf:.0%} voor *{info['name']}*). "
        "Maak een scherpere foto van dichterbij, of laat de foto beoordelen op "
        "[waarneming.nl](https://waarneming.nl). Misschien is het ook geen van deze vier soorten."
    )
else:
    box = st.error if top_class == "asian_hornet" else st.success
    box(f"### {info['emoji']} {info['name']}\n**{top_conf:.0%} zeker** · {info['status']}")
    st.markdown(info["advice"])
    st.markdown("**Controleer het zelf, kijk naar:**")
    for item in info["check"]:
        st.markdown(f"- {item}")

with st.expander("Alle scores van het model"):
    for cls, conf in scores:
        st.progress(min(max(conf, 0.0), 1.0), text=f"{INFO.get(cls, {}).get('name', cls)}: {conf:.0%}")

st.divider()
st.caption(
    "Hornet Check is een studentenproject (HHS, AI for Good). Het model is getraind op 600 Nederlandse "
    "foto's van iNaturalist en kent alleen deze vier soorten. Het kan fout zijn: zie het als hulp, "
    "niet als officiële determinatie. Bij een nest of steekincident: altijd een expert laten kijken."
)
