// ============================================================
// Verum Cursos — Navbar
// Design: Prestige Academy Refinado
// Menu: Hamburger suspenso no canto direito, totalmente clicável
// Logo: Nova logo com V dourado e V azul + chapéu de formatura
// ============================================================

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { courses } from "@/lib/data";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/verum-logo_a0bf6574.png";

export default function Navbar({ onSearch }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof courses>([]);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // NÃO fechar o menu ao navegar
  // useEffect(() => {
  //   setMobileOpen(false);
  // }, [location]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      const q2 = q.toLowerCase();
      const results = courses
        .filter(
          (c) =>
            c.title.toLowerCase().includes(q2) ||
            c.tags.some((t) => t.toLowerCase().includes(q2)) ||
            c.instructor.toLowerCase().includes(q2)
        )
        .slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    onSearch?.(q);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      window.location.href = `/cursos?busca=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchResults([]);
    }
  };

  // Determine active route for indicator
  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    if (href === "/cursos") return location === "/cursos" || location.startsWith("/curso/");
    if (href === "/blog") return location === "/blog" || location.startsWith("/blog/");
    return location.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
      style={{ backgroundColor: "#0D2B55" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <img
                src={LOGO_URL}
                alt="Verum Cursos"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold text-lg tracking-wide text-white"
                  style={{ fontFamily: "'Raleway', sans-serif", letterSpacing: "0.08em" }}
                >
                  VERUM
                </span>
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif", letterSpacing: "0.18em" }}
                >
                  CURSOS
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleSearchSubmit}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                className="w-full pl-10 pr-4 py-2 rounded-full text-sm text-white placeholder-white/50 outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
              {/* Search dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl overflow-hidden z-50">
                  {searchResults.map((course) => (
                    <Link key={course.id} href={`/curso/${course.id}`}>
                      <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {course.title}
                          </p>
                          <p className="text-xs text-gray-500">{course.instructor}</p>
                        </div>
                        <span
                          className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: "#C9A227", color: "#0D2B55" }}
                        >
                          R$ {course.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                  <Link href={`/cursos?busca=${encodeURIComponent(searchQuery)}`}>
                    <div
                      className="px-4 py-2.5 text-sm font-semibold text-center transition-colors cursor-pointer hover:bg-gray-50"
                      style={{ color: "#C9A227" }}
                    >
                      Ver todos os resultados para "{searchQuery}"
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Menu controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-white/80 hover:text-white md:hidden"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white/80 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden pb-3 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Buscar cursos... (Enter para pesquisar)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleSearchSubmit}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm text-white placeholder-white/50 outline-none"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute left-4 right-4 top-full bg-white rounded-xl shadow-2xl overflow-hidden z-50">
                {searchResults.map((course) => (
                  <Link key={course.id} href={`/curso/${course.id}`}>
                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{course.title}</p>
                        <p className="text-xs text-gray-500">{course.instructor}</p>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href={`/cursos?busca=${encodeURIComponent(searchQuery)}`}>
                  <div className="px-4 py-2.5 text-sm font-semibold text-center" style={{ color: "#C9A227" }}>
                    Ver todos os resultados
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dropdown menu — abre no canto direito */}
      {mobileOpen && (
        <div
          className="fixed top-16 right-0 bottom-0 w-64 shadow-2xl overflow-y-auto z-40"
          style={{ backgroundColor: "#0D2B55" }}
        >
          <nav className="flex flex-col gap-0 p-4">
            {[
              { href: "/", label: "Início" },
              { href: "/cursos", label: "Explorar Cursos" },
              { href: "/cursos?categoria=tecnologia", label: "Tecnologia" },
              { href: "/cursos?categoria=idiomas", label: "Idiomas" },
              { href: "/cursos?categoria=corporativo", label: "Corporativo" },
              { href: "/blog", label: "Blog" },
            ].map((link) => {
              const active = isActive(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      active ? "bg-white/10" : "hover:bg-white/10"
                    }`}
                  >
                    {active && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#E8630A" }}
                      />
                    )}
                    <span
                      className={`text-sm font-medium ${active ? "text-white" : "text-white/80"}`}
                      style={{ fontFamily: "'Raleway', sans-serif" }}
                    >
                      {link.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Overlay para fechar o menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/20"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Gold accent line */}
      <div className="verum-gold-line" />
    </header>
  );
}
