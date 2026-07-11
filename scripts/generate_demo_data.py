#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Any


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RESEARCH = PROJECT_ROOT / "research"
EXAMPLES = PROJECT_ROOT / "examples"
APP_DATA = PROJECT_ROOT / "app" / "src" / "data" / "proofData.json"


def read_json(path: Path) -> Any:
    return json.loads(path.read_text())


def read_tool_payload(name: str) -> Any:
    payload = read_json(RESEARCH / name)
    text_items = [
        item.get("text", "")
        for item in payload.get("result", {}).get("content", [])
        if item.get("text")
    ]
    if not text_items:
        return None
    return json.loads(text_items[0])


def clean_urn(urn: str) -> str:
    return urn.replace("urn:li:", "")


def owner_name(owner: dict[str, Any]) -> str:
    owner_entity = owner.get("owner", {})
    props = owner_entity.get("properties") or {}
    editable = owner_entity.get("editableProperties") or {}
    return props.get("displayName") or editable.get("displayName") or clean_urn(owner_entity.get("urn", "Unknown"))


def owner_title(owner: dict[str, Any]) -> str:
    owner_entity = owner.get("owner", {})
    props = owner_entity.get("properties") or {}
    editable = owner_entity.get("editableProperties") or {}
    return editable.get("title") or props.get("title") or "Data owner"


def main() -> None:
    search = read_tool_payload("mcp_search_revenue.json")
    entities = read_tool_payload("mcp_revenue_cluster_entities.json")
    schema = read_tool_payload("mcp_essential_kpi_schema_fields.json")
    upstream = read_tool_payload("mcp_essential_kpi_lineage_upstream.json")
    downstream = read_tool_payload("mcp_essential_kpi_lineage_downstream.json")
    docs = read_tool_payload("mcp_search_documents_revenue.json")
    excerpts = read_tool_payload("mcp_revenue_document_excerpts.json")
    queries = read_tool_payload("mcp_essential_kpi_dataset_queries.json")
    card = (EXAMPLES / "sample_lineage_rescue_card_CR-0001.md").read_text()

    main_asset = entities[0]
    structured = main_asset.get("structuredProperties", {}).get("properties", [])
    escalation = next(
        (
            value_entity
            for prop in structured
            if prop.get("structuredProperty", {}).get("definition", {}).get("displayName")
            == "Data Owner Escalation Contact"
            for value_entity in prop.get("valueEntities", [])
        ),
        None,
    )

    downstream_results = downstream["downstreams"]["searchResults"]
    report = downstream_results[0]["entity"]
    report_owners = report.get("ownership", {}).get("owners", [])

    owners = []
    if escalation:
        props = escalation.get("properties", {})
        owners.append(
            {
                "name": props.get("displayName", "Ben Porter"),
                "title": props.get("title", "Data Engineer"),
                "role": "Next owner",
            }
        )

    for owner in report_owners[:4]:
        owners.append(
            {
                "name": owner_name(owner),
                "title": owner_title(owner),
                "role": "Dashboard owner",
            }
        )

    measure_names = [
        "Total Revenue",
        "Average Order Value",
        "Revenue Per Customer",
        "YTD Revenue",
        "PY Revenue",
        "YoY Growth",
    ]
    measures = [
        {
            "name": field["fieldPath"],
            "definition": field.get("description", ""),
        }
        for field in schema["fields"]
        if field.get("fieldPath") in measure_names
    ]

    document_titles = [
        result["entity"]["info"]["title"]
        for result in docs["searchResults"][:5]
    ]
    document_excerpts = [
        {
            "title": result["title"],
            "excerpt": result["matches"][0]["excerpt"].replace("\n", " ").strip(),
        }
        for result in excerpts["results"]
        if result.get("matches")
    ]

    data = {
        "receiptId": "CR-0001",
        "status": "Ready",
        "question": "The weekly revenue dashboard dropped after yesterday's customer/orders change.",
        "decision": "NEXT",
        "tagline": "No guesswork. Context first.",
        "pitch": "Context Rescue reads the DataHub graph before it answers, turning a messy data-team question into a concrete owner, impact path, next action, and receipt.",
        "proof": {
            "name": "sample_lineage_rescue_card",
            "source": "Local DataHub quickstart with showcase-ecommerce sample graph",
            "mcpTools": [
                "search",
                "get_entities",
                "list_schema_fields",
                "get_lineage",
                "search_documents",
                "grep_documents",
                "get_dataset_queries",
            ],
        },
        "mcpSteps": [
            {
                "label": "Search",
                "count": search["total"],
                "detail": "Interpreted the question and found the revenue cluster.",
            },
            {
                "label": "Entity",
                "count": len(entities),
                "detail": "Resolved datasets, data products, and report context.",
            },
            {
                "label": "Schema",
                "count": schema["returned"],
                "detail": "Loaded revenue measures and key fields.",
            },
            {
                "label": "Lineage",
                "count": upstream["upstreams"]["total"] + downstream["downstreams"]["total"],
                "detail": "Mapped upstream dependencies and downstream impact.",
            },
            {
                "label": "Documents",
                "count": docs["total"],
                "detail": "Pulled metric definitions and runbook clues.",
            },
        ],
        "card": {
            "classification": "Dashboard lineage / revenue reliability question",
            "urgency": "High",
            "meaning": "Revenue definition or upstream order-detail context needs review before declaring a dashboard defect.",
            "affectedAssets": [
                main_asset["name"],
                report["properties"]["name"],
                "ORDER_ENTRY_DB.analytics.order_details",
            ],
            "missingContext": [
                "Exact timestamp of the customer/orders change",
                "Which dashboard page or metric showed the drop",
                "Whether the target number is GMV, net revenue, or line-item revenue",
                "Freshness/assertion state for upstream order and customer assets",
            ],
            "nextOwner": owners[0] if owners else {"name": "Ben Porter", "title": "Data Engineer", "role": "Next owner"},
            "suggestedAction": "Check the lineage path around Essential KPI Measures and order_details, then validate filters, grain, freshness, and return handling.",
            "receiptPath": str(PROJECT_ROOT / "receipts" / "DATAHUB_CONTEXT_RESCUE_FEASIBILITY_RECEIPT_2026-07-07.md"),
            "cardMarkdownCharacterCount": len(card),
        },
        "evidence": {
            "searchResults": search["total"],
            "upstreamTotal": upstream["upstreams"]["total"],
            "downstreamTotal": downstream["downstreams"]["total"],
            "schemaFields": schema["returned"],
            "documents": docs["total"],
            "datasetQueries": queries["total"],
            "mainAssetUrn": main_asset["urn"],
            "downstreamReportUrn": report["urn"],
            "documentTitles": document_titles,
            "documentExcerpts": document_excerpts,
            "measures": measures,
        },
        "owners": owners,
        "paths": {
            "input": str(EXAMPLES / "sample_lineage_rescue_input.md"),
            "card": str(EXAMPLES / "sample_lineage_rescue_card_CR-0001.md"),
            "receipt": str(PROJECT_ROOT / "receipts" / "DATAHUB_CONTEXT_RESCUE_FEASIBILITY_RECEIPT_2026-07-07.md"),
            "concept": str(PROJECT_ROOT / "demo" / "design" / "context-rescue-demo-concept-2026-07-07.png"),
        },
    }

    APP_DATA.parent.mkdir(parents=True, exist_ok=True)
    APP_DATA.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n")
    print(f"Wrote {APP_DATA}")


if __name__ == "__main__":
    main()
