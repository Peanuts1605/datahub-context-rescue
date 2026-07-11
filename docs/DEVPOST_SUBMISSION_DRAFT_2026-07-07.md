# Devpost Submission Draft - Context Rescue

Date: 2026-07-07 local / 2026-07-08 UTC
Hackathon: Build with DataHub: The Agent Hackathon
Category: Agents That Do Real Work

## Project Name

Context Rescue

## Tagline

When a dashboard breaks, the agent reads DataHub first.

## Short Description

Context Rescue is a DataHub-native agent demo that turns a messy data-team question into a lineage-aware owner, affected assets, missing context, next action, and receipt.

## Longer Description

Data teams often get vague incident-style questions: "The revenue dashboard dropped after yesterday's customer/orders change. What changed, who owns it, and what should we do next?"

Context Rescue does not answer from vibes. It reads DataHub context first. In the CR-0001 proof, the agent uses DataHub MCP evidence from the `showcase-ecommerce` sample graph: search results, entity metadata, schema fields, upstream and downstream lineage, document/runbook context, ownership metadata, and query-history checks.

The output is a Context Rescue Card. The card classifies the issue, explains what the question means, lists affected assets, identifies missing context, names the next owner, chooses NEXT/HOLD, and writes a local receipt.

This is not a generic catalog chatbot or text-to-SQL clone. It is a decision artifact for data work.

## What It Does

- Starts from one messy data-team question.
- Replays the DataHub MCP evidence chain: Search, Entity, Schema, Lineage, Documents.
- Shows grounded proof counts from CR-0001.
- Produces a Context Rescue Card with classification, urgency, meaning, affected assets, missing context, owner, suggested action, decision, and receipt.
- Includes sample outputs in `examples/` and proof receipts in `receipts/`.

## How We Built It

- DataHub local quickstart
- `showcase-ecommerce` sample datapack
- DataHub MCP server via `uvx mcp-server-datahub@latest`
- Python evidence generator
- Vite + React + TypeScript local demo wrapper
- Vitest contract tests
- Playwright screenshot verification

## DataHub Usage

Context Rescue uses DataHub as the core context source. The CR-0001 proof uses:

- MCP `search`
- MCP `get_entities`
- MCP `list_schema_fields`
- MCP `get_lineage`
- MCP `search_documents`
- MCP `grep_documents`
- MCP `get_dataset_queries`

DataHub context retrieved:

- 16 revenue search results
- 5 resolved revenue-cluster entities
- 12 schema fields / measures
- 71 upstream dependencies
- 5 downstream assets
- 10 relevant documents
- owner and escalation metadata

## Sample Output

- `examples/sample_lineage_rescue_card_CR-0001.md`
- `examples/sample_lineage_rescue_input.md`
- `demo/video/context-rescue-cr0001-captioned.mp4`
- `receipts/DATAHUB_CONTEXT_RESCUE_DEMO_WRAPPER_RECEIPT_2026-07-07.md`

## Testing Instructions

Public demo:

https://peanuts1605.github.io/datahub-context-rescue/

Or run it locally:

```bash
cd app
npm ci
npm run lint
npm test
npm run build
npm run dev
```

Open the local Vite URL and click `Run rescue`.

The local UI runs in replay mode from verified CR-0001 evidence files, so judges can inspect the demo without running DataHub. The README includes the DataHub setup used to generate the proof.

## Demo Video Script

Context Rescue helps data teams handle vague dashboard incidents without guessing.

In this demo, we start with a messy question: the weekly revenue dashboard dropped after a customer/orders change.

The agent reads DataHub context first. It uses MCP search, entity metadata, schema fields, lineage, documents, and ownership context from the `showcase-ecommerce` sample graph.

The result is not a chatbot answer. It is a Context Rescue Card: classification, urgency, meaning, affected assets, missing context, next owner, suggested action, NEXT decision, and receipt CR-0001.

The important part is trust. The system shows exactly what evidence it used, and it leaves a receipt so the next person inherits the work.

## GitHub Publish Status

Public repo is live:

- https://github.com/Peanuts1605/datahub-context-rescue

GitHub detects the repository license as Apache License 2.0.

Public runnable demo:

- https://peanuts1605.github.io/datahub-context-rescue/

Captioned demo video is recorded locally and mirrored to Drive:

- https://drive.google.com/file/d/1iQ2w2aIkmjaNcFSCgKA8L8w18jSlUdfG/view?usp=drivesdk

Remaining publish step: upload the demo video to a public YouTube, Vimeo, or Youku link for Devpost.
