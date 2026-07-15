# TOEIC Question Ocean

Local-first TOEIC practice site for Parts 2-7. The app runs as a static website and stores practice history, wrong answers, spaced-review schedules, theme preference, and resumable sessions in the browser.

## Version Rhythm

Each feature release should include a focused question-bank expansion. Large changes should be committed, tagged, and deployed through GitHub Pages.

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

- Personal vocabulary notebook for selected Part 5 and Part 7 words.
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
