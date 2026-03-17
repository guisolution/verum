// ============================================================
// Verum Cursos — Página de Listagem de Cursos
// Design: Prestige Academy Refinado
// Features: Filtros por categoria/nicho/nível, busca, ordenação
// ============================================================

import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import {
  courses,
  type Category,
  type Niche,
  type Level,
  nicheLabels,
  categoryInfo,
} from "@/lib/data";

type SortOption = "relevancia" | "avaliacao" | "preco-asc" | "preco-desc" | "alunos";

const levelOptions: Level[] = ["Iniciante", "Intermediário", "Avançado"];
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "avaliacao", label: "Melhor Avaliação" },
  { value: "preco-asc", label: "Menor Preço" },
  { value: "preco-desc", label: "Maior Preço" },
  { value: "alunos", label: "Mais Alunos" },
];

const nichesByCategory: Record<Category, Niche[]> = {
  tecnologia: ["programacao", "dados", "web"],
  idiomas: ["ingles", "espanhol"],
  corporativo: ["lideranca", "produtividade", "comunicacao", "gestao"],
};

export default function Cursos() {
  const [location] = useLocation();

  const getInitialParams = () => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  };

  const [searchQuery, setSearchQuery] = useState(() => getInitialParams().get("busca") || "");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">(
    () => (getInitialParams().get("categoria") as Category) || ""
  );
  const [selectedNiches, setSelectedNiches] = useState<Niche[]>(() => {
    const n = getInitialParams().get("niche");
    return n ? [n as Niche] : [];
  });
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");
  const [showRecommended, setShowRecommended] = useState(
    () => getInitialParams().get("recomendados") === "true"
  );
  const [showFeatured, setShowFeatured] = useState(
    () => getInitialParams().get("destaque") === "true"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [maxPrice, setMaxPrice] = useState(1000);

  // Sync filters when URL changes (e.g., from navbar search)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const busca = p.get("busca") || "";
    const cat = (p.get("categoria") as Category) || "";
    if (busca) setSearchQuery(busca);
    if (cat) { setSelectedCategory(cat); setSelectedNiches([]); }
  }, [location]);

  // Available niches based on selected category
  const availableNiches: Niche[] = selectedCategory
    ? nichesByCategory[selectedCategory]
    : (Object.values(nichesByCategory).flat() as Niche[]);

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.instructor.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((c) => c.category === selectedCategory);
    }

    if (selectedNiches.length > 0) {
      result = result.filter((c) => selectedNiches.includes(c.niche));
    }

    if (selectedLevels.length > 0) {
      result = result.filter((c) => selectedLevels.includes(c.level));
    }

    if (showRecommended) {
      result = result.filter((c) => c.recommended);
    }

    if (showFeatured) {
      result = result.filter((c) => c.featured);
    }

    result = result.filter((c) => c.price <= maxPrice);

    // Sort
    switch (sortBy) {
      case "avaliacao":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "preco-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "preco-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "alunos":
        result.sort((a, b) => b.students - a.students);
        break;
      default:
        result.sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedNiches,
    selectedLevels,
    sortBy,
    showRecommended,
    showFeatured,
    maxPrice,
  ]);

  const toggleNiche = (niche: Niche) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const toggleLevel = (level: Level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedNiches([]);
    setSelectedLevels([]);
    setShowRecommended(false);
    setShowFeatured(false);
    setMaxPrice(1000);
    setSortBy("relevancia");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory ||
    selectedNiches.length > 0 ||
    selectedLevels.length > 0 ||
    showRecommended ||
    showFeatured ||
    maxPrice < 1000;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categoria */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
        >
          Categoria
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedCategory("");
              setSelectedNiches([]);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              !selectedCategory
                ? "text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={
              !selectedCategory
                ? { background: "#0D2B55", color: "white" }
                : {}
            }
          >
            Todas as categorias
          </button>
          {(Object.entries(categoryInfo) as [Category, typeof categoryInfo[keyof typeof categoryInfo]][]).map(
            ([key, cat]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key);
                  setSelectedNiches([]);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={
                  selectedCategory === key
                    ? { background: "#0D2B55", color: "white" }
                    : {}
                }
              >
                {cat.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Nicho */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
        >
          Área Específica
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableNiches.map((niche) => (
            <button
              key={niche}
              onClick={() => toggleNiche(niche)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border`}
              style={
                selectedNiches.includes(niche)
                  ? { background: "#C9A227", color: "#0D2B55", border: "1px solid #C9A227" }
                  : { background: "white", color: "#374151", border: "1px solid #e5e7eb" }
              }
            >
              {nicheLabels[niche]}
            </button>
          ))}
        </div>
      </div>

      {/* Nível */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
        >
          Nível
        </h3>
        <div className="space-y-2">
          {levelOptions.map((level) => (
            <label key={level} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                  selectedLevels.includes(level) ? "border-none" : "border-gray-300"
                }`}
                style={
                  selectedLevels.includes(level)
                    ? { background: "#C9A227" }
                    : {}
                }
                onClick={() => toggleLevel(level)}
              >
                {selectedLevels.includes(level) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5L2 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                )}
              </div>
              <span
                className="text-sm text-gray-700 group-hover:text-gray-900"
                onClick={() => toggleLevel(level)}
              >
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Preço */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
        >
          Preço máximo: R$ {maxPrice}
        </h3>
        <input
          type="range"
          min={100}
          max={1000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-yellow-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>R$ 100</span>
          <span>R$ 1000</span>
        </div>
      </div>

      {/* Filtros especiais */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
        >
          Filtros Especiais
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all`}
              style={
                showRecommended
                  ? { background: "#C9A227", border: "none" }
                  : { borderColor: "#d1d5db" }
              }
              onClick={() => setShowRecommended(!showRecommended)}
            >
              {showRecommended && (
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12">
                  <path d="M10 3L5 8.5L2 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700" onClick={() => setShowRecommended(!showRecommended)}>
              Apenas Recomendados
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all`}
              style={
                showFeatured
                  ? { background: "#C9A227", border: "none" }
                  : { borderColor: "#d1d5db" }
              }
              onClick={() => setShowFeatured(!showFeatured)}
            >
              {showFeatured && (
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12">
                  <path d="M10 3L5 8.5L2 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700" onClick={() => setShowFeatured(!showFeatured)}>
              Em Destaque
            </span>
          </label>
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
        >
          Limpar todos os filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />

      {/* Page header */}
      <div
        className="pt-20 pb-10"
        style={{ backgroundColor: "#0D2B55" }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
              >
                Catálogo completo
              </span>
              <h1
                className="text-3xl lg:text-4xl font-bold text-white mt-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Explorar Cursos
              </h1>
              <p className="text-white/60 mt-2 text-sm">
                {courses.length} cursos disponíveis em 3 categorias
              </p>
            </div>
            {/* Search bar */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Buscar cursos, instrutores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/40 outline-none"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category quick filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => { setSelectedCategory(""); setSelectedNiches([]); }}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={
                !selectedCategory
                  ? { background: "#C9A227", color: "#0D2B55" }
                  : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }
              }
            >
              Todos
            </button>
            {(Object.entries(categoryInfo) as [Category, typeof categoryInfo[keyof typeof categoryInfo]][]).map(
              ([key, cat]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedCategory(key); setSelectedNiches([]); }}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                  style={
                    selectedCategory === key
                      ? { background: "#C9A227", color: "#0D2B55" }
                      : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }
                  }
                >
                  {cat.label}
                </button>
              )
            )}
          </div>
        </div>
        <div className="verum-gold-line mt-6" />
      </div>

      <div className="flex-1 container mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="font-bold text-gray-900"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  Filtros
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Limpar
                  </button>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white shadow-sm border border-gray-200"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                  {hasActiveFilters && (
                    <span
                      className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                      style={{ background: "#C9A227", color: "#0D2B55" }}
                    >
                      !
                    </span>
                  )}
                </button>
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-gray-800">{filteredCourses.length}</span> cursos encontrados
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-700 outline-none cursor-pointer"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View mode */}
                <div className="hidden sm:flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "text-white" : "text-gray-400"}`}
                    style={viewMode === "grid" ? { background: "#0D2B55" } : {}}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "text-white" : "text-gray-400"}`}
                    style={viewMode === "list" ? { background: "#0D2B55" } : {}}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCategory && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#0D2B5520", color: "#0D2B55" }}
                  >
                    {categoryInfo[selectedCategory].label}
                    <button onClick={() => { setSelectedCategory(""); setSelectedNiches([]); }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedNiches.map((n) => (
                  <span
                    key={n}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#C9A22720", color: "#8a6a10" }}
                  >
                    {nicheLabels[n]}
                    <button onClick={() => toggleNiche(n)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedLevels.map((l) => (
                  <span
                    key={l}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#0D2B5520", color: "#0D2B55" }}
                  >
                    {l}
                    <button onClick={() => toggleLevel(l)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {showRecommended && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#C9A22720", color: "#8a6a10" }}
                  >
                    Recomendados
                    <button onClick={() => setShowRecommended(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Course grid */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                
                <h3
                  className="text-xl font-bold text-gray-800 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Nenhum curso encontrado
                </h3>
                <p className="text-gray-500 mb-6">
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-full text-sm font-bold"
                  style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    compact={viewMode === "list"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900" style={{ fontFamily: "'Raleway', sans-serif" }}>
                Filtros
              </h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
