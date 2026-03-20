import { AWSService } from "../types";

interface ComparePanelProps {
  services: AWSService[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const ROWS: { label: string; key: keyof AWSService }[] = [
  { label: "Category", key: "category" },
  { label: "Description", key: "description" },
  { label: "Pricing Model", key: "pricing_model" },
  { label: "Pricing Notes", key: "pricing_notes" },
  { label: "Free Tier", key: "free_tier" },
];

export default function ComparePanel({ services, onClose, onRemove }: ComparePanelProps) {
  if (services.length === 0) return null;

  return (
    <div className="compare-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="compare-panel">
        <div className="compare-panel-header">
          <div>
            <h2 className="compare-panel-title">Side-by-Side Comparison</h2>
            <p className="compare-panel-meta">{services.length} service{services.length !== 1 ? "s" : ""} selected · Click ✕ on a column to remove it</p>
          </div>
          <button className="btn btn-ghost" onClick={onClose}>
            ✕ Close
          </button>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-th compare-th-label">Attribute</th>
                {services.map((s) => (
                  <th key={s.id} className="compare-th">
                    <div className="compare-th-inner">
                      <span className="compare-service-name">{s.name}</span>
                      <button
                        className="compare-remove-btn"
                        onClick={() => onRemove(s.id)}
                        title="Remove from comparison"
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({ label, key }) => (
                <tr key={key} className="compare-row">
                  <td className="compare-td compare-td-label">{label}</td>
                  {services.map((s) => (
                    <td key={s.id} className="compare-td">
                      {String(s[key])}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Key Features */}
              <tr className="compare-row">
                <td className="compare-td compare-td-label">Key Features</td>
                {services.map((s) => (
                  <td key={s.id} className="compare-td">
                    <ul className="compare-list">
                      {s.key_features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Use Cases */}
              <tr className="compare-row">
                <td className="compare-td compare-td-label">Use Cases</td>
                {services.map((s) => (
                  <td key={s.id} className="compare-td">
                    <ul className="compare-list">
                      {s.use_cases.map((u) => (
                        <li key={u}>{u}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Docs */}
              <tr className="compare-row">
                <td className="compare-td compare-td-label">Documentation</td>
                {services.map((s) => (
                  <td key={s.id} className="compare-td">
                    <a
                      href={s.docs_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="compare-docs-link"
                    >
                      Open Docs ↗
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
