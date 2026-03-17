// ============================================================
// Verum Cursos — Home Page
// Design: Prestige Academy Refinado
// Seções: Hero, Categorias, Recomendados, Destaques, Stats, Blog Preview
// ============================================================

import { Link } from "wouter";
import { useRef, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Star,
  ArrowRight,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { getRecommendedCourses, getFeaturedCourses, blogPosts, categoryInfo } from "@/lib/data";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const recommended = getRecommendedCourses();
  const featured = getFeaturedCourses();
  const recentPosts = blogPosts.slice(0, 3);

  const statsRef = useScrollReveal();
  const catRef = useScrollReveal();
  const recRef = useScrollReveal();
  const featRef = useScrollReveal();
  const blogRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden pt-16"
        style={{ backgroundColor: "#0D2B55" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/hero-bg-BneXHaNyM7rKnRR4N4VzrK.webp)`,
          }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,43,85,0.95) 0%, rgba(13,43,85,0.7) 50%, rgba(26,58,107,0.85) 100%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center py-16">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            style={{
              background: "rgba(201,162,39,0.15)",
              border: "1px solid rgba(201,162,39,0.3)",
              color: "#C9A227",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Curadoria de Cursos Premium
          </div>

          {/* Headline */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tecnologia, Habilidades
            <br />
            <span style={{ color: "#C9A227" }}>Corporativas e Idiomas</span>
            <br />
            para impulsionar sua carreira.
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Domine programação, ferramentas de mercado e alcance a fluência que o mundo global exige.
            Cursos selecionados a dedo para o seu crescimento profissional.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Link href="/cursos?categoria=corporativo">
              <button
                className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "#C9A227",
                  color: "#0D2B55",
                  fontFamily: "'Raleway', sans-serif",
                  boxShadow: "0 4px 16px rgba(201,162,39,0.3)",
                }}
              >
                Ver cursos de Habilidades Corporativas
              </button>
            </Link>
            <Link href="/cursos?categoria=idiomas">
              <button
                className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "#C9A227",
                  color: "#0D2B55",
                  fontFamily: "'Raleway', sans-serif",
                  boxShadow: "0 4px 16px rgba(201,162,39,0.3)",
                }}
              >
                Ver cursos de Idiomas
              </button>
            </Link>
            <Link href="/cursos?categoria=tecnologia">
              <button
                className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "#C9A227",
                  color: "#0D2B55",
                  fontFamily: "'Raleway', sans-serif",
                  boxShadow: "0 4px 16px rgba(201,162,39,0.3)",
                }}
              >
                Ver cursos de TI
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Cursos com nota 4.6+</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>+200.000 alunos atendidos</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Plataformas certificadas</span>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F5F0E8" />
          </svg>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="py-10" style={{ backgroundColor: "#F5F0E8" }}>
        <div
          ref={statsRef}
          className="container mx-auto px-4 lg:px-8 stagger-children"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, value: "15+", label: "Cursos Curados", color: "#0D2B55" },
              { icon: Users, value: "200K+", label: "Alunos Formados", color: "#0D2B55" },
              { icon: Star, value: "4.8", label: "Avaliação Média", color: "#C9A227" },
              { icon: TrendingUp, value: "3", label: "Áreas de Foco", color: "#0D2B55" },
            ].map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color, fontFamily: "'Playfair Display', serif" }}
                >
                  {value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ──────────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
            >
              Navegue por área
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold mt-2 mb-3"
              style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
            >
              Três grandes áreas de conhecimento
            </h2>
            <div className="verum-gold-line max-w-xs mx-auto" />
          </div>

          <div
            ref={catRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children"
          >
            {(Object.entries(categoryInfo) as [keyof typeof categoryInfo, typeof categoryInfo[keyof typeof categoryInfo]][]).map(
              ([key, cat]) => (
                <Link key={key} href={`/cursos?categoria=${key}`}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer h-64">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(13,43,85,0.92) 0%, rgba(13,43,85,0.5) 50%, transparent 100%)",
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3
                        className="text-xl font-bold text-white mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {cat.label}
                      </h3>
                      <p className="text-sm text-white/70 mb-3">{cat.description}</p>
                      <div
                        className="flex items-center gap-1 text-sm font-bold transition-all duration-200 group-hover:gap-2"
                        style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
                      >
                        Explorar cursos
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── RECOMENDADOS ────────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
              >
                Seleção especial
              </span>
              <h2
                className="text-3xl lg:text-4xl font-bold mt-2"
                style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
              >
                Cursos Recomendados
              </h2>
              <p className="text-gray-600 mt-2 text-sm">
                Os cursos com melhor custo-benefício e avaliação da nossa curadoria.
              </p>
            </div>
            <Link href="/cursos?recomendados=true">
              <button
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{
                  border: "2px solid #0D2B55",
                  color: "#0D2B55",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div
            ref={recRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
          >
            {recommended.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/cursos?recomendados=true">
              <button
                className="px-6 py-3 rounded-full text-sm font-bold"
                style={{
                  border: "2px solid #0D2B55",
                  color: "#0D2B55",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                Ver todos os recomendados
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BANNER CTA ──────────────────────────────────────── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ backgroundColor: "#0D2B55" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/hero-bg-BneXHaNyM7rKnRR4N4VzrK.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          ref={ctaRef}
          className="relative z-10 container mx-auto px-4 lg:px-8 text-center fade-in-up"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Explore nossa curadoria completa e encontre o curso ideal para o seu momento de carreira.
          </p>
          <Link href="/cursos">
            <button
              className="px-8 py-4 rounded-full text-base font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-1"
              style={{
                background: "#C9A227",
                color: "#0D2B55",
                fontFamily: "'Raleway', sans-serif",
                boxShadow: "0 8px 32px rgba(201,162,39,0.4)",
              }}
            >
              Explorar todos os cursos →
            </button>
          </Link>
        </div>
      </section>

      {/* ── EM DESTAQUE ─────────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
              >
                Em evidência
              </span>
              <h2
                className="text-3xl lg:text-4xl font-bold mt-2"
                style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
              >
                Cursos em Destaque
              </h2>
            </div>
            <Link href="/cursos?destaque=true">
              <button
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{
                  border: "2px solid #0D2B55",
                  color: "#0D2B55",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div
            ref={featRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
          >
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ────────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
              >
                Conteúdo gratuito
              </span>
              <h2
                className="text-3xl lg:text-4xl font-bold mt-2"
                style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
              >
                Blog & Artigos
              </h2>
            </div>
            <Link href="/blog">
              <button
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                style={{
                  border: "2px solid #0D2B55",
                  color: "#0D2B55",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div
            ref={blogRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children"
          >
            {recentPosts.map((post) => (
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
                    <p className="text-sm text-gray-600 line-clamp-2 flex-1">{post.excerpt}</p>
                    <div
                      className="flex items-center gap-1 mt-4 text-sm font-bold"
                      style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
                    >
                      Ler artigo
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
