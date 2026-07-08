import asyncio
import json
import os
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "research"


def load_datahub_env() -> dict[str, str]:
    env_path = Path.home() / ".datahubenv"
    current_section = None
    values: dict[str, str] = {}

    for raw_line in env_path.read_text().splitlines():
        line = raw_line.rstrip()
        if not line or line.lstrip().startswith("#"):
            continue
        if not raw_line.startswith(" ") and line.endswith(":"):
            current_section = line[:-1]
            continue
        if ":" not in line:
            continue

        key, value = line.strip().split(":", 1)
        value = value.strip().strip("'").strip('"')
        if current_section == "gms" and key == "server":
            values["DATAHUB_GMS_URL"] = value
        if current_section == "gms" and key == "token":
            values["DATAHUB_GMS_TOKEN"] = value

    missing = [k for k in ("DATAHUB_GMS_URL", "DATAHUB_GMS_TOKEN") if not values.get(k)]
    if missing:
        raise RuntimeError(f"Missing DataHub env values: {', '.join(missing)}")
    return values


def as_jsonable(value):
    if hasattr(value, "model_dump"):
        return value.model_dump(mode="json")
    if hasattr(value, "dict"):
        return value.dict()
    return value


async def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    datahub_env = load_datahub_env()

    server_env = os.environ.copy()
    server_env.update(datahub_env)

    params = StdioServerParameters(
        command="uvx",
        args=["mcp-server-datahub@latest"],
        env=server_env,
    )

    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            tools_payload = as_jsonable(tools)

            (OUT_DIR / "mcp_tools.json").write_text(
                json.dumps(tools_payload, indent=2, sort_keys=True)
            )

            tool_names = [tool["name"] for tool in tools_payload.get("tools", [])]
            print(json.dumps({"tool_count": len(tool_names), "tools": tool_names}, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
