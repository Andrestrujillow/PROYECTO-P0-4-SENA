import { useMemo } from "react";
import type { Ficha } from "../../types";
import StatCard from "../../components/cards/StatCard";
import { GraduationCap, Building2, Briefcase, Users } from "lucide-react";

interface BehaviorCardsProps {
  fichas: Ficha[];
}

export default function BehaviorCards({ fichas }: BehaviorCardsProps) {
  const kpis = useMemo(() => {
    const programasUnicos = new Set(fichas.map((f) => f.nombreProgramaFormacion)).size;
    const centrosUnicos = new Set(fichas.map((f) => f.nombreCentro)).size;
    const empresasUnicas = new Set(
      fichas.filter((f) => f.nombreEmpresa).map((f) => f.nombreEmpresa),
    ).size;
    const aprendicesActivos = fichas.reduce((acc, f) => acc + f.totalAprendicesActivos, 0);

    return [
      { label: "Programas", value: programasUnicos, icon: <GraduationCap className="w-5 h-5" />, color: "green" as const },
      { label: "Centros", value: centrosUnicos, icon: <Building2 className="w-5 h-5" />, color: "blue" as const },
      { label: "Empresas", value: empresasUnicas, icon: <Briefcase className="w-5 h-5" />, color: "orange" as const },
      { label: "Activos", value: aprendicesActivos, icon: <Users className="w-5 h-5" />, color: "purple" as const },
    ];
  }, [fichas]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
      {kpis.map((kpi) => (
        <StatCard key={kpi.label} title={kpi.label} value={kpi.value} icon={kpi.icon} color={kpi.color} />
      ))}
    </div>
  );
}
