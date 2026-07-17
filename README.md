# TOEIC Question Ocean

Local-first TOEIC practice site for Parts 2-7. The app runs as a static website and stores practice history, wrong answers, spaced-review schedules, vocabulary notebooks, strategy practice, theme preference, and resumable sessions in the browser.

## Version Rhythm

Each feature release should include a focused question-bank expansion. Large changes should be committed, tagged, and deployed through GitHub Pages.

### v2.7.0

- Practice sessions and the answer-strategy center now reveal grading, translations, explanations, and listening review immediately after each answered question.
- Grouped Part 3, Part 4, Part 6, and Part 7 sets now grade each sub-question independently instead of waiting for the whole group to be completed.
- The question navigator marks correct and wrong answers immediately when instant feedback is enabled.
- Improved automatic vocabulary normalization for forms like `archived`, `updated`, and `requires` so extracted words map back to their dictionary headwords more often.
- Added 60 high-frequency TOEIC workplace and technology lexicon entries with KK/IPA-style pronunciation, Traditional Chinese definitions, and examples.
- Expanded the built-in bank from 610 to 620 questions with original Part 5 technology-workplace items.

### v2.6.1

- Fixed dialogue playback role handling so `M:` and `W:` markers are parsed even when a transcript is stored on one line.
- Male turns now prefer male browser voices globally before falling back to a non-female voice, and apply a lower pitch as a last-resort distinction when the browser has no male voice installed.
- Female turns continue to prefer female voices and use a slightly higher pitch for clearer role separation.

### v2.6

- Changed listening playback rules: focused practice, review, and strategy sessions now play audio immediately; only mock exam mode keeps the 10-second read-the-questions countdown.
- Added a TOEIC accent selector for browser speech synthesis, covering auto, US, UK, Australian, Canadian, New Zealand, Irish, Indian, Singapore, and South African English where the browser provides voices.
- Added long-term question favorites with a dedicated star button, F shortcut, dashboard count, storage backup entry, and a favorites practice list separate from the wrong-answer book.
- Expanded the built-in bank from 600 to 610 questions with original Part 2, Part 3, and Part 4 listening items.

### v2.5

- Added a full group-question overview inside practice sessions so Part 3, Part 4, Part 6, and Part 7 sets can be read and answered together.
- Changed answer selection to be freely editable: selecting another choice overwrites the previous answer, and learners can return to earlier questions in the same section.
- Added a previous-question button and ArrowLeft keyboard shortcut.
- Listening playback now gives a 10-second read-the-questions countdown before audio starts.
- Dialogue audio strips `M:` / `W:` labels and tries to use separate English male/female browser voices for role-aware playback.
- Expanded the built-in bank from 590 to 600 questions with original Part 3, Part 4, and Part 5 items.

### v2.4

- Added a legal practice-source hub in the question-bank management page.
- The source hub records official sample/prep links, free external TOEIC-style practice links, and reuse restrictions so the app can collect source awareness without copying copyrighted questions.
- Added `modules/legal-practice-sources.js` for curated source metadata and link-only reuse notes.
- New built-in questions include `sourceNote` fields that mark them as original TOEIC-style items rather than copied web questions.
- Expanded the built-in bank from 565 to 590 questions with original Part 3, Part 5, Part 6, and Part 7 workplace-technology items.

### v2.3

- Added a lightweight `modules/` front-end architecture layer so release metadata, view titles, Part module definitions, storage contracts, and learning mission logic no longer have to live directly in `app.js`.
- Added a learning command center on the home dashboard that prioritizes due review, weak strategies, wrong-answer cleanup, vocabulary building, and quality-management work.
- Part entry cards now render from the app-shell module and include tactical focus notes for each TOEIC Part.
- Expanded the built-in bank from 540 to 565 questions with original Part 2, Part 5, Part 6, and Part 7 technology-workplace items.

### v2.2

- Added strategy-mastery analytics that track performance by reusable answer tactic and surface weakest tactics as focused follow-up practice.
- Added a local question-quality management dashboard for disabling questions, marking disputed answers, flagging review needs, and storing review notes in Local Storage.
- Quality-disabled questions are excluded from normal practice selection while remaining visible in the management dashboard.
- Learning backup export now includes the quality-management state.
- Expanded the built-in bank from 520 to 540 questions with original technology-context TOEIC-style items covering AI meeting tools, quantum-safe encryption, digital badges, logistics automation, privacy, and smart operations.

### v2.1

- Added detailed answer review cards after completed practice sessions, including selected answer, correct answer, explanations, passages, and listening transcripts.
- Strategy practice now records the tactic that was practiced and offers a recent-review card from the strategy center.
- Expanded the built-in bank from 500 to 520 questions with original technology-context TOEIC-style items covering AI cybersecurity, edge computing, cloud migration, data-center planning, and smart manufacturing.
- Do not scrape or commit unauthorized official TOEIC questions. New items should be original, TOEIC-style practice content inspired by workplace trends rather than copied exam material.

### v2.0

- Added an answer strategy center that groups similar questions by reusable tactics such as word-form recognition, connector/preposition splits, listening first-word strategy, date/number locating, paraphrase recognition, and double/triple-passage cross-reference.
- Strategy cards show judgment signals, step-by-step tactics, common traps, matching examples, and one-click focused practice.
- Strategy practice uses the existing question engine, so grouped Part 7 sets stay together and future question-bank additions are classified automatically.
- Expanded the built-in bank from 486 to 500 questions with new Part 5 tactics and a full Part 7 triple-passage set.

### v1.9

- Added a vocabulary review page for English-to-Chinese, cloze, and audio recognition practice.
- Review sessions can use completed question-bank vocabulary entries or the user's personal vocabulary notebook.
- Vocabulary cards can jump directly into a focused mini-review for that word.
- Expanded the built-in bank from 476 to 486 questions with new Part 5 and Part 7 items.

### v1.8.1

- Changed the A-Z vocabulary page to show the full question-bank vocabulary by default instead of only completed lexicon entries.
- Marked complete entries and pending question-bank candidates with distinct labels and colors in the same list.
- Added pronunciation playback buttons to vocabulary cards using browser speech synthesis.

### v1.8

- Added an A-Z question-bank vocabulary page that scans current question text, answer choices, passages, and listening transcripts.
- Added a local TOEIC vocabulary lexicon with Traditional Chinese meanings, KK phonetics, parts of speech, and question-sourced examples.
- New question-bank words appear automatically; unknown terms are shown in a pending lexicon view for future enrichment.
- Expanded the built-in bank from 456 to 476 questions with new Part 5 and Part 7 practice.

### v1.7

- Changed answer selection to a two-step flow: choose an option first, then confirm the answer, so learners can change their mind before locking it.
- Added a personal vocabulary notebook backed by Local Storage.
- Practice pages can send selected Part 5 / Part 7 text into the vocabulary notebook with meaning, example, familiarity, and next review date.
- Expanded the built-in bank from 440 to 456 questions with additional Part 5 and Part 7 practice.

### v1.6

- Added a Storage Center page.
- Uses Cookie for the small daily-goal preference and last-visit marker.
- Uses Local Storage for long-term learning data summaries and JSON backup export.
- Uses Session Storage for per-tab scratch notes that do not sync across windows.
- Expanded the built-in bank from 430 to 440 questions.

### v1.5

- Added spaced review for wrong answers with 1, 3, 7, 14, and 30 day intervals.
- Added a due-review entry point on the dashboard and wrong-answer page.
- Expanded the built-in bank from 400 to 430 questions.
- Added high-difficulty Part 5 items, two Part 6 passages, and Part 7 double/triple-passage sets.

## Recommended Next Directions

- Continue extracting large views from `app.js` into view modules, starting with analytics, strategy center, and quality dashboard.
- Add a source-note filter in the quality dashboard so original trend-inspired items can be audited by topic and source policy.
- Build a learner command center with weekly goals, streak recovery, milestone badges, and a richer study calendar.
- Better vocabulary scheduling that records per-word review history, weak words, and pronunciation attempts.
- Add question editing for difficulty/category/tags directly inside the quality dashboard.
- Accent metadata and filters for listening questions.
- Part 1 image-description support with local image assets.
- Expand toward 600 questions with high-difficulty Part 6 full passages and more Part 7 double/triple-passage inference sets.
- Add a source-note field for trend-inspired original questions so the topic inspiration is visible without storing copyrighted source text.

## Local Preview

```bash
python -m http.server 4173
```

Then open http://localhost:4173.

## Deployment

The repository includes a GitHub Pages workflow at `.github/workflows/pages.yml`. Push to `main` and GitHub Actions will publish the static site.
