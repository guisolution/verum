// ============================================================
// Verum Cursos — Footer
// Design: Prestige Academy Refinado
// ============================================================

import { Link } from "wouter";
import { Mail, Instagram, Linkedin, Youtube } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/verum-logo_a0bf6574.png";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A2040" }}>
      {/* Gold divider */}
      <div className="verum-gold-line" />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
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
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Portal de curadoria de cursos online para quem quer crescer profissionalmente.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(201,162,39,0.15)", color: "#C9A227" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#C9A227";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#0D2B55";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,162,39,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#C9A227";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
            >
              Categorias
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/cursos?categoria=tecnologia", label: "Tecnologia" },
                { href: "/cursos?categoria=idiomas", label: "Idiomas" },
                { href: "/cursos?categoria=corporativo", label: "Habilidades Corporativas" },
                { href: "/cursos?niche=programacao", label: "Programação" },
                { href: "/cursos?niche=dados", label: "Análise de Dados" },
                { href: "/cursos?niche=lideranca", label: "Liderança" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
            >
              Portal
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Início" },
                { href: "/cursos", label: "Explorar Cursos" },
                { href: "/blog", label: "Blog" },
                { href: "/cursos?recomendados=true", label: "Recomendados" },
                { href: "/cursos?destaque=true", label: "Em Destaque" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
            >
              Newsletter
            </h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Receba as melhores recomendações de cursos diretamente no seu e-mail.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-white/40 outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
              <button
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs text-white/40">
            © 2026 Verum Cursos. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/40">
            Portal de afiliados — Os cursos são vendidos pelas plataformas parceiras.
          </p>
        </div>
      </div>
    </footer>
  );
}
