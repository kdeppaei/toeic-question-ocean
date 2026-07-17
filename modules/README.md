# Front-End Modules

This folder holds browser-loaded modules for product configuration and pure UI decision logic.

Current contracts:

- `app-shell.js`: version metadata, release copy, view titles, Part card definitions, and storage contract notes.
- `learning-command-center.js`: pure mission-prioritization logic for the home dashboard.
- `legal-practice-sources.js`: curated external TOEIC-style practice/source links with reuse limits and copyright notes.

Keep modules side-effect-light. They may attach a single namespace to `window`, but they should avoid direct DOM rendering unless the module is specifically a view module.

Next extraction candidates:

- `analytics-view.js`
- `strategy-center-view.js`
- `quality-dashboard-view.js`
