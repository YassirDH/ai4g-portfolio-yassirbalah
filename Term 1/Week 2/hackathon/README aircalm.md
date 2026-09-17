# AirCalm — automated air quality warnings (n8n)

An n8n workflow that checks the air quality in The Hague every two hours and posts a short, easy-to-understand warning in a Discord channel when the air may be unhealthy for people with lung conditions.

**Team:** Haki Abdulovski (23177314) and Yassir Balah (26095270)
**Course:** Minor AI for Good — Hackathon 2 · **SDG 3 — Good Health & Well-being**

## What it does

Every two hours the workflow fetches the current air quality for The Hague from the Open-Meteo Air Quality API: the European AQI, the sub-index of each pollutant, and the concentrations of PM2.5, PM10, NO₂ and ozone. Code determines which pollutant is dominant and converts the AQI into a risk level (LOW, MODERATE, HIGH, VERY HIGH, EXTREME).

- **AQI of 40 or higher:** an AI model turns the numbers into a short message of at most four sentences that explains what this risk level can mean for someone with a lung condition, names the dominant pollutant and gives one practical precaution. The message is posted to Discord.
- **Below 40:** no warning is sent. A short confirmation is posted instead, so it stays visible that the check actually ran.

## Who it is for

People with a lung condition and people who are extra sensitive to poor air quality, such as children, elderly people and people with diabetes. Air quality data is public, but it is published as raw numbers and indexes that are hard to interpret. AirCalm delivers that information already translated, in the place where the user already is.

## SDG 3 — Good Health & Well-being

SDG target 3.9 aims to reduce illness caused by air pollution. Nobody can change the air, but people can plan around it. Knowing in time that the air is unhealthy helps someone decide to postpone a run, take a break indoors or choose a lighter activity. The tool supports self-management; it does not replace medical care.

## How it works

| # | Node | Role |
|---|------|------|
| 1 | Schedule Trigger | Runs automatically every 2 hours |
| 2 | Edit Fields | Location settings (The Hague, latitude, longitude, alert threshold) |
| 3 | HTTP Request1 | Gets current air quality from the Open-Meteo Air Quality API (no API key needed) |
| 4 | Code in JavaScript | Determines the dominant pollutant |
| 5 | Determine Risk | Converts the AQI into a risk level and decides whether a warning is needed |
| 6 | If | Splits the flow: warning or confirmation |
| 7 | Message a model | AI (GPT-5-nano) writes the warning text |
| 8 | HTTP Request | Posts the warning to Discord |
| 9 | HTTP Request2 | Posts the confirmation to Discord when no warning is needed |

The division of work is deliberate: **code decides the facts and whether a warning is sent; the AI only turns those facts into readable language.** The prompt instructs the model to use only the given data, never to contradict the calculated risk level, never to diagnose or give medication advice, and to close with the sentence that this is general air-quality guidance and not medical advice.

## How to run it yourself

1. In n8n: **···** → **Import from File** → `workflow/Hackathon2HakiYassir.json`.
2. In **Edit Fields**, set `latitude` and `longitude` to your own location.
3. Create a webhook in your Discord server (Server Settings → Integrations → Webhooks) and paste that URL into both Discord nodes (**HTTP Request** and **HTTP Request2**), replacing the placeholder text.
4. Connect an OpenAI credential to the **Message a model** node.
5. Click **Publish**. From then on the workflow runs by itself.

## Data and limitations

The data comes from the [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api), based on the CAMS European air quality model with a resolution of about 11 km. That is a regional model value, not a measurement in your street. The threshold of 40 is the start of the European AQI category "moderate"; it is a general index, not a personal medical limit.

See [ETHICAL_REFLECTION.md](ETHICAL_REFLECTION.md) for our ethical reflection.
