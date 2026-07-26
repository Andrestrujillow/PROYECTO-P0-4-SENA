import { useMemo } from "react";
import {
  Clock,
  Briefcase,
  Users,
} from "lucide-react";
import type { Ficha } from "../../types";
import EChart, { donut2DOption, bar2DOption } from "../../components/charts/EChart";
import { CHART_COLORS } from "../../components/charts/EChart";

interface OffersChartsProps {
  fichas: Ficha[];
}

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  badgeLabel?: string;
  children: React.ReactNode;
}

function ChartCard({ title, icon, badgeLabel, children }: ChartCardProps) {
  return (
    <div className="card chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-lime-500/10 border border-lime-500/20">
            {icon}
          </div>
          <h3 className="chart-card-title">{title}</h3>
        </div>
        {badgeLabel && (
          <span className="px-2 py-0.5 rounded-full bg-sena-green/10 text-sena-green text-[10px] font-bold border border-sena-green/20">
            {badgeLabel}
          </span>
        )}
      </div>
      <div className="chart-card-body">
        {children}
      </div>
    </div>
  );
}

const estadoColors: Record<string, string> = {
  "En ejecucion": "#34D399",
  "TERMINADO": "#60A5FA",
  "Terminada": "#A78BFA",
  "Terminada por fecha": "#FB923C",
};

export default function OffersCharts({ fichas }: OffersChartsProps) {
  const horasPorEstado = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => map.set(f.estadoCurso, (map.get(f.estadoCurso) || 0) + f.totalHoras));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [fichas]);

  const totalHoras = horasPorEstado.reduce((a, b) => a + b[1], 0);

  const chart1Option = useMemo(() => donut2DOption(
    horasPorEstado.map(([name, value], i) => ({
      name,
      value,
      color: estadoColors[name] || CHART_COLORS[i % CHART_COLORS.length],
    }))
  ), [horasPorEstado]);

  const horasPorSector = useMemo(() => {
    const map = new Map<string, Map<string, number>>();
    const allEstados = new Set<string>();
    fichas.forEach((f) => {
      const sector = f.nombreSectorPrograma || "Sin sector";
      allEstados.add(f.estadoCurso);
      if (!map.has(sector)) map.set(sector, new Map());
      const inner = map.get(sector)!;
      inner.set(f.estadoCurso, (inner.get(f.estadoCurso) || 0) + f.totalHoras);
    });
    return { sectors: Array.from(map.keys()).sort(), allEstados: Array.from(allEstados).sort(), map };
  }, [fichas]);

  const chart2Option = useMemo(() => {
    const series = horasPorSector.allEstados.map((estado) => ({
      name: estado,
      data: horasPorSector.sectors.map((s) => horasPorSector.map.get(s)?.get(estado) || 0),
      color: estadoColors[estado] || CHART_COLORS[5],
    }));
    return bar2DOption(horasPorSector.sectors, [], { series, stacked: true });
  }, [horasPorSector]);

  const horasPorPrograma = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + f.totalHoras));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [fichas]);

  const chart3Option = useMemo(() => bar2DOption(
    horasPorPrograma.map((p) => p[0]),
    horasPorPrograma.map((p) => p[1]),
    { horizontal: true, barColor: "#F59E0B", showLabels: true }
  ), [horasPorPrograma]);

  if (fichas.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card chart-card" style={{ minHeight: 280 }}>
            <div className="flex items-center justify-center h-full">
              <span className="text-sm text-text-muted">Sin datos disponibles</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="chart-grid-2">
      <div style={{ animation: "fadeInUp 0.5s ease-out 0.3s both" }}>
        <ChartCard title="Horas por Estado" icon={<Clock className="w-4 h-4 text-lime-400" />} badgeLabel={`${totalHoras.toLocaleString("es-CO")}h`}>
          <EChart option={chart1Option} height={280} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.35s both" }}>
        <ChartCard title="Horas por Sector" icon={<Briefcase className="w-4 h-4 text-lime-400" />} badgeLabel={`${horasPorSector.sectors.length} sectores`}>
          <EChart option={chart2Option} height={280} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.4s both" }}>
        <ChartCard title="Horas por Programa (Top 8)" icon={<Users className="w-4 h-4 text-amber-400" />} badgeLabel="Top 8">
          <EChart option={chart3Option} height={280} />
        </ChartCard>
      </div>
    </div>
  );
}
