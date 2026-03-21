import { useState, useEffect, useMemo } from "react";
import { AWSService, ServicesResponse, CategoriesResponse } from "./types";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import SearchBar from "./components/SearchBar";
import ServiceCard from "./components/ServiceCard";
import ComparePanel from "./components/ComparePanel";

const MAX_COMPARE = 3;

export default function App() {
  const [services, setServices] = useState<AWSService[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [compareList, setCompareList] = useState<AWSService[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [svcRes, catRes] = await Promise.all([
  fetch("https://ir3w6rqkh7.execute-api.us-west-2.amazonaws.com/api/services"),
  fetch("https://ir3w6rqkh7.execute-api.us-west-2.amazonaws.com/api/categories"),
]);
        if (!svcRes.ok || !catRes.ok) throw new Error("Failed to fetch data from API");
        const svcData: ServicesResponse = await svcRes.json();
        const catData: CategoriesResponse = await catRes.json();
        setServices(svcData.services);
        setCategories(catData.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = services;
    if (selectedCategory) {
      result = result.filter((s) => s.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.key_features.some((f) => f.toLowerCase().includes(q)) ||
          s.use_cases.some((u) => u.toLowerCase().includes(q))
      );
    }
    return result;
  }, [services, selectedCategory, searchQuery]);

  const compareIds = useMemo(() => new Set(compareList.map((s) => s.id)), [compareList]);

  const handleToggleCompare = (service: AWSService) => {
    setCompareList((prev) => {
      if (prev.some((s) => s.id === service.id)) {
        return prev.filter((s) => s.id !== service.id);
      }
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, service];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (next.length === 0) setShowCompare(false);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Loading AWS services…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Could not connect to the API</h2>
        <p>{error}</p>
        <p className="error-hint">
          Make sure the backend is running:{" "}
          <code>uvicorn main:app --reload</code> inside <code>backend/</code>
        </p>
      </div>
    );
  }

  return (
    <>
      <Header
        compareCount={compareList.length}
        onViewCompare={() => setShowCompare(true)}
        onClearCompare={() => setCompareList([])}
      />

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">☁️ Amazon Web Services</div>
          <h2 className="hero-title">
            Compare AWS Services
            <span className="hero-title-gradient">Side by Side</span>
          </h2>
          <p className="hero-subtitle">
            Explore services across categories. Filter, search, and compare key features,
            pricing models, and use cases — all in one place.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">{services.length}</span>
              <span className="hero-stat-label">Services</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">{categories.length}</span>
              <span className="hero-stat-label">Categories</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">3</span>
              <span className="hero-stat-label">Max Compare</span>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="filters-section">
          <p className="filters-label">Filter by Category</p>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No services match your search.</p>
            <button className="btn btn-ghost" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="services-grid">
            {filtered.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={compareIds.has(service.id)}
                canSelect={compareList.length < MAX_COMPARE}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        )}
      </main>

      {showCompare && (
        <ComparePanel
          services={compareList}
          onClose={() => setShowCompare(false)}
          onRemove={handleRemoveFromCompare}
        />
      )}
    </>
  );
}
