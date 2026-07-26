import { useMemo } from "react";
import {
  PieChart,
  BarChart3,
  Users,
} from "lucide-react";
import type { Ficha } from "../../types";
import EChart, { donut2DOption, bar2DOption } from "../../components/charts/EChart";
import { CHART_COLORS } from "../../components/charts/EChart";

interface SpecialChartsProps {
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

export default function SpecialCharts({ fichas }: SpecialChartsProps) {
  const programasMap = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const prog = f.nombreProgramaEspecial || "Sin programa especial";
      map.set(prog, (map.get(prog) || 0) + f.totalAprendices);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [fichas]);

  const chart1Option = useMemo(() => donut2DOption(
    programasMap.map(([name, value], i) => ({
      name,
      value,
      color: CHART_COLORS[i % CHART_COLORS.length],
    }))
  ), [programasMap]);

  const horasMap = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const prog = f.nombreProgramaEspecial || "Sin programa especial";
      map.set(prog, (map.get(prog) || 0) + f.totalHoras);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [fichas]);

  const chart2Option = useMemo(() => bar2DOption(
    horasMap.map((p) => p[0]),
    horasMap.map((p) => p[1]),
    { barColor: "#3B82F6" }
  ), [horasMap]);

  const centrosMap = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => map.set(f.nombreCentro, (map.get(f.nombreCentro) || 0) + f.totalAprendices));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [fichas]);

  const chart3Option = useMemo(() => bar2DOption(
    centrosMap.map((c) => c[0]),
    centrosMap.map((c) => c[1]),
    { horizontal: true, barColor: "#10B981", showLabels: true }
  ), [centrosMap]);

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
        <ChartCard title="Distribucion por Programa" icon={<PieChart className="w-4 h-4 text-sena-green" />} badgeLabel={`${programasMap.length} programas`}>
          <EChart option={chart1Option} height={280} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.35s both" }}>
        <ChartCard title="Horas por Programa Especial" icon={<BarChart3 className="w-4 h-4 text-lime-400" />} badgeLabel={`${horasMap.length} programas`}>
          <EChart option={chart2Option} height={280} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.4s both" }}>
        <ChartCard title="Aprendices por Centro (Top 8)" icon={<Users className="w-4 h-4 text-blue-400" />} badgeLabel="Top 8">
          <EChart option={chart3Option} height={280} />
        </ChartCard>
      </div>
    </div>
  );
}

export function SpecialChartsBottom({ fichas }: { fichas: Ficha[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const key = f.estadoCurso || "Sin dato";
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [fichas]);

  const total = data.reduce((s, d) => s + d[1], 0);

  const chartOption = useMemo(() => donut2DOption(
    data.map(([name, value], i) => ({
      name,
      value,
      color: CHART_COLORS[i % CHART_COLORS.length],
    })),
    total
  ), [data, total]);

  return (
    <div className="card chart-card">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-purple-400/10 border border-purple-400/10">
            <PieChart className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="chart-card-title">Comparacion del Estado de Aprendices</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-400 text-[10px] font-bold border border-purple-400/20">
          {total.toLocaleString("es-CO")} total
        </span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <EChart option={chartOption} height={280} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-text-muted">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}
