# Context Rescue Demo Wrapper Research

Date: 2026-07-07 local / 2026-07-08 UTC
Lane: DataHub Agent Hackathon / Context Rescue

## Official Submission Shape

Source: https://datahub.devpost.com/rules

- Submission deadline: August 10, 2026 at 5:00pm EDT.
- Project must be a working software application that uses DataHub.
- Project must incorporate DataHub OSS/Core plus at least one of MCP Server, Agent Context Kit, DataHub Skills, or Analytics Agent.
- Required testing access: provide a project URL, functioning demo, or test build.
- Public code repository required for judging and testing.
- Repository must include source code, assets, full instructions, and an Apache 2.0 license visible at the top/About area.
- Demo video must be public, under 3 minutes, and show the project functioning.
- Sample outputs are recommended.

## Judge Fit

Primary category: Agents That Do Real Work.

The demo wrapper should prove:

1. The agent starts from a messy data-team question.
2. The answer is grounded in DataHub MCP evidence, not generic AI text.
3. The system uses search, entity, schema, lineage, document, and ownership context.
4. The output is a decision artifact: owner, affected assets, missing context, NEXT/HOLD, receipt.
5. The generated card is useful to a real data team.

## Product Copy

One-line pitch:

> Context Rescue reads the DataHub graph before it answers, turning a messy data-team question into a concrete owner, impact path, next action, and receipt.

Demo proof line:

> CR-0001 uses DataHub MCP search, entity metadata, schema fields, lineage, and context documents from the showcase-ecommerce graph.

Avoid:

- generic catalog chatbot framing
- text-to-SQL clone framing
- "AI magic" language
- production incident-platform promises

## Wrapper Decision

Build the smallest local wrapper:

- One seeded question.
- One Run rescue button.
- One visible MCP evidence chain.
- One Context Rescue Card.
- One evidence stack.
- One receipt link/path.

No backend service is needed for this patch. The wrapper can read generated static proof data from the CR-0001 MCP evidence files.

