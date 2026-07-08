import { describe, expect, it } from "vitest";
import { formatCountLabel, proof, validateProofData } from "./proof";

describe("CR-0001 proof data", () => {
  it("matches the verified feasibility receipt contract", () => {
    expect(validateProofData(proof)).toEqual([]);
  });

  it("keeps the proven DataHub evidence counts visible", () => {
    expect(proof.evidence.searchResults).toBe(16);
    expect(proof.evidence.upstreamTotal).toBe(71);
    expect(proof.evidence.downstreamTotal).toBe(5);
    expect(proof.evidence.schemaFields).toBe(12);
    expect(proof.evidence.documents).toBe(10);
  });

  it("does not claim live writeback", () => {
    expect(proof.card.suggestedAction).not.toMatch(/wrote back/i);
    expect(proof.proof.mcpTools).not.toContain("save_document");
  });

  it("formats MCP counts for the replay rail", () => {
    expect(formatCountLabel({ label: "Lineage", count: 76, detail: "" })).toBe("76 links");
    expect(formatCountLabel({ label: "Schema", count: 12, detail: "" })).toBe("12 fields");
    expect(formatCountLabel({ label: "Search", count: 16, detail: "" })).toBe("16 hits");
  });
});

