import { chromium } from "../app/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const VIDEO_DIR = path.join(ROOT, "demo/video/captioned-raw");
const WEBM_OUT = path.join(ROOT, "demo/video/context-rescue-cr0001-captioned.webm");

const url = process.env.CONTEXT_RESCUE_DEMO_URL ?? "http://127.0.0.1:5177/";

async function pause(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function setCaption(page, text) {
  await page.evaluate((caption) => {
    const el = document.querySelector("#demo-caption");
    if (el) el.textContent = caption;
  }, text);
}

await fs.rm(VIDEO_DIR, { recursive: true, force: true });
await fs.mkdir(VIDEO_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: {
    dir: VIDEO_DIR,
    size: { width: 1440, height: 900 }
  }
});

const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });

await page.addStyleTag({
  content: `
    #demo-caption {
      position: fixed;
      left: 50%;
      bottom: 26px;
      transform: translateX(-50%);
      z-index: 99999;
      width: min(980px, calc(100vw - 72px));
      padding: 16px 22px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 16px;
      background: rgba(7, 17, 18, 0.90);
      color: #f7fffc;
      box-shadow: 0 18px 46px rgba(0, 0, 0, 0.28);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 24px;
      font-weight: 800;
      line-height: 1.32;
      text-align: center;
      letter-spacing: 0;
    }
  `
});
await page.evaluate(() => {
  const caption = document.createElement("div");
  caption.id = "demo-caption";
  caption.textContent = "";
  document.body.appendChild(caption);
});

await setCaption(
  page,
  "Context Rescue starts with a messy data-team question, not a clean dashboard ticket."
);
await pause(7000);

await setCaption(
  page,
  "The demo uses verified DataHub MCP evidence from the showcase-ecommerce sample graph."
);
await pause(6500);

await page.getByRole("button", { name: /run rescue/i }).click();
await setCaption(
  page,
  "Run rescue replays the evidence chain: Search, Entity, Schema, Lineage, and Documents."
);
await pause(7500);

await setCaption(
  page,
  "The answer is a Context Rescue Card: classification, urgency, meaning, affected assets, and missing context."
);
await page.mouse.wheel(0, 400);
await pause(8500);

await setCaption(
  page,
  "DataHub makes the next owner visible. CR-0001 routes the work to Ben Porter and the dashboard owners."
);
await page.mouse.wheel(0, 390);
await pause(8500);

await setCaption(
  page,
  "The decision is NEXT because DataHub returned enough context to choose a concrete investigation path."
);
await page.mouse.wheel(0, 360);
await pause(8000);

await setCaption(
  page,
  "The right side shows the proof: 16 search results, 71 upstream dependencies, 5 downstream assets, and 10 documents."
);
await page.mouse.wheel(0, 520);
await pause(8500);

await setCaption(
  page,
  "This is not a catalog chatbot or text-to-SQL clone. It is a receipt-backed decision aid for data work."
);
await pause(8000);

await page.mouse.wheel(0, -1800);
await setCaption(
  page,
  "CR-0001 leaves the next person with context, owner, action, and receipt. No guesswork. Context first."
);
await pause(8000);

await context.close();
await browser.close();

const files = await fs.readdir(VIDEO_DIR);
const webm = files.find((file) => file.endsWith(".webm"));
if (!webm) {
  throw new Error("No WebM video was recorded");
}

await fs.copyFile(path.join(VIDEO_DIR, webm), WEBM_OUT);
console.log(WEBM_OUT);
