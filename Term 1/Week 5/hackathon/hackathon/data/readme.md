# Data

`ess_nl_rounds4-11.csv` is a subset of the **European Social Survey (ESS)**: Netherlands only, rounds 4–11 (fieldwork 2008–2023), 13,890 respondents × 26 columns. It was downloaded from the ESS Data Portal (<https://ess.sikt.no>, Datafile Builder) and is unchanged; all cleaning happens in the notebook. `ess_codebook.html` is the codebook that came with the download: it gives the question text, the answer labels and the codes for refusal / don't know / no answer for every column.

**Licence:** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Free to share and adapt for non-commercial use, with attribution, under the same licence.

**Citation:** European Social Survey European Research Infrastructure (ESS ERIC). ESS4–ESS11 integrated files [Data sets]. Sikt – Norwegian Agency for Shared Services in Education and Research. Adapted: Netherlands only, subset of variables.

| round | fieldwork | edition | DOI |
|---|---|---|---|
| ESS4 | 2008 | 4.6 | [10.21338/ess4e04_6](https://doi.org/10.21338/ess4e04_6) |
| ESS5 | 2010 | 3.6 | [10.21338/ess5e03_6](https://doi.org/10.21338/ess5e03_6) |
| ESS6 | 2012 | 2.7 | [10.21338/ess6e02_7](https://doi.org/10.21338/ess6e02_7) |
| ESS7 | 2014 | 2.3 | [10.21338/ess7e02_3](https://doi.org/10.21338/ess7e02_3) |
| ESS8 | 2016 | 2.3 | [10.21338/ess8e02_3](https://doi.org/10.21338/ess8e02_3) |
| ESS9 | 2018 | 3.3 | [10.21338/ess9e03_3](https://doi.org/10.21338/ess9e03_3) |
| ESS10 | 2020 | 3.3 | [10.21338/ess10e03_3](https://doi.org/10.21338/ess10e03_3) |
| ESS11 | 2023 | 4.2 | [10.21338/ess11e04_2](https://doi.org/10.21338/ess11e04_2) |

## Columns

| column | meaning | used as |
|---|---|---|
| `hincfel` | feeling about household's income nowadays (1 comfortable … 4 very difficult) | target (3–4 = struggling) |
| `agea` | age | input |
| `hhmmb` | number of people in the household | input |
| `domicil` | type of area (big city … countryside) | input |
| `eisced` | highest level of education (ES-ISCED) | input |
| `hincsrca` | main source of household income | input |
| `mnactic` | main activity in the last 7 days | input |
| `uemp3m` | ever unemployed and looking for work for more than 3 months | input |
| `wkhtot` | total hours normally worked per week (666 = not applicable) | input |
| `gndr`, `brncntr` | sex, born in the Netherlands | fairness check only |
| `hinctnta` | household income decile | not used (only in the "what would income add" check) |
| `chldhm` | children living at home | not used (not asked in rounds 9–11) |
| `name`, `essround`, `edition`, `proddate`, `idno`, `cntry`, `dweight`, `pspwght`, `pweight`, `anweight`, `prob`, `stratum`, `psu` | file information, respondent number and survey weights | not used |
