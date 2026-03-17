// ============================================================
// Verum Cursos — CourseCard
// Design: Prestige Academy Refinado
// ============================================================

import { Link } from "wouter";
import { Star, Clock, Users, ExternalLink } from "lucide-react";
import type { Course } from "@/lib/data";
import { nicheLabels } from "@/lib/data";

interface CourseCardProps {
  course: Course;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  tecnologia: "#1A3A6B",
  idiomas: "#1e3a5f",
  corporativo: "#1a2e4a",
};

export default function CourseCard({ course, compact = false }: CourseCardProps) {
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <Link href={`/curso/${course.id}`}>
      <div className="verum-card group h-full flex flex-col">
        {/* Image area */}
        <div className="relative overflow-hidden" style={{ height: compact ? "160px" : "200px" }}>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, ${categoryColors[course.category] || "#0D2B55"}dd)`,
            }}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {course.badge && (
              <span className="verum-badge verum-badge-gold text-xs">
                {course.badge}
              </span>
            )}
            {course.recommended && !course.badge && (
              <span className="verum-badge verum-badge-gold text-xs">
                Recomendado
              </span>
            )}
          </div>
          {/* Discount */}
          {discount > 0 && (
            <div
              className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#16a34a", color: "white" }}
            >
              -{discount}%
            </div>
          )}
          {/* Level badge bottom */}
          <div className="absolute bottom-3 left-3">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            >
              {course.level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Niche tag */}
          <span
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
          >
            {nicheLabels[course.niche]}
          </span>

          {/* Title */}
          <h3
            className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-900 transition-colors"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: compact ? "0.95rem" : "1.05rem",
            }}
          >
            {course.title}
          </h3>

          {/* Description */}
          {!compact && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
              {course.description}
            </p>
          )}

          {/* Instructor */}
          <p className="text-xs text-gray-500 mb-3">
            por <span className="font-medium text-gray-700">{course.instructor}</span>
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-700">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{course.students.toLocaleString("pt-BR")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-xl font-bold"
                  style={{ color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
                >
                  R$ {course.price}
                </span>
              </div>
              <span className="text-xs text-gray-400 line-through">
                R$ {course.originalPrice}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200"
              style={{
                background: "#C9A227",
                color: "#0D2B55",
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              Ver Curso
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Platform */}
          <p className="text-xs text-gray-400 mt-2 text-center">
            Disponível na {course.platform}
          </p>
        </div>
      </div>
    </Link>
  );
}
