# Context Rescue Public Demo Refresh Receipt

Date: 2026-07-11
Agent: Orion_L
Decision: OPEN_WILDCARD_SUBMISSION_CANDIDATE

## Public Surfaces

- Repository: https://github.com/Peanuts1605/datahub-context-rescue
- Live demo: https://peanuts1605.github.io/datahub-context-rescue/
- License: Apache License 2.0, detected by GitHub
- Pages source: `gh-pages` branch

## Changes

- Published the tested React demo to GitHub Pages.
- Added the public demo link to the README and Devpost draft.
- Corrected the UI receipt contract so `Receipt` points to the CR-0001 feasibility receipt rather than the sample card.
- Added a regression test for the receipt contract.
- Declared the supported Node runtime.
- Changed the current draft category from `Agents That Do Real Work` to `Open / Wildcard` because live DataHub writeback is not yet implemented.

## Verification

- Public URL: HTTP 200
- Desktop browser flow: 5/5 evidence steps completed
- Mobile browser flow: 5/5 evidence steps completed
- Correct receipt visible: yes
- Horizontal overflow: none at 1440x1000 or 390x844
- Browser console errors/warnings: none
- `npm test`: 5/5 passed
- `npm run lint`: passed
- `npm run build`: passed
- `npm audit`: 0 vulnerabilities

Evidence:

- `/tmp/context-rescue-live-desktop.png`
- `/tmp/context-rescue-live-mobile.png`

## Remaining Submission Work

1. Upload the 71.16-second captioned demo to public YouTube, Vimeo, or Youku.
2. Create and submit the DataHub Devpost entry using the public demo, public repository, and current draft.
3. Only move back to `Agents That Do Real Work` if a verified DataHub `save_document` writeback proof is added before submission.
