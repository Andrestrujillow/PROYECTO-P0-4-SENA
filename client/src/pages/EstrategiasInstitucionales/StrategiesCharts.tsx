import { useMemo } from "react";
import {
  PieChart,
  Briefcase,
  BarChart3,
} from "lucide-react";
import type { Ficha } from "../../types";
import EChart, { donut2DOption, bar2DOption } from "../../components/charts/EChart";
import { DARK_THEME } from "../../components/charts/EChart";

interface StrategiesChartsProps {
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

export default function StrategiesCharts({ fichas }: StrategiesChartsProps) {
  const conveniosMap = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const conv = f.nombreConvenio || "Sin convenio";
      map.set(conv, (map.get(conv) || 0) + f.totalAprendices);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [fichas]);

  const chart1Option = useMemo(() => donut2DOption(
    conveniosMap.map(([name, value], i) => ({
      name: name,
      value,
      color: DARK_THEME.color[i % DARK_THEME.color.length],
    }))
  ), [conveniosMap]);

  const horasConvenio = useMemo(() => {
    const map = new Map<string, { total: number; fichas: number }>();
    fichas.forEach((f) => {
      const conv = f.nombreConvenio || "Sin convenio";
      const entry = map.get(conv) || { total: 0, fichas: 0 };
      entry.total += f.totalHoras;
      entry.fichas += 1;
      map.set(conv, entry);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 8);
  }, [fichas]);

  const chart2Option = useMemo(() => bar2DOption(
    horasConvenio.map((c) => c[0]),
    horasConvenio.map((c) => c[1].total),
    { barColor: "#F59E0B" }
  ), [horasConvenio]);

  const conveniosMunicipio = useMemo(() => {
    const map = new Map<string, Map<string, number>>();
    const allConvenios = new Set<string>();
    fichas.forEach((f) => {
      const conv = f.nombreConvenio || "Sin convenio";
      const muni = f.nombreMunicipioCurso || "Sin municipio";
      allConvenios.add(conv);
      if (!map.has(muni)) map.set(muni, new Map());
      const inner = map.get(muni)!;
      inner.set(conv, (inner.get(conv) || 0) + f.totalAprendices);
    });
    return { municipalities: Array.from(map.keys()).slice(0, 10).sort(), allConvenios: Array.from(allConvenios).sort(), map };
  }, [fichas]);

  const chart3Option = useMemo(() => {
    const series = conveniosMunicipio.allConvenios.map((conv, i) => ({
      name: conv,
      data: conveniosMunicipio.municipalities.map((m) => conveniosMunicipio.map.get(m)?.get(conv) || 0),
      color: DARK_THEME.color[i % DARK_THEME.color.length],
    }));
    return bar2DOption(conveniosMunicipio.municipalities, [], { series, stacked: true });
  }, [conveniosMunicipio]);

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
        <ChartCard title="Distribucion por Convenio" icon={<PieChart className="w-4 h-4 text-sena-green" />} badgeLabel={`${conveniosMap.length} convenios`}>
          <EChart option={chart1Option} height={280} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.35s both" }}>
        <ChartCard title="Horas por Convenio (Top 8)" icon={<Briefcase className="w-4 h-4 text-lime-400" />} badgeLabel="Top 8">
          <EChart option={chart2Option} height={280} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.4s both" }}>
        <ChartCard title="Convenios por Municipio" icon={<BarChart3 className="w-4 h-4 text-lime-400" />} badgeLabel={`${conveniosMunicipio.municipalities.length} municipios`}>
          <EChart option={chart3Option} height={280} />
        </ChartCard>
      </div>
    </div>
  );
}
