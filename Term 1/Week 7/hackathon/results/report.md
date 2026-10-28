# Test on unseen photos

Model: `yassirs-workspace-wy4vu/hornet-check-2-vit_small_patch16_dinov3.lvd1689m-t1` · 100 photos the model never saw (25 per class, Dutch iNaturalist observations).

- **Overall accuracy:** 81% (81/100)
- **Asian hornets recognised:** 18/25 (the rest would be missed and not reported)
- **Missed Asian hornets that still get the extra warning** (Asian hornet score >= 25%): 2/7
- **False alarms** (look-alike called Asian hornet): 7
- **Extra warnings on look-alikes** (the price of that safety net): 3
- **'Not sure' answers** (confidence < 60%): 19/100
- **Accuracy when the app does give a verdict:** 89% (81 photos)

## Confusion matrix (rows = truth, columns = prediction)

| truth \ prediction | asian_hornet | european_hornet | wasp | hornet_hoverfly |
|---|---|---|---|---|
| asian_hornet | 18 | 1 | 4 | 2 |
| european_hornet | 5 | 19 | 1 | 0 |
| wasp | 0 | 1 | 23 | 1 |
| hornet_hoverfly | 2 | 0 | 2 | 21 |

## Every mistake

| file | truth | prediction | confidence |
|---|---|---|---|
| asian_hornet_242630652.jpg | asian_hornet | european_hornet | 57% |
| asian_hornet_303361526.jpg | asian_hornet | hornet_hoverfly | 45% |
| asian_hornet_309519079.jpg | asian_hornet | hornet_hoverfly | 59% |
| asian_hornet_318244567.jpg | asian_hornet | wasp | 82% |
| asian_hornet_407240824.jpg | asian_hornet | wasp | 69% |
| asian_hornet_410355748.jpg | asian_hornet | wasp | 71% |
| asian_hornet_410726888.jpg | asian_hornet | wasp | 95% |
| european_hornet_133193700.jpg | european_hornet | asian_hornet | 45% |
| european_hornet_136413902.jpg | european_hornet | wasp | 40% |
| european_hornet_312972358.jpg | european_hornet | asian_hornet | 30% |
| european_hornet_312985848.jpg | european_hornet | asian_hornet | 99% |
| european_hornet_316928018.jpg | european_hornet | asian_hornet | 57% |
| european_hornet_409030521.jpg | european_hornet | asian_hornet | 77% |
| wasp_160087901.jpg | wasp | hornet_hoverfly | 87% |
| wasp_244684261.jpg | wasp | european_hornet | 54% |
| hornet_hoverfly_130472567.jpg | hornet_hoverfly | asian_hornet | 62% |
| hornet_hoverfly_303454294.jpg | hornet_hoverfly | wasp | 66% |
| hornet_hoverfly_306952215.jpg | hornet_hoverfly | asian_hornet | 59% |
| hornet_hoverfly_389630163.jpg | hornet_hoverfly | wasp | 55% |
