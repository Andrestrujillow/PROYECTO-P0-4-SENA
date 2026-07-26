import { FileText, Users, Handshake, Building2 } from "lucide-react";
import type { Ficha } from "../../types";

interface Props {
  fichas: Ficha[];
}

export default function StrategiesKPIs({ fichas }: Props) {
  const totalFichas = fichas.length;
  const totalAprendices = fichas.reduce((s, f) => s + f.totalAprendices, 0);
  const totalConvenios = new Set(fichas.filter((f) => f.nombreConvenio && f.nombreConvenio.trim()).map((f) => f.nombreConvenio)).size;
  const totalCentros = new Set(fichas.map((f) => f.codigoCentro)).size;

  const kpis = [
    { title: "Fichas", value: totalFichas, icon: <FileText className="w-5 h-5" />, color: "green" as const },
    { title: "Aprendices", value: totalAprendices, icon: <Users className="w-5 h-5" />, color: "blue" as const },
    { title: "Convenios", value: totalConvenios, icon: <Handshake className="w-5 h-5" />, color: "purple" as const },
    { title: "Centros", value: totalCentros, icon: <Building2 className="w-5 h-5" />, color: "orange" as const },
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
