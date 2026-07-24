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
    { label: "Programas", value: programasUnicos, icon: <GraduationCap className="w-4 h-4" />, color: "green" as const },
    { label: "Centros", value: centrosUnicos, icon: <Building2 className="w-4 h-4" />, color: "blue" as const },
    { label: "Empresas", value: empresasUnicas, icon: <Briefcase className="w-4 h-4" />, color: "yellow" as const },
    { label: "Activos", value: aprendicesActivos, icon: <Users className="w-4 h-4" />, color: "purple" as const },
  ];

  const colorMap = {
    green: { icon: "icon-green", accent: "accent-green" },
    blue: { icon: "icon-blue", accent: "accent-blue" },
    yellow: { icon: "icon-yellow", accent: "accent-yellow" },
    purple: { icon: "icon-purple", accent: "accent-purple" },
  };

  return (
    <div style={{ animation: "fadeInUp 0.5s ease-out 0.15s both" }}>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((c) => {
          const cls = colorMap[c.color];
          return (
            <div
              key={c.label}
              className="card"
              style={{ height: "80px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px", position: "relative", overflow: "hidden" }}
            >
              <div className={`stat-card-accent ${cls.accent}`} />
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <p className="stat-card-label" style={{ fontSize: "10px", marginBottom: "4px" }}>{c.label}</p>
                <p className="text-2xl font-bold text-sena-white tracking-tight" style={{ lineHeight: 1 }}>
                  {c.value.toLocaleString("es-CO")}
                </p>
              </div>
              <div className={`stat-card-icon ${cls.icon}`} style={{ width: "36px", height: "36px", borderRadius: "10px" }}>
                {c.icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
