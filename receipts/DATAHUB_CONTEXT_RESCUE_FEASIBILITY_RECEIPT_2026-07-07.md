# DataHub Context Rescue - Feasibility Receipt

Receipt ID: CR-0001
Date: 2026-07-07 local / 2026-07-08 UTC
Agent ID: Orion_L
Lane: DataHub Agent Hackathon / Context Rescue
Task: Prove the first local DataHub + MCP context rescue card using sample data only.

## Proof Result

Decision: PROCEED_TO_SMALL_DEMO_WRAPPER

The first proof passed.

## Verified Chain

- Local Docker runtime available: yes
- DataHub quickstart running: yes
- DataHub UI reachable at `http://localhost:9002`: yes
- `showcase-ecommerce` sample pack loaded: yes
- DataHub MCP server starts via `uvx mcp-server-datahub@latest`: yes
- MCP tools listed: yes
- MCP search returned revenue-context entities: yes
- MCP entity fetch returned asset metadata: yes
- MCP schema fields returned revenue measure definitions: yes
- MCP lineage returned upstream and downstream graph context: yes
- MCP document search/grep returned metric and runbook excerpts: yes
- Dataset query history checked: yes, returned zero associated queries for the selected PowerBI dataset
- Context Rescue Card created: yes
- Receipt created: yes
- Local DataHub stack stopped after proof: yes

## Artifact Created

- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/examples/sample_lineage_rescue_input.md`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/examples/sample_lineage_rescue_card_CR-0001.md`

## Backup

- Local bundle: `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/datahub-context-rescue-feasibility-2026-07-07.zip`
- Drive backup: https://drive.google.com/file/d/1bVx22I820wHHFdM0NY_Y2woASOvbbLA_/view?usp=drivesdk
- Drive folder: https://drive.google.com/drive/folders/1hqN--befMvkmQ7-BSIgYoW0ypqMkoHhm
- Notion pointer: https://app.notion.com/p/397b143d29178152bcf3db4da989e76c

## Evidence Files

- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_tools.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_search_revenue.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_revenue_cluster_entities.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_essential_kpi_schema_fields.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_essential_kpi_lineage_upstream.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_essential_kpi_lineage_downstream.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_search_documents_revenue.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_revenue_document_excerpts.json`
- `/Users/alfredthebot/Naumio_HQ/hackathons/datahub-agent-2026/context-rescue/research/mcp_essential_kpi_dataset_queries.json`

## Key Context Retrieved

- Revenue search returned 16 matching entities.
- Main selected asset: PowerBI dataset `Essential KPI Measures`.
- Revenue measure fields include `Total Revenue`, `Average Order Value`, `Revenue Per Customer`, `YTD Revenue`, `PY Revenue`, and `YoY Growth`.
- Upstream lineage returned 71 dependencies: 48 datasets and 23 data jobs.
- Downstream lineage returned 5 assets: one PowerBI report and four PowerBI pages.
- Document search returned relevant metric/reference/runbook material, including `Key Metrics Reference`, `Order Details View`, `Runbook: Promotion Attribution Issues`, and `Runbook: Order Count Discrepancy`.
- Asset structured metadata included hourly freshness SLA, data quality score 80.5, one-year retention, E-Commerce Operations cost center, and a data owner escalation contact.

## Product Implication

Context Rescue is feasible as a small DataHub-native agent.

The useful product is not a catalog chatbot. It is a decision card that turns a messy data question into:

- what the question means,
- what assets are affected,
- what context was used,
- what is missing,
- who should own the next step,
- NEXT/HOLD,
- and a durable receipt.

## Blockers

No blocker to the first proof.

One limitation: the local MCP server exposed read-oriented tools in the default OSS registration. DataHub document writeback was therefore parked for a later patch instead of included in CR-0001.

## Next Smallest Patch

Build a tiny local demo wrapper that runs the same CR-0001 flow from one seeded prompt and renders the Context Rescue Card on screen, backed by these MCP calls.

Do not expand into broad chat yet.

## Closure

Artifact: created.
Receipt: created.
Decision: proceed to smallest demo wrapper.
Runner: stopped.
