# Context Rescue Card

Receipt ID: CR-0001
Proof: `sample_lineage_rescue_card`
Generated: 2026-07-07 local / 2026-07-08 UTC
Source: Local DataHub quickstart, `showcase-ecommerce` sample graph, DataHub MCP server

## Input

> The weekly revenue dashboard dropped after yesterday's customer/orders change.
> What changed, who owns it, what is affected, and what should we do next?

## Classification

Dashboard lineage / revenue reliability question.

## Urgency

High.

Reason: the affected cluster includes revenue measures, order metrics, a downstream PowerBI report, and PII-tagged order/customer context.

## Meaning

The likely investigation is not "ask a chatbot what revenue means." It is:

1. confirm which revenue definition is being used,
2. inspect the upstream `order_details` model and source tables,
3. check whether the dashboard drop is caused by a metric formula, freshness/change issue, filter mismatch, or promotion/order-count problem,
4. route the work to the data owner and dashboard owners with a receipt.

## Affected Assets

- PowerBI dataset: `Essential KPI Measures`
- PowerBI measures found on the asset:
  - `Total Revenue`: `SUMX('ORDER_DETAILS', 'ORDER_DETAILS'[order_total])`
  - `Average Order Value`: `DIVIDE([Total Revenue], [Total Orders], 0)`
  - `Revenue Per Customer`: `DIVIDE([Total Revenue], [Total Customers], 0)`
  - `YTD Revenue`: `CALCULATE([Total Revenue], DATESYTD('ORDER_DETAILS'[order_date]))`
  - `YoY Growth`: `DIVIDE([YTD Revenue] - [PY Revenue], [PY Revenue], 0)`
- Downstream PowerBI report: `datahub_order_entries`
- Downstream PowerBI pages:
  - `Customer Analysis`
  - `Geographics`
  - `Executive Summary`
  - `DAX Visual`
- Upstream anchor found by lineage: dbt dataset `ORDER_ENTRY_DB.analytics.order_details`
- Upstream graph size returned by MCP: 71 upstream dependencies, including 48 datasets and 23 data jobs.

## Likely Cause

Most likely: revenue definition or upstream order-detail context needs review before declaring a dashboard defect.

Evidence:

- The PowerBI `Total Revenue` measure sums `ORDER_DETAILS[order_total]`.
- The DataHub document `Key Metrics Reference` says headline GMV is `SUM(order_total)` from orders where order status is not `Cancelled` or `On Hold`.
- The same reference says net revenue should subtract returned item value.
- The `Order Details View` document says the model grain is order-item, not order, and recommends `COUNT(DISTINCT order_id)` for order counts.
- The `Order Details View` also lists `line_total` as actual revenue per line item and provides a revenue-by-category query using `SUM(line_total)`.
- A related runbook exists for order-count discrepancies, marked high severity for revenue reporting.

Interpretation: the agent should not guess that one specific upstream change broke the dashboard. It should route the next check to the metric definition, order status filter, return handling, order-item grain, and upstream freshness/schema path.

## Missing Context

- Exact timestamp of the customer/orders change.
- Which dashboard page or visual showed the drop.
- Whether the affected metric is Total Revenue, GMV, Net Revenue, AOV, YTD Revenue, or YoY Growth.
- Whether the drop is global, date-window-specific, customer-class-specific, or product/category-specific.
- Freshness and assertion status for the upstream order/customer tables at the time of the drop.
- Whether the expected business number is GMV or net revenue after returns.

## Context Used

MCP evidence files:

- `research/mcp_tools.json`
- `research/mcp_search_revenue.json`
- `research/mcp_revenue_cluster_entities.json`
- `research/mcp_essential_kpi_schema_fields.json`
- `research/mcp_essential_kpi_lineage_upstream.json`
- `research/mcp_essential_kpi_lineage_downstream.json`
- `research/mcp_search_documents_revenue.json`
- `research/mcp_revenue_document_excerpts.json`
- `research/mcp_essential_kpi_dataset_queries.json`

DataHub context types used:

- Search results
- Entity details
- Schema fields
- Lineage
- Ownership/escalation metadata
- Document search and excerpts
- Query history check

## Owner / Next Owner

Primary next owner:

- Ben Porter, Data Engineer, from the asset structured property `Data Owner Escalation Contact`.

Dashboard/report owners found downstream:

- Sarah Chen, Senior Data Analyst
- Marco Santos, Senior Software Engineer / Product Manager
- Priya Sharma, Data Steward
- Andrea Garcia, Analytics Engineer / Data Engineer

Suggested routing:

- First notify Ben Porter with the receipt and ask for the upstream `order_details` freshness/schema check.
- Include the dashboard owners if the issue is visible in PowerBI report `datahub_order_entries`.

## Decision

NEXT.

Reason: DataHub returned enough context to choose a concrete next action. This is not blocked.

## Suggested Next Action

Open the lineage path around `Essential KPI Measures` and `ORDER_ENTRY_DB.analytics.order_details`, then verify:

1. `ORDER_DETAILS[order_total]`, `order_date`, `order_id`, `customer_id`, `delivery_status`, and return-related fields.
2. whether cancelled/on-hold orders are filtered consistently.
3. whether the dashboard should use GMV, net revenue, or line-item revenue.
4. whether the drop aligns with the customer/orders change timestamp.
5. whether downstream report `datahub_order_entries` and its four pages all moved together or only one visual did.

## Writeback Status

Local receipt created. DataHub document writeback was not used in this proof because the local MCP server exposed read tools only in the default OSS registration.

## Receipt

CR-0001

