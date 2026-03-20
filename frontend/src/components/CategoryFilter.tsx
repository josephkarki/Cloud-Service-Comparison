const CATEGORY_ICONS: Record<string, string> = {
  "AI & ML": "🤖",
  Analytics: "📊",
  Compute: "⚙️",
  Database: "🗄️",
  Networking: "🌐",
  Security: "🔒",
  Storage: "💾",
};

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <button
        className={`category-btn ${selected === null ? "active" : ""}`}
        onClick={() => onSelect(null)}
      >
        All Services
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${selected === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          <span>{CATEGORY_ICONS[cat] ?? "📦"}</span>
          {cat}
        </button>
      ))}
    </div>
  );
}
