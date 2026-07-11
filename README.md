# Context Rescue

Context Rescue is a DataHub-native agent demo that turns a messy dashboard incident into a lineage-aware next decision.

**Live demo:** https://peanuts1605.github.io/datahub-context-rescue/

Given a messy data-team question, it uses DataHub MCP evidence to find relevant assets, inspect schema and metric definitions, trace upstream and downstream lineage, identify owners and missing context, then emit a Context Rescue Card with a NEXT/HOLD decision and durable receipt.

This is not a catalog chatbot or text-to-SQL clone. The demo proves that DataHub context can turn an ambiguous data incident into an owner, risk, affected assets, and the next safe action.

## Proof

Current proof: `CR-0001`

Question:

> The weekly revenue dashboard dropped after yesterday's customer/orders change.

Verified chain:

1. DataHub local quickstart
2. `showcase-ecommerce` sample graph
3. DataHub MCP server
4. MCP search, entity, schema, lineage, document, and query tools
5. Context Rescue Card
6. Local receipt

Sample output:

- `examples/sample_lineage_rescue_card_CR-0001.md`
- `receipts/DATAHUB_CONTEXT_RESCUE_FEASIBILITY_RECEIPT_2026-07-07.md`

## Try It

The wrapper runs in replay mode from verified CR-0001 evidence files. It does not require DataHub to be running just to view the demo.

```bash
cd app
npm ci
npm run dev
```

Then open the local URL printed by Vite.

The public demo is built from this source and published through the repository's `gh-pages` branch.

Demo evidence:

- Captioned demo video: `demo/video/context-rescue-cr0001-captioned.mp4`
- Desktop success screenshot: `demo/screenshots/context-rescue-wrapper-desktop-complete.png`
- Mobile screenshot: `demo/screenshots/context-rescue-wrapper-mobile-fullpage.png`
- Demo wrapper receipt: `receipts/DATAHUB_CONTEXT_RESCUE_DEMO_WRAPPER_RECEIPT_2026-07-07.md`

## Refresh Proof Data

If the MCP evidence files change, regenerate the app data:

```bash
python3 scripts/generate_demo_data.py
```

## Test

```bash
cd app
npm run lint
npm test
npm run build
```

## DataHub Setup Used For CR-0001

The proof was created with local DataHub and the sample ecommerce datapack:

```bash
datahub docker quickstart
datahub init --username datahub --password datahub
datahub datapack load showcase-ecommerce
```

The MCP server was run locally with DataHub connection values stored outside the repo. Do not commit tokens.

## Submission Notes

- Category: Open / Wildcard
- Data: public-safe DataHub sample data only
- Writeback status: local receipt created; live DataHub document writeback is parked until mutation/write tools are explicitly enabled and verified
- License: Apache 2.0
- Public repository: https://github.com/Peanuts1605/datahub-context-rescue
- Public demo: https://peanuts1605.github.io/datahub-context-rescue/
