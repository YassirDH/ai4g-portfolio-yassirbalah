"""
evaluatie.py — maakt ECHTE cijfers voor je README en ethische reflectie.

Wat het doet:
  - maakt een aantal plannen met de echte API (zelfde vragen in 2 talen)
  - meet automatisch: binnen budget? hoeveel stappen hadden een gecontroleerde bron? herstelpoging nodig?
  - schrijft evaluatie_stappen.csv waarin je per stap met de hand invult of de plek echt bestaat

Draaien:  python evaluatie.py
Duur: ongeveer 3-6 minuten. Kosten: ongeveer 6 plannen x een paar cent.
"""
import csv
import sys
import time

from dotenv import load_dotenv

from planner import Aanvraag, PlannerFout, maak_plan

load_dotenv()
sys.stdout.reconfigure(encoding="utf-8")

STEDEN = [
    ("Den Haag", "Den Haag Centraal"),
    ("Rotterdam", "Rotterdam Centraal"),
    ("Utrecht", "Utrecht Centraal"),
]
TALEN = ["Nederlands", "العربية"]  # vergelijk Nederlands met een minder goed ondersteunde taal

resultaten = []
stap_rijen = []

for stad, startpunt in STEDEN:
    for taal in TALEN:
        a = Aanvraag(stad=stad, startpunt=startpunt, budget_eur=10, uren=4,
                     stijl="zo goedkoop mogelijk", interesses=["natuur", "cultuur"], taal=taal)
        print(f"-> {stad} / {taal} ...", end=" ", flush=True)
        start = time.time()
        try:
            plan = maak_plan(a)
        except PlannerFout as e:
            print("FOUT:", e)
            resultaten.append({"stad": stad, "taal": taal, "fout": str(e)})
            continue
        duur = round(time.time() - start, 1)
        geverifieerd = sum(s.bron_geverifieerd for s in plan.stappen)
        resultaten.append({
            "stad": stad, "taal": taal, "fout": "",
            "kan_niet": plan.kan_niet,
            "stappen": len(plan.stappen),
            "geverifieerd": geverifieerd,
            "binnen_budget": plan.totale_kosten_eur <= a.budget_eur,
            "herstelpoging": plan.herstelpoging,
            "seconden": duur,
        })
        for s in plan.stappen:
            stap_rijen.append({
                "stad": stad, "taal": taal, "plek": s.plek, "kosten_eur": s.kosten_eur,
                "bron_geverifieerd": "ja" if s.bron_geverifieerd else "nee",
                "maps_link": s.maps_link,
                "bestaat_en_is_open (VUL IN: ja/nee)": "",
            })
        print(f"{len(plan.stappen)} stappen, {geverifieerd} geverifieerd, {duur}s")

# utf-8-sig + puntkomma = opent netjes in Nederlandse Excel, ook met Arabische tekst
if stap_rijen:
    with open("evaluatie_stappen.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(stap_rijen[0].keys()), delimiter=";")
        w.writeheader()
        w.writerows(stap_rijen)

print("\n=== SAMENVATTING (plak dit in je README) ===")
for taal in TALEN:
    rs = [r for r in resultaten if r["taal"] == taal and not r["fout"] and not r["kan_niet"]]
    totaal_stappen = sum(r["stappen"] for r in rs)
    if not rs or not totaal_stappen:
        print(f"{taal}: geen bruikbare plannen")
        continue
    print(f"{taal}:")
    print(f"  plannen gelukt:               {len(rs)}/{len(STEDEN)}")
    print(f"  binnen budget:                {sum(r['binnen_budget'] for r in rs)}/{len(rs)}")
    print(f"  stappen met geverifieerde bron: {sum(r['geverifieerd'] for r in rs)}/{totaal_stappen} "
          f"({100 * sum(r['geverifieerd'] for r in rs) / totaal_stappen:.0f}%)")
    print(f"  herstelpoging nodig:          {sum(r['herstelpoging'] for r in rs)}/{len(rs)}")
    print(f"  gemiddelde duur:              {sum(r['seconden'] for r in rs) / len(rs):.0f} s")
print("\nOpen nu evaluatie_stappen.csv in Excel en vul per stap de laatste kolom in (klik op de maps_link).")
