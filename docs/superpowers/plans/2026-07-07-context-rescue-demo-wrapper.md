# Context Rescue Demo Wrapper Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the smallest local demo wrapper around the proven CR-0001 DataHub MCP evidence chain.

**Architecture:** A Vite + React app renders one app-first proof screen from generated static JSON. A Python generator reads the existing MCP evidence and card artifacts, creates `app/src/data/proofData.json`, and tests verify the data contract and build.

**Tech Stack:** React, TypeScript, Vite, Vitest, CSS, Python standard library.

## Global Constraints

- Use only DataHub sample data from the local `showcase-ecommerce` proof.
- Do not introduce real client data.
- Keep the app focused on one proof: `sample_lineage_rescue_card` / `CR-0001`.
- Use DataHub MCP evidence files already saved under `research/`.
- Do not build broad chat, auth, CRM, warehouse writes, or production incident management.
- The wrapper must show: messy question, MCP chain, context used, owner, affected assets, missing context, NEXT/HOLD, and receipt.
- README/submission material must say this is not a generic data chatbot.
- Demo must remain easy to install and run locally.

---

### Task 1: Demo Data Generator

**Files:**
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/scripts/generate_demo_data.py`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/src/data/proofData.json`

**Interfaces:**
- Produces: `app/src/data/proofData.json`
- The JSON must include `receiptId`, `question`, `decision`, `mcpSteps`, `card`, `evidence`, `owners`, and `paths`.

- [ ] Write the generator using only Python standard library.
- [ ] Read MCP evidence from `research/*.json` and the CR-0001 card from `examples/sample_lineage_rescue_card_CR-0001.md`.
- [ ] Write deterministic JSON to `app/src/data/proofData.json`.
- [ ] Run: `python3 scripts/generate_demo_data.py`
- [ ] Verify the JSON parses.

### Task 2: React Proof UI

**Files:**
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/package.json`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/index.html`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/src/main.tsx`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/src/App.tsx`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/src/App.css`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/src/lib/proof.ts`

**Interfaces:**
- Consumes: `app/src/data/proofData.json`
- Produces: a single-screen app with a runnable `npm run dev` server and `npm run build`.

- [ ] Set up Vite + React + TypeScript.
- [ ] Render the app-first shell: side nav, question bar, MCP chain, rescue card, evidence stack.
- [ ] Add one meaningful interaction: `Run rescue` replays the five MCP steps and returns to `Ready`.
- [ ] Keep visual style close to `demo/design/context-rescue-demo-concept-2026-07-07.png`.
- [ ] Do not add extra product features.

### Task 3: Tests And Local Verification

**Files:**
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/app/src/lib/proof.test.ts`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/demo/screenshots/`
- Create: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/receipts/DATAHUB_CONTEXT_RESCUE_DEMO_WRAPPER_RECEIPT_2026-07-07.md`

**Interfaces:**
- Consumes: generated JSON and React app.
- Produces: test results, screenshots, receipt, and next exact submission step.

- [ ] Add Vitest coverage for the proof data contract.
- [ ] Run `npm install`.
- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Start the local server.
- [ ] Capture desktop and mobile screenshots.
- [ ] Write the demo wrapper receipt.
- [ ] Stop the local server.

