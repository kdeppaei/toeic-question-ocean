# TOEIC Question Ocean

Local-first TOEIC practice site for Parts 2-7. The app runs as a static website and stores practice history, wrong answers, theme preference, and resumable sessions in the browser.

## Local Preview

```bash
python -m http.server 4173
```

Then open http://localhost:4173.

## Deployment

The repository includes a GitHub Pages workflow at `.github/workflows/pages.yml`. Push to `main` and GitHub Actions will publish the static site.
