# Term 1 - Week 7: Computer Vision

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

**Project title:** Hornet Check: Asian hornet or harmless look-alike? (Hackathon 7: Eyes on Earth)

**My pair partner:** Morat

**Tool we had to use:** Roboflow. We trained a single-label classification model (DINOv3 small) on our own labelled dataset and call it through Roboflow's hosted API.

**SDG we had to address:** SDG 15, Life on Land. Target 15.8: reduce the impact of invasive alien species. The Asian hornet is an invasive species in the Netherlands that preys on honeybees, wild bees, butterflies and other insects.

**What problem does it solve, and for whom?**
The user is a Dutch resident, gardener or beekeeper who sees a big hornet-like insect and has to decide: report it, or leave it alone? Provinces ask people to first check that it is not a native European hornet, and reports without a photo are not handled. In some provinces residents pay for nest removal themselves, so a wrong guess costs time, money and sometimes a useful native insect. Hornet Check tells the user which of four look-alikes it probably is (Asian hornet, European hornet, wasp, hornet hoverfly) and what to do next.

**What did you build?**
A Streamlit app: upload a photo or take one with your camera, and the app shows the most likely insect, how sure the model is, what to do (report on waarneming.nl or leave it), and 3-4 features to check yourself. Below 60% confidence it says "not sure" instead of guessing, and it adds an extra warning when the Asian hornet score is 25% or more, because a missed Asian hornet is the worst mistake. The dataset (700 photos) was scraped with our own script from Dutch, research-grade, openly licensed iNaturalist observations; 600 were used to train in Roboflow and 100 were kept apart for an honest test.

**Link to the live thing (if any):**
- Code, test photos, results and data card: [`hackathon/`](hackathon/)
- Slides: [`hackathon/slides.pdf`](hackathon/slides.pdf)
- The app runs locally (see below) and is shown live in the presentation.

**How do I run it?**
See [`hackathon/README.md`](hackathon/README.md). Short version: `cd hackathon/app`, `pip install -r requirements.txt`, `streamlit run app.py`, then paste a Roboflow API key and the Model URL in the sidebar. `python evaluate.py` repeats the test on the 100 unseen photos.

**Who did what?**
We communicated with each other about the project during the week. We used Claude (an AI assistant) to help with the scraper, the app code, the test script and the README, and to explain the Roboflow results to us.

**Ethical reflection - what are the risks of your tool? Who could it harm?**
Our labels come from iNaturalist volunteers, not from experts, and the photos are taken by enthusiasts: close and sharp. Real users will take blurrier, more distant photos, so the 81% we measured on 100 unseen photos is probably optimistic. The model only knows four insects; anything else is forced into one of them. Looking at every mistake, it fails on photos with several insects, on small or distant insects and on blur. The two harmful errors are a missed Asian hornet (4 of 25 were confidently called "wasp", so a nest could grow unnoticed) and a false alarm (7 look-alikes were called Asian hornet, mostly European hornets, which could lead to a useful native nest being destroyed or a resident paying for nothing). That is why the app never says "safe", shows "not sure" below 60%, adds an Asian hornet warning, lists features to check yourself, and sends the final decision to experts via waarneming.nl. Full data card: [`hackathon/DATA_CARD.md`](hackathon/DATA_CARD.md).

### Checklist
- [x] Prototype code (or export / workflow file) is in `hackathon/`
- [x] This week's slides are in `hackathon/` (`slides.pdf`)
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
A single accuracy number hides what matters. Roboflow said about 79%, and our own test on 100 unseen photos gave 81%, but the confusion matrix showed that the most important class, the Asian hornet, was missed 7 times, 4 times with high confidence. Looking at the actual wrong photos taught us more than the score: many mistakes were not "bad AI" but photos the task cannot handle, like several insects in one picture or a hornet as a dot on a wall. We also learned that you have to choose which mistake is worse, and design the app around that (the "not sure" message and the extra Asian hornet warning), and that you must choose such limits before testing, not after.

**Where does this connect to "AI for Good"?**
Early reports of Asian hornets help provinces find nests before the hornets spread and kill bees and other insects (SDG 15.8). But a false alarm can get a native European hornet nest destroyed, so the tool must protect biodiversity in both directions. We built it as a first check for a human, not a judge: it shows its uncertainty, tells people what to look for, and leaves the decision to experts on waarneming.nl.
