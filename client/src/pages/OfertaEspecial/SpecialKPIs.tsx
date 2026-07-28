import { useMemo } from "react";
import type { Ficha } from "../../types";
import StatCard from "../../components/cards/StatCard";
import { FileText, Users, Building2, Briefcase } from "lucide-react";

interface SpecialKPIsProps {
  fichas: Ficha[];
}

export default function SpecialKPIs({ fichas }: SpecialKPIsProps) {
  const kpis = useMemo(() => {
    const totalAprendices = fichas.reduce((acc, f) => acc + f.totalAprendices, 0);
    const totalCentros = new Set(fichas.map((f) => f.codigoCentro)).size;
    const totalEmpresas = new Set(
      fichas.filter((f) => f.nombreEmpresa).map((f) => f.nombreEmpresa),
    ).size;

    return [
      { title: "Fichas Especiales", value: fichas.length, icon: <FileText className="w-5 h-5" />, color: "green" as const },
      { title: "Aprendices", value: totalAprendices, icon: <Users className="w-5 h-5" />, color: "blue" as const },
      { title: "Centros", value: totalCentros, icon: <Building2 className="w-5 h-5" />, color: "purple" as const },
      { title: "Empresas", value: totalEmpresas, icon: <Briefcase className="w-5 h-5" />, color: "orange" as const },
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
