interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export default function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search services by name, description, or feature…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button className="search-clear" onClick={() => onChange("")} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>
      <span className="search-count">
        {resultCount} service{resultCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
