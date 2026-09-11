# Ethical Reflection — Learn From Mistakes

## Who could be excluded?

The app assumes that the learner has access to a suitable device and internet connection. Students without reliable internet, a laptop, tablet or smartphone may therefore have less access. The current prototype is also mainly designed in English, which can exclude learners who are not comfortable reading or explaining their reasoning in English. Students with accessibility needs may also require features that are not yet included, such as screen-reader optimisation, larger text, keyboard-only navigation or alternative ways to answer questions.

The prototype currently focuses on percentages, fractions and order of operations, so it is not useful for every age group or every maths topic. It has also not been specifically validated for students with dyscalculia or other learning difficulties.

## What does the app assume about the learner?

The app assumes that the learner has some basic arithmetic knowledge, can read the question, and is able to describe how they reached an answer. It also assumes that a short written explanation is enough to recognise the learner's misconception. This will not always be true: two students can give the same wrong answer for different reasons.

## How could it be used for the wrong reasons?

A learner could use the app only to obtain solutions instead of thinking independently. Too much reliance on automated feedback could also make students trust an explanation without checking whether it is correct. If the feedback is wrong, it could reinforce a misconception rather than correct it.

Parent accounts also introduce a privacy risk. A progress tool could become a monitoring tool if parents use it to put unnecessary pressure on a student or if they can see information that is not needed to support learning.

## How did we reduce these risks in the prototype?

The app first asks the learner to attempt the question and explain their reasoning before showing the full method. A similar follow-up question checks whether the learner can apply the explanation instead of simply reading the answer.

The prototype collects only information needed for learning progress, such as answers, topic performance and misconception categories. Learning data is stored locally in the browser and can be deleted through the **My Data** page. The current prototype does not send the student's written reasoning to an external AI service; it uses predefined patterns to identify likely misconceptions.

Parents should only see learning summaries such as progress, accuracy and areas that need practice. They should not see passwords or the learner's private written reasoning. The app also includes a feedback/report option so users can report an incorrect explanation, wrong answer, technical problem or privacy concern.

Most importantly, automated feedback should support a teacher, not replace one. When an explanation seems incorrect or a learner continues to struggle, the student should check with a teacher.
