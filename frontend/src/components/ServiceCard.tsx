import { AWSService } from "../types";

const CATEGORY_STYLES: Record<string, { accent: string; text: string; bg: string; border: string }> = {
  "AI & ML": { accent: "#a855f7", text: "#d8b4fe", bg: "rgba(168,85,247,0.1)",  border: "rgba(168,85,247,0.25)" },
  Analytics:  { accent: "#0ea5e9", text: "#7dd3fc", bg: "rgba(14,165,233,0.1)",  border: "rgba(14,165,233,0.25)" },
  Compute:    { accent: "#f97316", text: "#fb923c", bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.25)" },
  Database:   { accent: "#10b981", text: "#6ee7b7", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  Networking: { accent: "#3b82f6", text: "#93c5fd", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)" },
  Security:   { accent: "#ef4444", text: "#fca5a5", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.25)" },
  Storage:    { accent: "#6366f1", text: "#a5b4fc", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.25)" },
};

const CATEGORY_ICONS: Record<string, string> = {
  "AI & ML": "🤖", Analytics: "📊", Compute: "⚙️",
  Database: "🗄️", Networking: "🌐", Security: "🔒", Storage: "💾",
};

interface ServiceCardProps {
  service: AWSService;
  isSelected: boolean;
  canSelect: boolean;
  onToggleCompare: (service: AWSService) => void;
}

export default function ServiceCard({
  service,
  isSelected,
  canSelect,
  onToggleCompare,
}: ServiceCardProps) {
  const style = CATEGORY_STYLES[service.category] ?? { accent: "#f97316", text: "#fb923c", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.25)" };
  const disabled = !isSelected && !canSelect;

  return (
    <article
      className={`service-card ${isSelected ? "selected" : ""}`}
      style={{ "--accent": style.accent } as React.CSSProperties}
    >
      <div className="card-header">
        <div>
          <span
            className="card-category-badge"
            style={{ color: style.text, background: style.bg, borderColor: style.border }}
          >
            {CATEGORY_ICONS[service.category] ?? "📦"} {service.category}
          </span>
          <h2 className="card-name">{service.name}</h2>
        </div>
        <button
          className={`btn ${isSelected ? "btn-remove" : "btn-add"}`}
          onClick={() => onToggleCompare(service)}
          disabled={disabled}
          title={
            isSelected
              ? "Remove from comparison"
              : disabled
              ? "Maximum 3 services selected"
              : "Add to comparison"
          }
        >
          {isSelected ? "✓ Added" : "+ Compare"}
        </button>
      </div>

      <p className="card-description">{service.description}</p>

      <div className="card-section">
        <h3 className="card-section-title">Key Features</h3>
        <ul className="card-list">
          {service.key_features.slice(0, 3).map((f) => (
            <li key={f}>{f}</li>
          ))}
          {service.key_features.length > 3 && (
            <li className="card-list-more">+{service.key_features.length - 3} more</li>
          )}
        </ul>
      </div>

      <div className="card-footer">
        <div className="card-pricing">
          <span className="pricing-label">Pricing</span>
          <span className="pricing-model">{service.pricing_model}</span>
        </div>
        {service.free_tier !== "No free tier" && service.free_tier !== "Always free" && (
          <span className="free-tier-badge">Free Tier</span>
        )}
        {service.free_tier === "Always free" && (
          <span className="free-tier-badge always-free">Always Free</span>
        )}
        <a
          className="card-docs-link"
          href={service.docs_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs ↗
        </a>
      </div>
    </article>
  );
}
