import { useMemo } from "react";
import type { Ficha } from "../../types";
import StatCard from "../../components/cards/StatCard";
import { FileText, Users, Briefcase, Clock } from "lucide-react";

interface Props {
  fichas: Ficha[];
}

export default function OffersKPIs({ fichas }: Props) {
  const kpis = useMemo(() => {
    const totalFichas = fichas.length;
    const totalAprendices = fichas.reduce((s, f) => s + f.totalAprendices, 0);
    const totalEmpresas = new Set(
      fichas.filter((f) => f.nombreEmpresa).map((f) => f.nombreEmpresa),
    ).size;
    const totalHoras = fichas.reduce((s, f) => s + f.totalHoras, 0);

    return [
      { title: "Total Fichas", value: totalFichas, icon: <FileText className="w-5 h-5" />, color: "green" as const },
      { title: "Aprendices", value: totalAprendices, icon: <Users className="w-5 h-5" />, color: "blue" as const },
      { title: "Empresas", value: totalEmpresas, icon: <Briefcase className="w-5 h-5" />, color: "orange" as const },
      { title: "Horas Totales", value: totalHoras.toLocaleString("es-CO"), icon: <Clock className="w-5 h-5" />, color: "purple" as const },
    ];
  }, [fichas]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
      {kpis.map((kpi) => (
        <StatCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon} color={kpi.color} />
      ))}
    </div>
  );
}
