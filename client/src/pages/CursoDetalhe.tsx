// ============================================================
// Verum Cursos — Página de Detalhe do Curso
// Design: Prestige Academy Refinado
// ============================================================

import { useParams, Link } from "wouter";
import {
  Star,
  Clock,
  Users,
  Award,
  CheckCircle,
  ExternalLink,
  ArrowLeft,
  BookOpen,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import {
  getCourseById,
  courses,
  nicheLabels,
  categoryInfo,
} from "@/lib/data";

export default function CursoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            
            <h2
              className="text-2xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Curso não encontrado
            </h2>
            <Link href="/cursos">
              <button
                className="px-6 py-3 rounded-full text-sm font-bold"
                style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
              >
                Ver todos os cursos
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  const catInfo = categoryInfo[course.category];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div
        className="pt-20 pb-6"
        style={{ backgroundColor: "#0D2B55" }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
            <Link href="/">
              <span className="hover:text-white transition-colors">Início</span>
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/cursos">
              <span className="hover:text-white transition-colors">Cursos</span>
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/cursos?categoria=${course.category}`}>
              <span className="hover:text-white transition-colors">{catInfo.label}</span>
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80 truncate max-w-xs">{course.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left: Course info */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {course.badge && (
                  <span
                    className="verum-badge verum-badge-gold"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    {course.badge}
                  </span>
                )}
                {course.recommended && (
                  <span className="verum-badge verum-badge-gold">Recomendado</span>
                )}
                <span
                  className="verum-badge text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                >
                  {course.level}
                </span>
              </div>

              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {course.title}
              </h1>

              <p className="text-white/75 text-base leading-relaxed mb-5">
                {course.description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-white">{course.rating}</span>
                  <span>({course.students.toLocaleString("pt-BR")} alunos)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} de conteúdo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{nicheLabels[course.niche]}</span>
                </div>
              </div>

              <p className="text-white/60 text-sm mt-3">
                Instrutor: <span className="text-white font-medium">{course.instructor}</span>
              </p>
            </div>

            {/* Right: Price card (desktop) */}
            <div className="hidden lg:block">
              <PriceCard course={course} discount={discount} />
            </div>
          </div>
        </div>
        <div className="verum-gold-line mt-6" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
              >
                Sobre o Curso
              </h2>
              <p className="text-gray-600 leading-relaxed">{course.longDescription}</p>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2
                className="text-xl font-bold mb-5"
                style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
              >
                O que você vai receber
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#C9A227" }}
                    />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
              >
                Tópicos abordados
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: "#0D2B5510",
                      color: "#0D2B55",
                      border: "1px solid #0D2B5520",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Platform info */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, #0D2B55, #1A3A6B)",
                color: "white",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,162,39,0.2)" }}
                >
                  <Award className="w-6 h-6" style={{ color: "#C9A227" }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Disponível na {course.platform}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Este curso é vendido e hospedado na plataforma {course.platform}. Ao clicar em
                    "Acessar Curso", você será redirecionado para a página oficial onde poderá
                    realizar a compra com segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Price card (mobile + sticky desktop) */}
          <div className="lg:hidden">
            <PriceCard course={course} discount={discount} />
          </div>

          {/* Sticky price card desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <PriceCard course={course} discount={discount} />

              {/* Instructor card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm mt-4">
                <h3
                  className="font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Instrutor
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: "#0D2B55" }}
                  >
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{course.instructor}</p>
                    <p className="text-xs text-gray-500">{catInfo.label}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl p-5 shadow-sm mt-4">
                <h3
                  className="font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Estatísticas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      Avaliação
                    </span>
                    <span className="font-bold text-gray-800">{course.rating}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Alunos
                    </span>
                    <span className="font-bold text-gray-800">
                      {course.students.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duração
                    </span>
                    <span className="font-bold text-gray-800">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Nível
                    </span>
                    <span className="font-bold text-gray-800">{course.level}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related courses */}
        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
                >
                  Você também pode gostar
                </span>
                <h2
                  className="text-2xl font-bold mt-1"
                  style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
                >
                  Cursos Relacionados
                </h2>
              </div>
              <Link href={`/cursos?categoria=${course.category}`}>
                <button
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                  style={{ border: "2px solid #0D2B55", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
                >
                  Ver mais
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function PriceCard({ course, discount }: { course: ReturnType<typeof getCourseById> & {}; discount: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Price header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-baseline gap-3 mb-1">
          <span
            className="text-3xl font-bold"
            style={{ color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
          >
            R$ {course!.price}
          </span>
          {discount > 0 && (
            <span
              className="text-sm font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#16a34a20", color: "#16a34a" }}
            >
              -{discount}%
            </span>
          )}
        </div>
        <span className="text-sm text-gray-400 line-through">
          R$ {course!.originalPrice}
        </span>
      </div>

      <div className="p-6 space-y-3">
        {/* Main CTA */}
        <a
          href={course!.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-base font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: "#C9A227",
            color: "#0D2B55",
            fontFamily: "'Raleway', sans-serif",
            boxShadow: "0 4px 16px rgba(201,162,39,0.3)",
          }}
        >
          Acessar Curso na {course!.platform}
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Secondary */}
        <Link href="/cursos">
          <button
            className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200"
            style={{
              border: "2px solid #0D2B55",
              color: "#0D2B55",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            Ver outros cursos
          </button>
        </Link>

        {/* Trust */}
        <div className="pt-3 space-y-2">
          {[
            { label: "Garantia de satisfação", icon: "shield" },
            { label: "Compra segura na " + course!.platform, icon: "lock" },
            { label: "Acesso em qualquer dispositivo", icon: "monitor" },
          ].map((item) => (
            <p key={item.label} className="text-xs text-gray-500 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
