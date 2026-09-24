"""
Offline tests voor Wegwijs. Deze gebruiken GEEN echte API (dus geen kosten, geen key nodig).
We vervangen de API-call door een nep-antwoord en controleren of onze code de fouten van de AI vangt.

Draaien vanuit de projectmap:
    python -m unittest -v
"""
import json
import os
import sys
import unittest
from types import SimpleNamespace as NS
from unittest.mock import patch

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import planner as p  # noqa: E402

ECHTE_URL = "https://www.denhaag.nl/park"
NEP_URL = "https://verzonnen-site.nl/museum"


def aanvraag(**wijzigingen):
    basis = dict(stad="Den Haag", startpunt="Den Haag Centraal", budget_eur=10, uren=4,
                 stijl="zo goedkoop mogelijk", interesses=["natuur"], taal="Nederlands")
    basis.update(wijzigingen)
    return p.Aanvraag(**basis)


def stap(plek="Park", kosten=0.0, bron=ECHTE_URL, vervoer="lopen"):
    return {"tijd": "10:00", "plek": plek, "adres": None, "wat_doe_je": "wandelen",
            "hoe_kom_je_er": "10 min lopen", "vervoer": vervoer, "kosten_eur": kosten,
            "zekerheid": "hoog", "bron_url": bron}


def plan_json(stappen, totaal=None, **extra):
    d = {"kan_niet": False, "reden_kan_niet": None, "samenvatting": "test", "stappen": stappen,
         "totale_kosten_eur": totaal if totaal is not None else sum(s["kosten_eur"] for s in stappen),
         "waarschuwingen": []}
    d.update(extra)
    return d


def nep_response(data, urls=(ECHTE_URL,), voorzin="Ik zoek even wat plekken op. "):
    """Bouwt een object dat eruitziet als een echt antwoord van de Anthropic SDK."""
    return NS(stop_reason="end_turn", content=[
        NS(type="server_tool_use"),
        NS(type="web_search_tool_result", content=[NS(url=u) for u in urls]),
        NS(type="text", text=voorzin + "```json\n" + json.dumps(data) + "\n```", citations=None),
    ])


class TestInvoer(unittest.TestCase):
    def test_goede_invoer(self):
        self.assertEqual(p.valideer_aanvraag(aanvraag()), [])

    def test_lege_stad(self):
        self.assertTrue(p.valideer_aanvraag(aanvraag(stad="  ")))

    def test_negatief_budget(self):
        self.assertTrue(p.valideer_aanvraag(aanvraag(budget_eur=-5)))

    def test_te_veel_uren(self):
        self.assertTrue(p.valideer_aanvraag(aanvraag(uren=30)))

    def test_slechte_invoer_kost_geen_api_call(self):
        with patch.object(p, "_vraag_claude") as api:
            with self.assertRaises(p.PlannerFout):
                p.maak_plan(aanvraag(budget_eur=-1))
            api.assert_not_called()


class TestJsonLezen(unittest.TestCase):
    def test_json_met_tekst_en_codeblok(self):
        tekst = 'Hier is {iets} je plan:\n```json\n{"kan_niet": false, "stappen": []}\n```'
        self.assertEqual(p._lees_json(tekst)["stappen"], [])

    def test_geen_json(self):
        with self.assertRaises(ValueError):
            p._lees_json("Sorry, dat weet ik niet.")


class TestControles(unittest.TestCase):
    def check(self, data, a=None, urls=(ECHTE_URL,)):
        plan, fouten = p._naar_plan(data)
        return plan, fouten + p.controleer_plan(plan, a or aanvraag(), set(urls))

    def test_geldig_plan(self):
        plan, problemen = self.check(plan_json([stap(), stap("Strand", 2.0)]))
        self.assertEqual(problemen, [])
        self.assertTrue(plan.stappen[0].bron_geverifieerd)
        self.assertIn("google.com/maps", plan.stappen[0].maps_link)

    def test_over_budget(self):
        _, problemen = self.check(plan_json([stap(kosten=8), stap("Museum", 7)]))
        self.assertTrue(any("budget" in x for x in problemen))

    def test_ai_rekent_verkeerd(self):
        plan, _ = self.check(plan_json([stap(kosten=3), stap("Café", 4)], totaal=1))
        self.assertEqual(plan.totale_kosten_eur, 7)  # onze eigen som telt, niet die van de AI
        self.assertTrue(any("rekende" in w for w in plan.waarschuwingen))

    def test_verzonnen_bron(self):
        plan, _ = self.check(plan_json([stap(), stap("Museum", 0, bron=NEP_URL)]))
        self.assertFalse(plan.stappen[1].bron_geverifieerd)
        self.assertEqual(plan.stappen[1].zekerheid, "laag")

    def test_te_veel_stappen(self):
        stappen = [stap(f"Plek {i}") for i in range(12)]
        _, problemen = self.check(plan_json(stappen), a=aanvraag(uren=2))
        self.assertTrue(any("te veel" in x for x in problemen))

    def test_dubbele_plek(self):
        _, problemen = self.check(plan_json([stap("Park"), stap("park")]))
        self.assertTrue(any("meerdere keren" in x for x in problemen))

    def test_onbekend_vervoer_wordt_anders(self):
        plan, _ = self.check(plan_json([stap(vervoer="helikopter")]))
        self.assertEqual(plan.stappen[0].vervoer, "anders")

    def test_kan_niet_is_geldig(self):
        plan, problemen = self.check({"kan_niet": True, "reden_kan_niet": "Deze stad bestaat niet."})
        self.assertTrue(plan.kan_niet)
        self.assertEqual(problemen, [])


class TestVolledigeStroom(unittest.TestCase):
    def test_goed_plan_in_een_keer(self):
        with patch.object(p, "_vraag_claude", return_value=nep_response(plan_json([stap()]))) as api:
            plan = p.maak_plan(aanvraag())
        self.assertEqual(api.call_count, 1)
        self.assertFalse(plan.herstelpoging)

    def test_herstelpoging_na_budgetfout(self):
        slecht = nep_response(plan_json([stap(kosten=25)]))
        goed = nep_response(plan_json([stap(kosten=5)]), voorzin="")
        with patch.object(p, "_vraag_claude", side_effect=[slecht, goed]) as api:
            plan = p.maak_plan(aanvraag())
        self.assertEqual(api.call_count, 2)
        self.assertTrue(plan.herstelpoging)
        self.assertEqual(plan.totale_kosten_eur, 5)
        # de herstelvraag bevat onze bevinding
        tweede_bericht = api.call_args_list[1].args[0][-1]["content"]
        self.assertIn("budget", tweede_bericht)

    def test_blijft_fout_dan_eerlijke_waarschuwing(self):
        slecht = nep_response(plan_json([stap(kosten=25)]))
        with patch.object(p, "_vraag_claude", side_effect=[slecht, slecht]):
            plan = p.maak_plan(aanvraag())
        self.assertTrue(plan.waarschuwingen[0].startswith("LET OP"))

    def test_twee_keer_onzin_geeft_nette_fout(self):
        onzin = NS(stop_reason="end_turn", content=[NS(type="text", text="blabla", citations=None)])
        with patch.object(p, "_vraag_claude", side_effect=[onzin, onzin]):
            with self.assertRaises(p.PlannerFout):
                p.maak_plan(aanvraag())


if __name__ == "__main__":
    unittest.main(verbosity=2)
