# Data card & ethical reflection — Hornet Check

## What data did we collect, and how?
We did not take the photos ourselves. We **scraped 700 photos from iNaturalist** with our own script (`scraper/`), using only observations that are:
- made **in the Netherlands** (2016 – October 2026, most from 2022–2026);
- **research grade**: at least two iNaturalist users agree on the species;
- shared under an **open licence** (612 × CC-BY-NC, 59 × CC-BY, 29 × CC0). Every photographer, licence and link is listed in `data/attribution.csv`.

| Class | Species | Train | Unseen test |
|---|---|---|---|
| asian_hornet | *Vespa velutina* | 150 | 25 |
| european_hornet | *Vespa crabro* | 150 | 25 |
| wasp | *Vespula vulgaris*, *V. germanica* | 150 | 25 |
| hornet_hoverfly | *Volucella zonaria* (+1 *V. inanis*) | 150 | 25 |

To keep the data fair we used **one photo per observation** (no near-identical shots of the same insect) and **max 15 photos per photographer per class**. That gives 385 different photographers. The 100 unseen photos were never uploaded to Roboflow.

**Our labels are other people's labels.** "Research grade" means the community agreed, not that an expert checked every photo. Some labels may be wrong, and we did not re-check all 700 by hand.

## Limitations and failure modes
- **It only knows four insects.** A bumblebee, a different hoverfly or a sawfly will still be forced into one of the four classes. The "not sure" message (below 60%) catches some of these, but not all.
- **Background shortcuts.** Asian hornets are often photographed at beehives, in traps or on nests; hoverflies on flowers. The model may partly learn the *background* instead of the insect. A hoverfly on a beehive could be called an Asian hornet.
- **Photo quality.** iNaturalist photos are taken by enthusiasts: sharp and close. Blurry phone photos from far away, dead insects or insects in a jar are underrepresented, so accuracy for real users will probably be **lower** than our test score.
- **Season.** Most photos are from July–October. Spring queens look slightly different and are rare in the data.
- **Test on 100 unseen photos:** 81% correct, 7 of 25 Asian hornets missed and 7 false alarms (see `results/report.md`). When we looked at every mistake (`results/mistakes_examples.jpg`) three patterns stood out: **several insects in one photo** (two "missed" hornets were in a group, one together with a real wasp: one label per photo cannot describe that), **small or distant insects** (a hornet as a dot on a wall or in ivy), and **blur** (a moving hornet became "hoverfly"). The app now tells users to photograph one insect, large and sharp.
- **The safety net has a price.** The extra warning at an Asian hornet score of 25% catches 2 of the 7 missed hornets and adds 3 warnings on wasps. A lower limit catches more: 15% would catch 4 of 7 but warn on 13 look-alikes. We fixed 25% **before** testing; picking the best value on these same 100 photos would make the test look better than it is.
- **Roboflow adds an empty "placeholder" class** to the model. It never wins, and the app filters it out.

## What could go wrong if it were used for real decisions?
- **A missed Asian hornet** (false negative): the user thinks it is harmless, does not report it, and a nest grows unnoticed. That is why the app never says "safe", only "probably X", and always shows what to check.
- **A false alarm** (false positive): a native European hornet nest gets destroyed, or a resident pays a pest controller for nothing. European hornets and hoverflies are useful insects.
- **Over-trust:** people may treat the percentage as a fact. The app is a first check, **not an official identification**: the decision to remove a nest stays with experts of the province or waarneming.nl.
- **Safety:** the app must never encourage people to approach a nest for a better photo. The advice text says to keep away.

## Privacy and licences
We checked the test photos for GPS metadata (none had it) and removed all metadata from the photos in this repo. We only keep the image, the iNaturalist link and the photographer's public username, as the licence requires. Most photos are CC-BY-NC, so this project and its dataset may **not be used commercially**. The app sends the user's photo to Roboflow's servers to be classified; it does not store it itself.
