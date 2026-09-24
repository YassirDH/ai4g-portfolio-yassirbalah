# 🧭 Wegwijs

**Wegwijs turns "I'm in a city I don't know, with €10 and 4 hours" into a concrete, step-by-step day plan: where to go, what it costs and exactly how to get there, in the user's own language.**

Hackathon 3: Equal Access · AI for Good · The Hague University of Applied Sciences
Team: Yassir Balah & Akif Olgun

## What it does

The user enters a city, starting point, budget, available time, travel style (cheapest / see as much as possible / take it easy), interests, language and mobility needs. Wegwijs calls the Claude API, which uses web search to find places that actually exist, and returns a timed plan. Every step shows the cost, how to get there, a confidence label (🟢 / 🟡 / 🔴), a Google Maps link and a route link from the previous stop.

## Who it is for

Newcomers and international students in Dutch cities who have a small budget, no local knowledge and limited Dutch. They could explore the city on their own, but the practical information they need (free places, opening hours, how public transport works) is scattered and mostly written in Dutch.

## Which SDG, and why

**SDG 10 – Reduced Inequalities**, target 10.2: *promote the social inclusion of all, irrespective of origin or economic status.*

Leisure is unequally distributed. In 2024, 27% of EU residents aged 16+ could not afford a one-week holiday away from home; in the Netherlands this was 13.0% (Eurostat, 2025). People who can afford a guide, paid tours or taxis, or who simply speak the language, get far more out of the same city than people who cannot. Wegwijs narrows that gap by prioritising free and cheap options, enforcing a hard budget limit in code, explaining transport step by step, and writing the plan in the user's language.

## How it works

1. **Input check (Python):** empty city, negative budget or more than 14 hours is rejected *before* any API call.
2. **Live API call:** Claude is called with the web search tool (max 5 searches) and a strict system prompt: never guess opening hours, prices or tram numbers; give a source URL per stop; stay within budget; answer only in JSON.
3. **Our own checks on the AI's answer** (`controleer_plan` in `planner.py`):
   - recompute the total cost ourselves and reject plans over budget,
   - check that each source URL was really returned by the search, which catches invented links,
   - mark unverified stops 🔴 and warn the user,
   - reject too many stops for the available time, and duplicate stops.
4. **One repair attempt:** if a check fails, the model gets its own answer back plus the list of problems.
5. **Honest fallback:** if the plan is still wrong, it is shown with explicit `LET OP` warnings instead of pretending everything is fine.
6. **Links built by code:** Google Maps and route links use the official Maps URL format, so the AI cannot hallucinate a link.

## How to run

Requirements: Python 3.10+ and an Anthropic API key.

```bash
git clone https://github.com/YassirDH/ai4g-portfolio-yassirbalah.git
cd "ai4g-portfolio-yassirbalah/Term 1/Week 3/hackathon"
python -m pip install -r requirements.txt
```

Copy `.env.example` to `.env` and put your key in it (`ANTHROPIC_API_KEY=sk-ant-...`). Then:

```bash
python -m streamlit run app.py      # the app, opens in your browser
python planner.py                   # quick test without the interface
python -m unittest -v               # 19 offline tests, no API key needed
python evaluatie.py                 # evaluation with the real API (see below)
```

Cost: one plan uses up to 5 web searches (about $0.01 each) plus tokens.

## Files

| File | Purpose |
|---|---|
| `planner.py` | Prompt, API call, JSON parsing, all checks and the repair attempt |
| `app.py` | Streamlit interface |
| `tests/test_planner.py` | 19 offline tests with a fake API response |
| `evaluatie.py` | Runs real requests and produces the numbers below |
| `evaluatie_stappen.xlsx` | Every generated stop, manually checked |

## Edge cases we handle

| Situation | What happens | Tested in |
|---|---|---|
| Invalid input (empty city, negative budget, >14 h) | Blocked before any API call, clear message | `TestInvoer` |
| Non-existent city / impossible request | Model returns `kan_niet`, UI explains what to change | `test_kan_niet_is_geldig` |
| AI exceeds the budget | Code recomputes total, repair attempt, warning if still over | `test_over_budget`, `test_herstelpoging_na_budgetfout` |
| AI adds up costs wrongly | Our own sum is used and the user is warned | `test_ai_rekent_verkeerd` |
| AI invents a place or source | URL not in search results → 🔴 + warning | `test_verzonnen_bron` |
| AI returns broken or no JSON | Repair attempt; if that fails, friendly error | `test_twee_keer_onzin_geeft_nette_fout` |
| Too many stops / duplicate stops | Rejected, repair attempt | `test_te_veel_stappen`, `test_dubbele_plek` |
| Wrong API key / rate limit / no internet | Friendly error instead of a crash | `_vraag_claude` |
| Prompt injection in a text field | User input is wrapped in tags and treated as data | system prompt rule 7 |
| Less-tested language chosen | UI shows a quality warning and suggests English as a check | `app.py` |

## Evaluation

We ran `evaluatie.py`: 3 cities (The Hague, Rotterdam, Utrecht) × 2 languages (Dutch, Arabic), budget €10, 4 hours, style "cheapest". This produced 27 stops (13 Dutch, 14 Arabic). We then opened every stop's Google Maps link and checked by hand whether it led directly to the right place. If Maps showed a list of possible matches (e.g. Utrecht Centraal and Utrecht Overvecht), we counted it as a failure, because a user who doesn't know the city cannot tell which one is meant.

| Metric | Dutch | Arabic |
|---|---|---|
| Plans generated | 3/3 | 3/3 |
| Plans within budget (€10) | 3/3 | 3/3 |
| Stops with a verified source | 13/13 (100%) | 12/14 (86%) |
| Stops where the map link led directly to the right place (manual check) | 11/13 (85%) | 8/14 (57%) |
| Plans that needed a repair attempt | 2/3 | 1/3 |
| Average time per plan | 76 s | 77 s |

**What we noticed**

- All 27 stops were free, so every plan stayed within budget.
- In 3 of the 6 plans, our own checks rejected the first answer and the repair attempt was needed. Without these checks, those flawed plans would have reached the user.
- The Arabic plans performed clearly worse on the map links. 5 of the 6 failed Arabic stops had a place name written fully or partly in Arabic, which Google Maps often could not match. This happened even though the system prompt tells the model to keep place names in their local form.
- Only 2 stops (both Arabic) had no verified source. Our code correctly marked them 🔴.
- This is a small sample (one run, 27 stops), so the percentages are indicative, not definitive.

## Ethical reflection

The biggest risk of Wegwijs is **confidently wrong advice to exactly the people who cannot easily check it**: someone with little money and little Dutch who ends up at the wrong station or cannot find a place at all. This risk is well documented. On the TravelPlanner benchmark, GPT-4-Turbo produced a fully valid travel plan in only 0.6% of cases (Xie et al., 2024), while adding external verifiers raised the pass rate from 4.4% to 20.6% (Gundawar et al., 2024). A second risk is that our tool creates a new inequality between languages: OpenAI reported a gap of about 54 percentage points between English and Hausa for GPT-3.5 Turbo on ARC-Easy, narrowing to under 20 points for GPT-4o (OpenAI, 2024). We saw this in our own test too: the map link led directly to the right place for 85% of Dutch stops but only 57% of Arabic stops, mainly because the model wrote place names in Arabic, which Google Maps could not match. So the users our tool is meant to help most got the worst links. We limit these risks by forcing the model to verify places via web search, checking sources and budget in our own code (which caught problems in 3 of 6 plans), labelling unverified stops 🔴, building map links ourselves and warning users who choose a less-tested language. The most important next step is to make the model always return the official local place name separately, and build the map link from that. Even with these measures, 30% of all links in our test (8 of 27) did not lead directly to the right place, so Wegwijs is a starting point for planning, not a guarantee.

### Sources

- Eurostat (2025, 14 July). *27% of Europeans could not afford a week-long holiday.* https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20250714-2
- Xie, J., Zhang, K., Chen, J., et al. (2024). *TravelPlanner: A Benchmark for Real-World Planning with Language Agents.* ICML 2024. https://arxiv.org/abs/2402.01622
- Gundawar, A., Verma, M., Guan, L., Valmeekam, K., Bhambri, S., & Kambhampati, S. (2024). *Robust Planning with LLM-Modulo Framework: Case Study in Travel Planning.* https://arxiv.org/abs/2405.20625
- OpenAI (2024). *GPT-4o System Card.* https://arxiv.org/abs/2410.21276
- Anthropic. *Web search tool.* https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool

## Demo

    [Watch the demo video](https://youtu.be/Nc7pork8hK4)
