# The Silent Garden: Hackathon 4 "Picture the Planet"

A 33-second AI-generated climate short film about the decline of pollinators, made completely in ComfyUI.

| | |
|---|---|
| **Team** | Yassir Balah & Soulayman |
| **Tool** | ComfyUI (Z-Image Turbo, Wan 2.2 I2V, ChatterBox TTS) |
| **SDG** | 13 – Climate Action |
| **Watch** | ▶ [YouTube](https://www.youtube.com/watch?v=pmWtrWT7KSM) · [MP4 in this repo](film/The_Silent_Garden_720p.mp4) (1280×720, 33.6 s) |
| **Shot list** | [SHOTLIST.md](SHOTLIST.md) |
| **Slides / research** | [docs/The_Silent_Garden_slides.pdf](docs/The_Silent_Garden_slides.pdf) · [docs/Desk_research.pdf](docs/Desk_research.pdf) |

---

## 1. The issue

**What:** wild pollinators (bees, butterflies, hoverflies, moths) are declining. When they disappear, the link between flowering plants and the insects that pollinate them breaks, and that affects whole ecosystems and food production.

**Where and how big:** in Europe, about 1 in 3 bee, butterfly and hoverfly species is in decline and 1 in 10 bee and butterfly species is threatened with extinction (European Commission). Around 4 in 5 crop and wild flowering plant species depend on animal pollination (European Commission), and about 78% of wildflower species in the EU depend on insects for pollination (EEA).

**Link to climate:** the EEA lists climate change and extreme weather as one of the pressures on pollinators. Drought and heavy rain change how many flowers are available, and higher temperatures can shift flowering times so plants and pollinators no longer match. Other pressures, such as habitat loss and pesticides, also play a big role. Our film focuses on the climate part only and does not claim it is the only cause.

**Sources**
1. European Environment Agency – [Protecting and restoring Europe's wild pollinators and their habitats](https://www.eea.europa.eu/en/analysis/publications/protecting-and-restoring-europes-wild-pollinators-and-their-habitats)
2. European Commission – [Pollinators / EU Pollinators Initiative](https://environment.ec.europa.eu/topics/nature-and-biodiversity/pollinators_en)
3. IPBES – [Assessment Report on Pollinators, Pollination and Food Production](https://www.ipbes.net/fr/ppa)

## 2. Why SDG 13

SDG 13 asks for urgent action against climate change *and its impacts*. Pollinator decline is one of those impacts that people rarely connect to climate. Most young people picture melting ice or wildfires when they hear "climate change", not an empty flower bed. The film makes that connection visible.

## 3. Audience

**For:** young adults aged 18–30, mainly students who are on social media. They already know climate change is a problem, but they probably haven't thought about what it does to insects and plants. A short, quiet, visual film fits how this group consumes content: in a feed, in about 30 seconds, often with the sound on low.

**Secondary:** teachers and environmental organisations who want a short clip to open a lesson or a campaign.

**Not for:** climate scientists, ecologists and policymakers. They already know this in much more detail, and a 30-second metaphor tells them nothing new.

## 4. The film (solution)

We did not try to invent a new way to save bees; habitat restoration, pesticide reduction and monitoring already exist. Our question was: *how do you make this problem understandable and felt in 30 seconds?*

The film shows one fictional garden over time. It starts full of flowers, bees and butterflies. The heat arrives, the grass dries out, flowers wilt and the insects disappear one shot at a time, until the garden is completely still. One white flower survives, followed by the message **"When nature becomes silent, we should listen."** The narration follows the same arc.

Full shot-by-shot breakdown with frames, prompts and seeds: **[SHOTLIST.md](SHOTLIST.md)**

## 5. Repository structure

```
hackathon/
├── README.md                  ← this file
├── SHOTLIST.md                ← storyboard: 1 row per shot (duration, frame, prompts, seeds)
├── film/
│   └── The_Silent_Garden_720p.mp4     ← final film
├── frames/                    ← the 9 stills (shot01.png … shot09_endcard.png)
├── clips/                     ← the 9 animated clips before editing
├── audio/
│   └── narration.flac         ← generated narration (33 s)
├── workflows/
│   ├── 1_images/              ← shotXX_image.json   still per shot
│   ├── 2_video/               ← shotXX_video.json   animation per shot
│   ├── 3_audio/               ← narration_tts.json  voice-over
│   ├── 4_assembly/            ← a → b → c → d       edit the film
│   └── original_exports/      ← the raw exports from our session (see note below)
└── docs/
    ├── The_Silent_Garden_slides.pdf
    └── Desk_research.pdf
```

> **Why two sets of workflows?** In our original exports the seed widget was set to *randomize*. ComfyUI then saves the *next* random seed in the file, not the one that made the image, so those files would not give you our exact shots. The workflows in folders 1–4 are extracted from the metadata ComfyUI embedded in each output file, so they contain the seeds that were actually used, set to *fixed*, and file names that match this repo. The originals are kept unchanged for transparency.

## 6. How to run the workflow

**Requirements:** ComfyUI (we used frontend 1.47.10) and a GPU with a lot of VRAM. The Wan 2.2 14B model is heavy; the note inside the video workflow mentions ±8–9 min per clip on an RTX 4090D (24 GB) with these settings.

**Models** (all listed with download links in the note inside the video workflows):

| Folder in `ComfyUI/models/` | File |
|---|---|
| `diffusion_models/` | `z_image_turbo_bf16.safetensors`, `wan2.2_i2v_high_noise_14B_fp8_scaled.safetensors`, `wan2.2_i2v_low_noise_14B_fp8_scaled.safetensors` |
| `text_encoders/` | `qwen_3_4b.safetensors`, `umt5_xxl_fp8_e4m3fn_scaled.safetensors` |
| `vae/` | `ae.safetensors`, `wan_2.1_vae.safetensors` |
| `loras/` | `wan2.2_i2v_lightx2v_4steps_lora_v1_high_noise.safetensors`, `…_low_noise.safetensors` (in the graph, but switched off) |

**Custom nodes:** the narration uses the ChatterBox nodes (`ChatterBoxOfficial23LangEngineNode`, `UnifiedTTSSRTNode`) from the TTS Audio Suite, and the end card uses a `TextOverlay` node. Easiest way: open the workflow and use **ComfyUI Manager → Install Missing Custom Nodes**.

**Steps**

1. **Stills:** open `workflows/1_images/shotXX_image.json` and press *Queue*. Seeds are fixed, so you get the same image.
   *Shortcut:* dragging any PNG from `frames/` onto the ComfyUI canvas also loads the exact workflow that made it.
2. **Motion:** copy the PNGs from `frames/` into `ComfyUI/input/`. Open `workflows/2_video/shotXX_video.json` and queue it. Every shot gives a 4-second clip at 16 fps (the end card gives 1 second).
3. **Narration:** open `workflows/3_audio/narration_tts.json` and queue it. The script and timing are inside as SRT subtitles; silence padding makes the audio exactly fit the film.
4. **Assembly:** put the clips and audio in `ComfyUI/input/` (or use the ones in `clips/` and `audio/`) and run the four assembly workflows in order:

   | Workflow | Input | Save the output as |
   |---|---|---|
   | `a_join_shots_01-08.json` | `shot01_clip.mp4` … `shot08_clip.mp4` | `step_a_output.mp4` |
   | `b_add_endcard.json` | `step_a_output.mp4` + `shot09_endcard_clip.mp4` | `step_b_output.mp4` |
   | `c_add_narration.json` | `step_b_output.mp4` + `narration.flac` | `step_c_output.mp4` |
   | `d_upscale_720p.json` | `step_c_output.mp4` | final film (1280×720) |

   ComfyUI adds a counter to saved file names, so rename each output before loading it into the next step.

> Same models + same seed + same settings should reproduce our shots. Small pixel-level differences are possible on a different GPU or ComfyUI version.

## 7. Ethical reflection

**Could the film mislead?** The images look photorealistic, so a viewer could think they are watching a real place. We prevented this partly in the prompts themselves: every prompt describes a *fictional* garden, and no real location, real event or real person appears. We also deliberately kept the damage realistic instead of dramatic; shot 6 literally asks for *"realistic environmental stress without apocalypse or destruction"*, because an exaggerated wasteland would turn an awareness film into fearmongering. The narration makes no factual claims or numbers; the silent garden is a metaphor, not a prediction of what every garden will look like. The facts live in this README, with sources.

**Do viewers know it's AI?** The YouTube title and this README say the film was made in ComfyUI. Honest weak point: the film itself has no on-screen "AI-generated" label. In a next version we would add one to the end card, because a clip that gets reshared loses its title and description.

**Overclaiming:** climate change is one pressure on pollinators, next to habitat loss and pesticides. The film shows only heat and drought, so the README explicitly says it is not the only cause.

**Energy and generations:** based on the counters in our ComfyUI output folder we made roughly **11 still generations** for 9 used stills, **10 video generations** for 9 used clips, around **19 narration attempts**, and about 9 cheap editing runs (joining, adding audio, upscaling). The video generations cost by far the most energy: Wan 2.2 14B at 20 steps takes several minutes of full GPU load per 4-second clip. We kept this low by planning each shot in text first and generating stills before animating them, so we only animated images we had already approved. In hindsight we could have cut the video energy much further: the workflow contains a 4-step LoRA that, according to the template's own benchmark, is roughly 5× faster, but we left it switched off. We think one short film that makes a real problem understandable for a large audience justifies this amount of compute, but we would turn on the faster LoRA next time.

## 8. Known limitations

- The clips are square (640×640). The final upscale step stretches them to 1280×720 without cropping, so the image is slightly horizontally stretched.
- Transitions between shots are hard cuts; smoother transitions would make the change in the garden feel more gradual.

## 9. Who did what

- **Soulayman:** concept and story, writing the prompts, generating the images, clips and narration in ComfyUI, editing the final film.
- **Yassir:** desk research (problem, sources, existing solutions, audience), brainstorming, and the presentation slides.
- **Together:** choosing the issue, the direction of the film and the final message.
