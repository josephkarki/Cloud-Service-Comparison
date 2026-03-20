interface HeaderProps {
  compareCount: number;
  onViewCompare: () => void;
  onClearCompare: () => void;
}

export default function Header({ compareCount, onViewCompare, onClearCompare }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo-box">☁️</div>
          <h1 className="header-title">AWS<span>Compare</span></h1>
        </div>

        {compareCount > 0 && (
          <div className="header-compare-bar">
            <span className="compare-badge">{compareCount}</span>
            <span className="compare-label">
              service{compareCount !== 1 ? "s" : ""} selected
            </span>
            <button className="btn btn-primary" onClick={onViewCompare}>
              ⚡ Compare Now
            </button>
            <button className="btn btn-ghost" onClick={onClearCompare}>
              Clear
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
