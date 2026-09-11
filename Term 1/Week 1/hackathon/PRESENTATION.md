# Learn From Mistakes — Presentation

Readable version of the pitch deck. The original slides are in
[`Learn_From_Mistakes_Presentation.pptx`](Learn_From_Mistakes_Presentation.pptx).

*AI for Good — Hackathon 1 · SDG 4: Quality Education · Built with Bolt.new (1-week prototype)*

---

## 1. Learn From Mistakes

> Understand why you were wrong — not just what the right answer is.

**Core idea:** wrong answer → reasoning → misconception → retry

![Home screen with the three practice topics](screenshot-home.png)

---

## 2. The problem

Getting the correct answer is not the same as understanding the mistake.

1. **A student answers incorrectly.** Most practice tools can show that an answer is wrong, but not *why* the learner made that mistake.
2. **The misconception stays hidden.** The learner may repeat the same error because the reasoning behind it was never addressed.
3. **Feedback needs to lead to learning.** We wanted to check whether the learner can apply the explanation on a similar question.

**Target group:** students aged 12–14 who struggle with basic maths and often repeat common mistakes.

---

## 3. Our solution

A short learning loop built around the reason behind the wrong answer.

```
Choose a topic → Answer a question → Explain your reasoning → Get misconception feedback → Try a similar question
```

Three practice areas: **Percentages · Fractions · Order of Operations**

![Fractions question with an answer field](screenshot-question.png)

---

## 4. How we measure improvement

Progress is based on performance *after* feedback — not just completed questions.

| Step | What happens |
|---|---|
| 1. Baseline | Student attempts the original question. |
| 2. Diagnose | A likely misconception is identified from the answer and reasoning. |
| 3. Teach | The app explains the correct method in simple steps. |
| 4. Check | A similar follow-up question tests whether the idea was understood. |

**Example:** 40% initial accuracy → 80% follow-up accuracy.

**What the dashboard tracks:** accuracy per topic · common misconceptions · corrected mistakes.

---

## 5. Ethical reflection

The app can support learning, but it also creates access, privacy and reliability questions.

- **Who could be excluded?** Learners without a reliable device or internet, non-English speakers, and students who need accessibility features not yet included.
- **What does it assume?** That a learner has basic maths knowledge, can explain their reasoning in writing, and that a short explanation reveals the real misconception.
- **How could it be misused?** Students could use it only for answers, automated feedback could be trusted too much, and parent access could become intrusive monitoring.
- **How we reduce the risk.** Attempt first, reasoning before solution, follow-up check, limited learning data, a delete-data option, feedback/reporting, and parent summaries instead of private reasoning.

*Prototype note: student reasoning is currently analysed locally with predefined patterns, not sent to an external AI model.*

Full version: [`ETHICAL_REFLECTION.md`](ETHICAL_REFLECTION.md)

---

## 6. Live demo + what we learned

The main flow can be demonstrated in under two minutes.

**Demo flow**

1. Open Fractions
2. Answer `2/3 + 1/4` as `3/7`
3. Explain: "I added the numerators and denominators."
4. Show the misconception explanation
5. Solve `1/2 + 1/5` as `7/10`
6. Show the updated progress

**What we learned**

- AI builders can produce a working product very quickly.
- The first generated version is not automatically correct.
- Specific prompts work better than vague "make it better" requests.
- Testing navigation, state and data logic still matters.
- Ethical choices are part of product design, not an afterthought.

> "AI can build fast — but we still have to define, test and judge what it builds."
