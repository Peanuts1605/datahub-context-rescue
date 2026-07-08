#!/usr/bin/env python3
from __future__ import annotations

import argparse
import asyncio
import json
import os
from pathlib import Path
from typing import Any

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATAHUB_ENV = Path.home() / ".datahubenv"


def _parse_datahub_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    prefix: list[str] = []

    for raw in path.read_text().splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue

        indent = len(raw) - len(raw.lstrip(" "))
        key, sep, value = raw.strip().partition(":")
        if not sep:
            continue

        level = indent // 2
        prefix = prefix[:level]
        value = value.strip().strip('"').strip("'")

        if value:
            values[".".join([*prefix, key])] = value
        else:
            prefix.append(key)

    return values


def _jsonable(value: Any) -> Any:
    if hasattr(value, "model_dump"):
        return value.model_dump()
    if hasattr(value, "__dict__"):
        return value.__dict__
    return str(value)


def _decode_tool_result(result: Any) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "isError": getattr(result, "isError", None),
        "content": [],
    }

    for item in getattr(result, "content", []) or []:
        entry = _jsonable(item)
        text = entry.get("text") if isinstance(entry, dict) else None
        if text:
            try:
                entry["parsed_json"] = json.loads(text)
            except json.JSONDecodeError:
                pass
        payload["content"].append(entry)

    return payload


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("tool")
    parser.add_argument("arguments", help="JSON object with tool arguments")
    parser.add_argument("--out", required=True, help="Output JSON path")
    args = parser.parse_args()

    env_data = _parse_datahub_env(DATAHUB_ENV)
    token = env_data.get("gms.token")
    server = env_data.get("gms.server", "http://localhost:8080")

    if not token:
        raise SystemExit("Missing DataHub token in ~/.datahubenv")

    env = os.environ.copy()
    env["DATAHUB_GMS_URL"] = server
    env["DATAHUB_GMS_TOKEN"] = token

    server_params = StdioServerParameters(
        command="uvx",
        args=["mcp-server-datahub@latest"],
        env=env,
    )

    tool_args = json.loads(args.arguments)
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            result = await session.call_tool(args.tool, tool_args)

    payload = {
        "tool": args.tool,
        "arguments": tool_args,
        "result": _decode_tool_result(result),
    }

    output = Path(args.out)
    if not output.is_absolute():
        output = PROJECT_ROOT / output
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, indent=2, sort_keys=True))

    summary = {
        "tool": args.tool,
        "isError": payload["result"]["isError"],
        "content_items": len(payload["result"]["content"]),
        "out": str(output),
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
