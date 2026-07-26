import { FileText, Users, Briefcase, Clock } from "lucide-react";
import type { Ficha } from "../../types";

interface Props {
  fichas: Ficha[];
}

export default function OffersKPIs({ fichas }: Props) {
  const totalFichas = fichas.length;
  const totalAprendices = fichas.reduce((s, f) => s + f.totalAprendices, 0);
  const totalEmpresas = new Set(fichas.filter((f) => f.nombreEmpresa).map((f) => f.nombreEmpresa)).size;
  const totalHoras = fichas.reduce((s, f) => s + f.totalHoras, 0);

  const kpis = [
    { title: "Total Fichas", value: totalFichas, icon: <FileText className="w-5 h-5" />, color: "green" as const },
    { title: "Aprendices", value: totalAprendices, icon: <Users className="w-5 h-5" />, color: "blue" as const },
    { title: "Empresas", value: totalEmpresas, icon: <Briefcase className="w-5 h-5" />, color: "orange" as const },
    { title: "Horas Totales", value: totalHoras.toLocaleString("es-CO"), icon: <Clock className="w-5 h-5" />, color: "purple" as const },
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
              <span className="stat-card-value">{typeof kpi.value === "number" ? kpi.value.toLocaleString("es-CO") : kpi.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
