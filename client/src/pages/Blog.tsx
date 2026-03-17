// ============================================================
// Verum Cursos — Página de Blog
// Design: Prestige Academy Refinado
// ============================================================

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, User, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/data";

const categories = ["Todos", "Carreira", "Tecnologia", "Idiomas", "Liderança", "Mercado"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchCat = activeCategory === "Todos" || post.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts[0];
  const rest = filtered.filter((p) => p.id !== featured.id);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />

      {/* Header */}
      <div
        className="pt-20 pb-12 relative overflow-hidden"
        style={{ backgroundColor: "#0D2B55" }}
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/blog-hero-PX5TXDsvzCU86Eagwcnohe.webp)`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
          >
            Conteúdo gratuito
          </span>
          <h1
            className="text-3xl lg:text-5xl font-bold text-white mt-3 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Blog Verum Cursos
          </h1>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Artigos sobre carreira, tecnologia, idiomas e desenvolvimento profissional para
            ajudá-lo a tomar as melhores decisões.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/40 outline-none"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          </div>
        </div>
        <div className="verum-gold-line mt-8" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                activeCategory === cat
                  ? { background: "#0D2B55", color: "white", fontFamily: "'Raleway', sans-serif" }
                  : { background: "white", color: "#374151", border: "1px solid #e5e7eb", fontFamily: "'Raleway', sans-serif" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {activeCategory === "Todos" && !searchQuery && (
          <Link href={`/blog/${featured.id}`}>
            <article className="verum-card group mb-10 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative overflow-hidden h-64 md:h-auto">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
                  >
                    Em Destaque
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
                  >
                    {featured.category}
                  </span>
                  <h2
                    className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime} de leitura
                    </span>
                    <span>{featured.date}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
                  >
                    Ler artigo completo
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            
            <h3 className="text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Nenhum artigo encontrado
            </h3>
            <p className="text-gray-500">Tente outros termos ou categorias.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "Todos" && !searchQuery ? rest : filtered).map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="verum-card group h-full flex flex-col">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
                    >
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} de leitura</span>
                    </div>
                    <h3
                      className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "#0D2B5510", color: "#0D2B55" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      className="flex items-center gap-1 mt-4 text-sm font-bold"
                      style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
                    >
                      Ler artigo
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-14 rounded-2xl p-10 text-center"
          style={{ background: "linear-gradient(135deg, #0D2B55, #1A3A6B)" }}
        >
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pronto para começar a aprender?
          </h2>
          <p className="text-white/70 mb-6">
            Explore nossa curadoria de cursos e dê o próximo passo na sua carreira.
          </p>
          <Link href="/cursos">
            <button
              className="px-8 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
            >
              Explorar Cursos →
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
