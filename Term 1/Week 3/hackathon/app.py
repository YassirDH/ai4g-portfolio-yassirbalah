"""
app.py — de interface. Starten met:  streamlit run app.py
"""
import streamlit as st
from dotenv import load_dotenv

from planner import Aanvraag, PlannerFout, maak_plan, valideer_aanvraag

load_dotenv()

# Talen waarin we zelf getest hebben. Voor andere talen tonen we een eerlijke waarschuwing,
# omdat taalmodellen aantoonbaar slechter presteren in minder vertegenwoordigde talen.
GETESTE_TALEN = {"Nederlands", "English"}
TALEN = ["Nederlands", "English", "Türkçe", "العربية", "Polski", "Українська", "Español"]

ZEKERHEID_ICOON = {"hoog": "🟢", "middel": "🟡", "laag": "🔴"}
VERVOER_ICOON = {"lopen": "🚶", "fiets": "🚲", "ov": "🚋", "deelscooter": "🛴", "taxi": "🚕", "anders": "➡️"}

st.set_page_config(page_title="Wegwijs", page_icon="🧭")
st.title("🧭 Wegwijs")
st.caption("Een concreet dagplan voor een stad die je nog niet kent, binnen jouw budget en in jouw taal.")
st.info(
    "Wegwijs gebruikt AI en kan fouten maken. Plekken met 🔴 zijn niet gecontroleerd. "
    "Check openingstijden en prijzen altijd even zelf voordat je gaat."
)

with st.form("aanvraag"):
    col1, col2 = st.columns(2)
    stad = col1.text_input("Welke stad?", "Den Haag")
    startpunt = col2.text_input("Waar begin je?", "Den Haag Centraal")
    budget = col1.number_input("Budget in euro", min_value=0.0, max_value=1000.0, value=15.0, step=5.0)
    uren = col2.slider("Hoeveel uur heb je?", 1, 14, 4)
    stijl = st.radio(
        "Wat is belangrijk?", ["zo goedkoop mogelijk", "zoveel mogelijk zien", "rustig aan"], horizontal=True
    )
    interesses = st.multiselect(
        "Interesses", ["natuur", "cultuur", "eten", "sport", "winkelen", "geschiedenis", "met kinderen"]
    )
    col3, col4 = st.columns(2)
    taal = col3.selectbox("Taal van het plan", TALEN)
    mobiliteit = col4.selectbox("Mobiliteit", ["geen beperking", "rolstoel", "slecht ter been", "met kinderwagen"])
    verstuurd = st.form_submit_button("Maak mijn plan", type="primary")

if verstuurd:
    aanvraag = Aanvraag(stad, startpunt, budget, uren, stijl, interesses, taal, mobiliteit)

    fouten = valideer_aanvraag(aanvraag)
    if fouten:
        for f in fouten:
            st.error(f)
        st.stop()

    if taal not in GETESTE_TALEN:
        st.warning(
            f"Plannen in het {taal} hebben we minder goed getest. AI-modellen maken in sommige talen "
            "meer fouten dan in het Engels. Twijfel je? Vraag het plan ook in het Engels op."
        )

    with st.spinner("Plekken opzoeken en controleren... (dit duurt ongeveer 20-40 seconden)"):
        try:
            plan = maak_plan(aanvraag)
        except PlannerFout as e:
            st.error(str(e))
            st.stop()

    if plan.kan_niet:
        st.warning(plan.reden_kan_niet or "Hier kon geen plan voor gemaakt worden. Pas je invoer aan.")
        st.stop()

    st.subheader("Jouw plan")
    st.write(plan.samenvatting)
    st.metric("Totale kosten", f"€{plan.totale_kosten_eur:.2f}", f"budget €{budget:.2f}", delta_color="off")

    for w in plan.waarschuwingen:
        st.warning(w)

    for stap in plan.stappen:
        titel = f"{stap.tijd} · {ZEKERHEID_ICOON[stap.zekerheid]} {stap.plek} · €{stap.kosten_eur:.2f}"
        with st.expander(titel, expanded=True):
            st.write(stap.wat_doe_je)
            st.write(f"{VERVOER_ICOON[stap.vervoer]} **Hoe kom je er:** {stap.hoe_kom_je_er}")
            if stap.adres:
                st.write(f"📍 {stap.adres}")
            links = f"[Open in Google Maps]({stap.maps_link}) · [Route vanaf vorige stap]({stap.route_link})"
            if stap.vervoer == "ov":
                links += " · [Plan in 9292](https://9292.nl)"
            st.markdown(links)
            if stap.bron_geverifieerd:
                st.caption(f"Bron: {stap.bron_url}")

    with st.expander("Alle bronnen die de AI heeft geraadpleegd"):
        for url in plan.bronnen:
            st.write(url)
