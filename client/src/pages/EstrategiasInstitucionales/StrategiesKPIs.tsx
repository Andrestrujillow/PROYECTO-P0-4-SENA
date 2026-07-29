import { useMemo } from "react";
import type { Ficha } from "../../types";
import StatCard from "../../components/cards/StatCard";
import { FileText, Users, Handshake, Building2 } from "lucide-react";

interface Props {
  fichas: Ficha[];
}

export default function StrategiesKPIs({ fichas }: Props) {
  const kpis = useMemo(() => {
    const totalFichas = fichas.length;
    const totalAprendices = fichas.reduce((s, f) => s + f.totalAprendices, 0);
    const totalConvenios = new Set(
      fichas.filter((f) => f.nombreConvenio && f.nombreConvenio.trim()).map((f) => f.nombreConvenio),
    ).size;
    const totalCentros = new Set(fichas.map((f) => f.codigoCentro)).size;

    return [
      { title: "Fichas", value: totalFichas, icon: <FileText className="w-5 h-5" />, color: "green" as const },
      { title: "Aprendices", value: totalAprendices, icon: <Users className="w-5 h-5" />, color: "blue" as const },
      { title: "Convenios", value: totalConvenios, icon: <Handshake className="w-5 h-5" />, color: "purple" as const },
      { title: "Centros", value: totalCentros, icon: <Building2 className="w-5 h-5" />, color: "orange" as const },
    ];
  }, [fichas]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 stagger-children">
      {kpis.map((kpi) => (
        <StatCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon} color={kpi.color} />
      ))}
    </div>
  );
}
