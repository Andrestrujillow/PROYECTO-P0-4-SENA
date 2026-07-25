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
    { title: "Total Fichas", value: totalFichas, icon: <FileText className="w-5 h-5" />, color: "green" as const },
    { title: "Femeninos", value: totalFemeninos, icon: <Users className="w-5 h-5" />, color: "blue" as const },
    { title: "Masculinos", value: totalMasculinos, icon: <User className="w-5 h-5" />, color: "purple" as const },
    { title: "No Binario", value: totalNoBinario, icon: <UserX className="w-5 h-5" />, color: "orange" as const },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.title} className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200">
          <div className={`stat-card-accent accent-${kpi.color}`} />
          <div className="flex items-center gap-3 pl-1">
            <div className={`stat-card-icon icon-${kpi.color}`}>
              {kpi.icon}
            </div>
            <div className="stat-card-content">
              <span className="stat-card-label">{kpi.title}</span>
              <span className="stat-card-value">{kpi.value.toLocaleString("es-CO")}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
