import type { Ficha } from "../../types";
import {
  GraduationCap,
  Building2,
  Briefcase,
  Users,
} from "lucide-react";

interface BehaviorCardsProps {
  fichas: Ficha[];
}

export default function BehaviorCards({ fichas }: BehaviorCardsProps) {
  const programasUnicos = new Set(fichas.map((f) => f.nombreProgramaFormacion)).size;
  const centrosUnicos = new Set(fichas.map((f) => f.nombreCentro)).size;
  const empresasUnicas = new Set(fichas.filter((f) => f.nombreEmpresa).map((f) => f.nombreEmpresa)).size;
  const aprendicesActivos = fichas.reduce((acc, f) => acc + f.totalAprendicesActivos, 0);

  const cards = [
    { label: "Programas", value: programasUnicos, icon: <GraduationCap className="w-5 h-5" />, color: "green" as const },
    { label: "Centros", value: centrosUnicos, icon: <Building2 className="w-5 h-5" />, color: "blue" as const },
    { label: "Empresas", value: empresasUnicas, icon: <Briefcase className="w-5 h-5" />, color: "orange" as const },
    { label: "Activos", value: aprendicesActivos, icon: <Users className="w-5 h-5" />, color: "purple" as const },
  ];

  const colorMap = {
    green: { icon: "icon-green", accent: "accent-green" },
    blue: { icon: "icon-blue", accent: "accent-blue" },
    orange: { icon: "icon-orange", accent: "accent-orange" },
    purple: { icon: "icon-purple", accent: "accent-purple" },
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
      {cards.map((c) => {
        const cls = colorMap[c.color];
        return (
          <div
            key={c.label}
            className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200"
          >
            <div className={`stat-card-accent ${cls.accent}`} />
            <div className="flex items-center gap-3 pl-1">
              <div className={`stat-card-icon ${cls.icon}`}>
                {c.icon}
              </div>
              <div className="stat-card-content">
                <span className="stat-card-label">{c.label}</span>
                <span className="stat-card-value">{c.value.toLocaleString("es-CO")}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
