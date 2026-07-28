import { useMemo } from "react";
import {
  BarChart3,
  TrendingDown,
  Award,
  PieChart,
  Users,
  Layers,
} from "lucide-react";
import type { Ficha } from "../../types";
import EChart, { bar2DOption, donut2DOption, bar2DOption as stackedBar } from "../../components/charts/EChart";
import { CHART_COLORS } from "../../components/charts/EChart";

interface BehaviorChartsProps {
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

export default function BehaviorCharts({ fichas }: BehaviorChartsProps) {
  const yearsMap = useMemo(() => {
    const map = new Map<string, Map<string, number>>();
    const allEstados = new Set<string>();
    fichas.forEach((f) => {
      const parts = f.fechaTerminacionFicha.split("/");
      const year = parts.length === 3 ? parts[2] : "";
      if (!year) return;
      allEstados.add(f.estadoCurso);
      if (!map.has(year)) map.set(year, new Map());
      const inner = map.get(year)!;
      inner.set(f.estadoCurso, (inner.get(f.estadoCurso) || 0) + f.totalAprendices);
    });
    return { sortedYears: Array.from(map.keys()).sort(), sortedEstados: Array.from(allEstados).sort(), map };
  }, [fichas]);

  const chart1Option = useMemo(() => {
    const series = yearsMap.sortedEstados.map((estado) => ({
      name: estado,
      data: yearsMap.sortedYears.map((y) => yearsMap.map.get(y)?.get(estado) || 0),
      color: estadoColors[estado] || CHART_COLORS[5],
    }));
    return stackedBar(yearsMap.sortedYears, [], { series, stacked: true });
  }, [yearsMap]);

  const sectorMap = useMemo(() => {
    const map = new Map<string, Map<string, number>>();
    const allEstados = new Set<string>();
    fichas.forEach((f) => {
      const sector = f.nombreSectorPrograma || "Sin sector";
      allEstados.add(f.estadoCurso);
      if (!map.has(sector)) map.set(sector, new Map());
      const inner = map.get(sector)!;
      inner.set(f.estadoCurso, (inner.get(f.estadoCurso) || 0) + f.totalAprendices);
    });
    return { sectors: Array.from(map.keys()).sort(), allEstados: Array.from(allEstados).sort(), map };
  }, [fichas]);

  const chart2Option = useMemo(() => {
    const series = sectorMap.allEstados.map((estado) => ({
      name: estado,
      data: sectorMap.sectors.map((s) => sectorMap.map.get(s)?.get(estado) || 0),
      color: estadoColors[estado] || CHART_COLORS[5],
    }));
    return stackedBar(sectorMap.sectors, [], { series, stacked: true });
  }, [sectorMap]);

  const desertados = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const d = f.totalAprendices - f.totalAprendicesActivos;
      if (d > 0) map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + d);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [fichas]);

  const chart3Option = useMemo(() => bar2DOption(
    desertados.map((d) => d[0]),
    desertados.map((d) => d[1]),
    { horizontal: true, barColor: "#FB7185", showLabels: true }
  ), [desertados]);

  const programasOfertados = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + 1));
    const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    const top8 = sorted.slice(0, 8);
    const rest = sorted.slice(8).reduce((a, [, v]) => a + v, 0);
    if (rest > 0) top8.push(["Otros", rest]);
    return top8;
  }, [fichas]);

  const chart4Option = useMemo(() => donut2DOption(
    programasOfertados.map((p, i) => ({
      name: p[0],
      value: p[1],
      color: CHART_COLORS[i % CHART_COLORS.length],
    }))
  ), [programasOfertados]);

  const programasInscritos = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + f.totalAprendices));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [fichas]);

  const chart5Option = useMemo(() => bar2DOption(
    programasInscritos.map((p) => p[0]),
    programasInscritos.map((p) => p[1]),
    { barColor: "#34D399" }
  ), [programasInscritos]);

  const programasCertificados = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      if (f.estadoCurso.includes("Terminada") || f.estadoCurso.includes("TERMINADO"))
        map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [fichas]);

  const chart6Option = useMemo(() => bar2DOption(
    programasCertificados.map((p) => p[0]),
    programasCertificados.map((p) => p[1]),
    { barColor: "#34D399" }
  ), [programasCertificados]);

  const totalCertificados = useMemo(
    () => fichas.filter((f) => f.estadoCurso.includes("Terminada") || f.estadoCurso.includes("TERMINADO")).length,
    [fichas]
  );

  if (fichas.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
      <div style={{ animation: "fadeInUp 0.5s ease-out 0.3s both" }}>
        <ChartCard title="Estado por Año" icon={<BarChart3 className="w-4 h-4 text-lime-400" />} badgeLabel={`${yearsMap.sortedYears.length} años`}>
          <EChart option={chart1Option} height={260} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.35s both" }}>
        <ChartCard title="Estado por Oferta" icon={<Layers className="w-4 h-4 text-lime-400" />} badgeLabel={`${sectorMap.sectors.length} ofertas`}>
          <EChart option={chart2Option} height={260} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.4s both" }}>
        <ChartCard title="Programas con Más Desertados" icon={<TrendingDown className="w-4 h-4 text-rose-400" />} badgeLabel={`Top ${desertados.length}`}>
          <EChart option={chart3Option} height={260} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.45s both" }}>
        <ChartCard title="Programas Más Ofertados" icon={<PieChart className="w-4 h-4 text-sena-green" />} badgeLabel={`${programasOfertados.length} programas`}>
          <EChart option={chart4Option} height={260} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.5s both" }}>
        <ChartCard title="Más Inscritos" icon={<Users className="w-4 h-4 text-blue-400" />} badgeLabel={`Top ${programasInscritos.length}`}>
          <EChart option={chart5Option} height={260} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.55s both" }}>
        <ChartCard title="Más Certificados" icon={<Award className="w-4 h-4 text-amber-400" />} badgeLabel={`${totalCertificados} total`}>
          <EChart option={chart6Option} height={260} />
        </ChartCard>
      </div>
    </div>
  );
}
