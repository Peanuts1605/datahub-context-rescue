import { useMemo, useState } from "react";
import { formatCountLabel, proof, type McpStep } from "./lib/proof";

type ReplayState = "ready" | "running" | "complete";

function StepRow({
  step,
  index,
  activeIndex,
  replayState
}: {
  step: McpStep;
  index: number;
  activeIndex: number;
  replayState: ReplayState;
}) {
  const isComplete = replayState === "complete" || index < activeIndex;
  const isActive = replayState === "running" && index === activeIndex;
  const status = isComplete ? "complete" : isActive ? "active" : "queued";

  return (
    <li className={`step-row ${status}`}>
      <span className="step-marker" aria-hidden="true">
        {isComplete ? "✓" : index + 1}
      </span>
      <span className="step-copy">
        <span className="step-topline">
          <strong>{step.label}</strong>
          <span>{formatCountLabel(step)}</span>
        </span>
        <span>{step.detail}</span>
      </span>
    </li>
  );
}

function EvidenceMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="evidence-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function App() {
  const [replayState, setReplayState] = useState<ReplayState>("ready");
  const [activeIndex, setActiveIndex] = useState(0);

  const stateLabel = replayState === "running" ? "Reviewing" : replayState === "complete" ? "Ready" : "Observed";

  const ownerInitials = useMemo(
    () =>
      proof.card.nextOwner.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2),
    []
  );

  const receiptLabel = proof.card.receiptPath.split("/context-rescue/").at(-1) ?? proof.card.receiptPath;

  function runReplay() {
    setReplayState("running");
    setActiveIndex(0);

    proof.mcpSteps.forEach((_, index) => {
      window.setTimeout(() => {
        setActiveIndex(index);
      }, 420 * index);
    });

    window.setTimeout(() => {
      setActiveIndex(proof.mcpSteps.length);
      setReplayState("complete");
    }, 420 * proof.mcpSteps.length + 260);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            C
          </div>
          <div>
            <p className="eyeless-label">DataHub Agent Hackathon</p>
            <h1>Context Rescue</h1>
          </div>
        </div>
        <div className="status-rail" aria-label="Proof status">
          <span className={stateLabel === "Observed" ? "selected" : ""}>Observed</span>
          <span aria-hidden="true">→</span>
          <span className={stateLabel === "Reviewing" ? "selected" : ""}>Reviewed</span>
          <span aria-hidden="true">→</span>
          <span className={stateLabel === "Ready" ? "selected" : ""}>Ready</span>
        </div>
      </header>

      <section className="question-band" aria-labelledby="messy-question">
        <div>
          <p className="section-label" id="messy-question">
            Messy question
          </p>
          <p>{proof.question}</p>
        </div>
        <button type="button" className="run-button" onClick={runReplay} disabled={replayState === "running"}>
          <span className="play-glyph" aria-hidden="true" />
          {replayState === "running" ? "Running" : replayState === "complete" ? "Run again" : "Run rescue"}
        </button>
      </section>

      <section className="workspace-grid" aria-label="CR-0001 workspace">
        <aside className="panel mcp-panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">DataHub MCP</p>
              <h2>Evidence chain</h2>
            </div>
            <span className="soft-chip">Replay mode</span>
          </div>
          <ol className="steps-list">
            {proof.mcpSteps.map((step, index) => (
              <StepRow
                key={step.label}
                step={step}
                index={index}
                activeIndex={activeIndex}
                replayState={replayState}
              />
            ))}
          </ol>
          <div className="panel-note">
            <strong>Source</strong>
            <span>{proof.proof.source}</span>
          </div>
        </aside>

        <section className="panel rescue-card" aria-labelledby="card-title">
          <div className="receipt-row">
            <div>
              <p className="section-label">Context Rescue Card</p>
              <h2 id="card-title">{proof.receiptId}</h2>
            </div>
            <span className="decision-chip">{proof.decision}</span>
          </div>

          <dl className="card-fields">
            <div>
              <dt>Classification</dt>
              <dd>{proof.card.classification}</dd>
            </div>
            <div>
              <dt>Urgency</dt>
              <dd>
                <span className="urgency-chip">{proof.card.urgency}</span>
              </dd>
            </div>
            <div>
              <dt>Meaning</dt>
              <dd>{proof.card.meaning}</dd>
            </div>
            <div>
              <dt>Affected assets</dt>
              <dd>
                <ul className="inline-list">
                  {proof.card.affectedAssets.map((asset) => (
                    <li key={asset}>{asset}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Missing context</dt>
              <dd>
                <ul className="plain-list">
                  {proof.card.missingContext.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Next owner</dt>
              <dd>
                <span className="owner-inline">
                  <span className="avatar">{ownerInitials}</span>
                  <span>
                    <strong>{proof.card.nextOwner.name}</strong>
                    <small>{proof.card.nextOwner.title}</small>
                  </span>
                </span>
              </dd>
            </div>
            <div>
              <dt>Suggested action</dt>
              <dd>{proof.card.suggestedAction}</dd>
            </div>
            <div>
              <dt>Receipt</dt>
              <dd>{receiptLabel}</dd>
            </div>
          </dl>

          <footer className="card-footer">{proof.tagline}</footer>
        </section>

        <aside className="right-stack" aria-label="Evidence used">
          <section className="panel evidence-panel">
            <div className="panel-heading compact">
              <div>
                <p className="section-label">Evidence used</p>
                <h2>Grounded context</h2>
              </div>
            </div>
            <div className="metric-grid">
              <EvidenceMetric label="Search results" value={proof.evidence.searchResults} />
              <EvidenceMetric label="Schema fields" value={proof.evidence.schemaFields} />
              <EvidenceMetric label="Documents" value={proof.evidence.documents} />
              <EvidenceMetric label="Dataset queries" value={proof.evidence.datasetQueries} />
            </div>
            <div className="lineage-strip">
              <div>
                <strong>{proof.evidence.upstreamTotal}</strong>
                <span>upstream</span>
              </div>
              <div className="lineage-graphic" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div>
                <strong>{proof.evidence.downstreamTotal}</strong>
                <span>downstream</span>
              </div>
            </div>
          </section>

          <section className="panel compact-panel">
            <p className="section-label">Owners</p>
            <div className="owner-list">
              {proof.owners.slice(0, 4).map((owner) => (
                <div key={`${owner.name}-${owner.role}`} className="owner-row">
                  <span className="avatar small">{owner.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                  <span>
                    <strong>{owner.name}</strong>
                    <small>{owner.title}</small>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel compact-panel">
            <p className="section-label">Document clues</p>
            <ul className="doc-list">
              {proof.evidence.documentTitles.slice(0, 4).map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}

export default App;
