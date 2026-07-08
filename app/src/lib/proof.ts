import proofData from "../data/proofData.json";

export type McpStep = {
  label: string;
  count: number;
  detail: string;
};

export type Owner = {
  name: string;
  title: string;
  role: string;
};

export type ProofData = {
  receiptId: string;
  status: string;
  question: string;
  decision: "NEXT" | "HOLD";
  tagline: string;
  pitch: string;
  proof: {
    name: string;
    source: string;
    mcpTools: string[];
  };
  mcpSteps: McpStep[];
  card: {
    classification: string;
    urgency: string;
    meaning: string;
    affectedAssets: string[];
    missingContext: string[];
    nextOwner: Owner;
    suggestedAction: string;
    receiptPath: string;
    cardMarkdownCharacterCount: number;
  };
  evidence: {
    searchResults: number;
    upstreamTotal: number;
    downstreamTotal: number;
    schemaFields: number;
    documents: number;
    datasetQueries: number;
    mainAssetUrn: string;
    downstreamReportUrn: string;
    documentTitles: string[];
    documentExcerpts: Array<{ title: string; excerpt: string }>;
    measures: Array<{ name: string; definition: string }>;
  };
  owners: Owner[];
  paths: {
    input: string;
    card: string;
    receipt: string;
    concept: string;
  };
};

export const proof = proofData as ProofData;

export function validateProofData(data: ProofData): string[] {
  const errors: string[] = [];

  if (data.receiptId !== "CR-0001") errors.push("receiptId must be CR-0001");
  if (data.decision !== "NEXT" && data.decision !== "HOLD") {
    errors.push("decision must be NEXT or HOLD");
  }
  if (!data.question.includes("weekly revenue dashboard")) {
    errors.push("question must include the seeded weekly revenue dashboard incident");
  }
  if (data.mcpSteps.length !== 5) errors.push("mcpSteps must include five replay steps");
  if (data.evidence.upstreamTotal !== 71) errors.push("upstreamTotal must match CR-0001 evidence");
  if (data.evidence.downstreamTotal !== 5) errors.push("downstreamTotal must match CR-0001 evidence");
  if (data.evidence.schemaFields !== 12) errors.push("schemaFields must match CR-0001 evidence");
  if (data.evidence.documents !== 10) errors.push("documents must match CR-0001 evidence");
  if (data.card.nextOwner.name !== "Ben Porter") errors.push("nextOwner must be Ben Porter");
  if (data.card.affectedAssets.length < 3) errors.push("affectedAssets should include dataset, report, and upstream model");
  if (!data.paths.receipt.endsWith("DATAHUB_CONTEXT_RESCUE_FEASIBILITY_RECEIPT_2026-07-07.md")) {
    errors.push("receipt path must point to the CR-0001 feasibility receipt");
  }

  return errors;
}

export function formatCountLabel(step: McpStep): string {
  const noun = step.count === 1 ? "hit" : "hits";
  if (step.label === "Lineage") return `${step.count} links`;
  if (step.label === "Schema") return `${step.count} fields`;
  if (step.label === "Documents") return `${step.count} docs`;
  return `${step.count} ${noun}`;
}

