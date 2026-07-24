import { FileText, Users, User, UserX } from "lucide-react";
import type { Ficha } from "../../types";

interface Props {
  fichas: Ficha[];
}

export default function OffersKPIs({ fichas }: Props) {
  const totalFichas = fichas.length;
  const totalFemeninos = fichas.reduce((s, f) => s + f.totalAprendicesFemeninos, 0);
  const totalMasculinos = fichas.reduce((s, f) => s + f.totalAprendicesMasculinos, 0);
  const totalNoBinario = fichas.reduce((s, f) => s + f.totalAprendicesNoBinario, 0);

  const kpis = [
    { title: "Total de Fichas", value: totalFichas, icon: <FileText className="w-5 h-5" />, color: "green" as const },
    { title: "Femeninos", value: totalFemeninos, icon: <Users className="w-5 h-5" />, color: "yellow" as const },
    { title: "Masculinos", value: totalMasculinos, icon: <User className="w-5 h-5" />, color: "blue" as const },
    { title: "No Binario", value: totalNoBinario, icon: <UserX className="w-5 h-5" />, color: "purple" as const },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, i) => (
        <div key={kpi.title} className="card stat-card" style={{ animation: `fadeInUp 0.5s ease-out ${0.06 * i}s both` }}>
          <div className={`stat-card-accent accent-${kpi.color}`} />
          <div className="stat-card-content">
            <span className="stat-card-label">{kpi.title}</span>
            <span className="stat-card-value">{kpi.value.toLocaleString("es-CO")}</span>
          </div>
          <div className={`stat-card-icon icon-${kpi.color}`}>{kpi.icon}</div>
        </div>
      ))}
    </div>
  );
}
