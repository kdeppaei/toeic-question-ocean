# TOEIC Question Ocean

Local-first TOEIC practice site for Parts 2-7. The app runs as a static website and stores practice history, wrong answers, spaced-review schedules, theme preference, and resumable sessions in the browser.

## Version Rhythm

Each feature release should include a focused question-bank expansion. Large changes should be committed, tagged, and deployed through GitHub Pages.

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

- Better vocabulary scheduling that records per-word review history and weak words.
- Question quality dashboard with disabled status, difficulty edits, dispute notes, and per-question accuracy.
- Accent metadata and filters for listening questions.
- Part 1 image-description support with local image assets.
- Expansion to 500 questions, prioritizing high-difficulty Part 5, full Part 6 passages, and Part 7 double/triple passages.

## Local Preview

```bash
python -m http.server 4173
```

Then open http://localhost:4173.

## Deployment

The repository includes a GitHub Pages workflow at `.github/workflows/pages.yml`. Push to `main` and GitHub Actions will publish the static site.
