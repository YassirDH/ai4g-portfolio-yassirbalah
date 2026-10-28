# Term 1 - Week 2: Hackathon 2 redo

This folder contains only the **redo of Hackathon 2** (Flow State: automate well-being with n8n). The original submission stays in [`Term 1/Week 2/hackathon`](../../../Term%201/Week%202/hackathon).

---

## 2. Hackathon prototype -> [`hackathon/`](hackathon/)

**Project title:** CareCircle: a shared care log for families caring at home

**My pair partner:** Haki Abdulovski (23177314)

**Tool we had to use:** n8n (with Telegram, Google Gemini and Google Sheets)

**SDG we had to address:** SDG 3, Good Health & Well-being (targets 3.4 and 3.8)

**What problem does it solve, and for whom?**
Families who share the care of an older relative at home, for example a grandmother with early-stage dementia. Their updates get lost in a busy group chat: a missed dose, a fall that "seemed fine", a task nobody picked up, and one person who ends up doing almost everything.

**What did you build?**
A Telegram bot built in n8n. Family members write normal messages in their group chat; an AI node understands each message (category, urgency, summary, tasks with owner and date), a code safety net checks it, and the workflow saves a care log, assigns tasks, sends urgent alerts and replies. Every Sunday at 19:00 a second flow writes a weekly care report with patterns, open tasks, the care load per family member and questions for the GP.

**Link to the live thing (if any):**
The workflow export is in [`hackathon/workflow/CareCircle.json`](hackathon/workflow/CareCircle.json). It runs published on n8n Cloud; screenshots of the live test are in [`hackathon/README.md`](hackathon/README.md#demo).

**How do I run it?**
See [How to run it](hackathon/README.md#how-to-run-it): create a Telegram bot and a Google Sheet, import the JSON in n8n, connect the credentials and click Publish.

**Who did what?**
We communicated with each other about the redo. We used Claude as an AI assistant for brainstorming, building the workflow and writing the documentation.

**Ethical reflection - what are the risks of your tool? Who could it harm?**
The biggest risk is a missed emergency: the AI could classify a serious message as non-urgent, and our red-flag word list cannot catch every wording. A group chat is also never an emergency call, and if a service is down nothing is logged. On top of that it handles health data of someone who may not be able to consent, so the demo uses a fictional case. CareCircle therefore never decides that something is fine: at every urgent alert, medication question and GP visit a human takes over. Full reflection: [`hackathon/ETHICAL_REFLECTION.md`](hackathon/ETHICAL_REFLECTION.md).

### Checklist
- [x] Prototype code (or export / workflow file) is in `hackathon/`
- [x] This week's slides are in `hackathon/`
- [x] The prototype actually runs, and I wrote down how to run it
- [x] Ethical reflection written above
