# Term 1 - Week 6: Language Models

---

## 1. Homework & workshop assignments -> [`homework/`](homework/)

**What was the assignment?**

**What did I hand in?**
_List the files, or link to them. Notebook exports, screenshots, scripts._

**What did I find difficult, and how did I solve it?**

### Checklist
- [ ] My workshop / homework files are in `homework/`
- [ ] Everything runs without errors, or I explained what does not and why

---


## 2. Hackathon prototype -> [`hackathon/`](hackathon/)

> Your tool and your SDG for this hackathon are announced at the **start of Friday's class**.
> Write them down here once you know them.

**Project title:** Maintainer Pressure Meter (Hackathon 6: Live Pulse)

**My pair partner:** _[fill in: name, or "I worked alone"]_

**Tool we had to use:** A pre-trained sentiment transformer from Hugging Face, run with the `transformers` library in my own code. I used `cardiffnlp/twitter-roberta-base-sentiment-latest` live, and compared it with `cardiffnlp/twitter-xlm-roberta-base-sentiment` and a simple word list.

**SDG we had to address:** SDG 9, Industry, Innovation and Infrastructure. Open-source software is digital infrastructure: banks, governments and hospitals run on components maintained by a handful of (often unpaid) people.

**What problem does it solve, and for whom?**
The user is a programme officer at a fund that supports open-source maintainers, such as Germany's Sovereign Tech Agency or the Dutch NLnet foundation. Today they only hear that a maintainer is overloaded when someone quits or it makes the news. The xz backdoor (2024) started with fake accounts pressuring a tired maintainer, and 58% of maintainers have quit or considered quitting (Tidelift 2023). The meter shows each week where the tone in GitHub comments turns negative, so the officer knows which project to read up on and possibly contact or support.

**What did you build?**
A collector that runs every 15 minutes on GitHub Actions, fetches new issue and PR comments from 15 critical projects (curl, OpenSSL, xz, CPython, Rust, Kubernetes, …), removes bots, code and names, scores each comment with the Hugging Face model and stores it with a timestamp. A dashboard shows the share of negative and positive comments over time, with the number of comments, a table per project with warning signals, and the actual comments behind every peak or dip. Plus an honest test: 50 comments labelled blind by me, compared with two models and a word list.

**Link to the live thing (if any):**
- Live dashboard: https://yassirdh.github.io/maintainer-druk-meter/
- Live repository (collector running every 15 minutes, every run is a commit): https://github.com/YassirDH/maintainer-druk-meter
- Snapshot of code, data (1,862 comments over 49+ hours), test and slides: [`hackathon/`](hackathon/)

**How do I run it?**
See [`hackathon/README.md`](hackathon/README.md), section 8. Short version: copy the live repo, add a secret `HASH_SALT`, start the *Collect comments* workflow and turn on GitHub Pages. Locally: `pip install torch transformers requests`, then `python collect.py` and `python -m http.server` to open the dashboard.

**Who did what?**
_[adjust if you had a partner]_ I chose the topic, the user and the projects to follow, set up and ran the pipeline on GitHub, labelled the 50 test comments myself and chose the model based on the test. I used Claude (an AI coding assistant) to help write the code, the dashboard and the README, and to explain GitHub Actions to me.

**Ethical reflection - what are the risks of your tool? Who could it harm?**
The stream only contains people who write in English in public GitHub issues; the heaviest pressure on maintainers often happens in private messages or on mailing lists, and small projects like xz and zlib produced zero comments in 48 hours, so a calm line does not mean a project is healthy. The model was trained on tweets and reads programmer jargon (*issues*, *broken*, *failure*) as anger, while missing polite frustration ("would you mind…"). One very active account can move a project's line: for curl and NumPy, a third of the negative comments came from one account. If the fund trusted the line blindly, it could fund the wrong project, overlook a quiet vulnerable one, or label a project or person "toxic". What I did: no usernames are stored (authors only as a salted hash, @mentions replaced), every percentage is shown with its count and small samples are flagged, the dashboard warns when one account dominates, and the real comments are one click behind every peak, so a human reads before anything is decided. Full reflection in [`hackathon/README.md`](hackathon/README.md), section 6.

### Checklist
- [x] Prototype code (or export / workflow file) is in `hackathon/`
- [ ] This week's slides are in `hackathon/` _(add `slides.pptx`)_
- [x] The prototype actually runs, and I wrote down how to run it
- [x] Ethical reflection written above

---

## 3. Presentation -> [`presentation/`](presentation/)

*Only fill this in for the week your group was selected to present. You need at least **one** of these across the whole term.*

- [ ] My group presented in this week
- [ ] Slides are in `presentation/`
- [ ] Proof of the live demo is in `presentation/` (recording, screenshots, or link)

**How did it go? What would I do differently next time?**

---

## 4. Reflection

**What is the most important thing I learned this week?**

**Where does this connect to "AI for Good"?**
_One concrete link to ethics, sustainability or social impact._
