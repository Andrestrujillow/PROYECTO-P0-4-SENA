import { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  BarChart3,
  TrendingDown,
  Award,
  PieChart,
  Users,
  Layers,
} from "lucide-react";
import type { Ficha } from "../../types";
import { defaultOptions, CHART_COLORS } from "../../components/charts/chartConfig";

interface BehaviorChartsProps {
  fichas: Ficha[];
}

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  accent: string;
  iconBg: string;
  badgeLabel?: string;
  badgeColor?: string;
  children: React.ReactNode;
}

function ChartCard({ title, icon, accent, iconBg, badgeLabel, badgeColor, children }: ChartCardProps) {
  return (
    <div className={`card chart-card ${accent}`}>
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className={`chart-card-icon ${iconBg}`}>
            {icon}
          </div>
          <h3 className="chart-card-title">{title}</h3>
        </div>
        {badgeLabel && (
          <span className={`badge ${badgeColor || "badge-green"}`}>{badgeLabel}</span>
        )}
      </div>
      <div className="chart-card-body">
        {children}
      </div>
    </div>
  );
}

export default function BehaviorCharts({ fichas }: BehaviorChartsProps) {
  const estadoColors: Record<string, string> = {
    "En ejecucion": CHART_COLORS[0],
    "TERMINADO": CHART_COLORS[2],
    "Terminada": CHART_COLORS[3],
    "Terminada por fecha": CHART_COLORS[4],
  };

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
    const sortedYears = Array.from(map.keys()).sort();
    const sortedEstados = Array.from(allEstados).sort();
    return { sortedYears, sortedEstados, map };
  }, [fichas]);

  const chart1Data = useMemo(() => ({
    labels: yearsMap.sortedYears,
    datasets: yearsMap.sortedEstados.map((estado, i) => ({
      label: estado,
      data: yearsMap.sortedYears.map((y) => yearsMap.map.get(y)?.get(estado) || 0),
      backgroundColor: estadoColors[estado] || CHART_COLORS[(i + 5) % CHART_COLORS.length],
      borderRadius: 4,
      borderSkipped: false,
    })),
  }), [yearsMap, estadoColors]);

  const chart1Options = useMemo(() => ({
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      legend: {
        ...defaultOptions.plugins.legend,
        position: "top" as const,
      },
    },
    scales: {
      ...defaultOptions.scales,
      x: {
        ...defaultOptions.scales.x,
        stacked: true,
      },
      y: {
        ...defaultOptions.scales.y,
        stacked: true,
      },
    },
  }), []);

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

  const chart2Data = useMemo(() => ({
    labels: sectorMap.sectors,
    datasets: sectorMap.allEstados.map((estado, i) => ({
      label: estado,
      data: sectorMap.sectors.map((s) => sectorMap.map.get(s)?.get(estado) || 0),
      backgroundColor: estadoColors[estado] || CHART_COLORS[(i + 5) % CHART_COLORS.length],
      borderRadius: 4,
      borderSkipped: false,
    })),
  }), [sectorMap, estadoColors]);

  const chart2Options = useMemo(() => ({
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      legend: {
        ...defaultOptions.plugins.legend,
        position: "top" as const,
      },
    },
    scales: {
      ...defaultOptions.scales,
      x: { ...defaultOptions.scales.x, stacked: true },
      y: { ...defaultOptions.scales.y, stacked: true },
    },
  }), []);

  const desertados = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const desertados = f.totalAprendices - f.totalAprendicesActivos;
      if (desertados > 0) {
        map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + desertados);
      }
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [fichas]);

  const chart3Data = useMemo(() => ({
    labels: desertados.map((d) => d[0].length > 35 ? d[0].slice(0, 32) + "..." : d[0]),
    datasets: [{
      data: desertados.map((d) => d[1]),
      backgroundColor: CHART_COLORS[4] + "CC",
      borderRadius: 4,
      borderSkipped: false,
    }],
  }), [desertados]);

  const chart3Options = useMemo(() => ({
    ...defaultOptions,
    indexAxis: "y" as const,
    plugins: {
      ...defaultOptions.plugins,
      legend: { display: false },
    },
    scales: {
      x: { ...defaultOptions.scales.x },
      y: {
        ...defaultOptions.scales.y,
        ticks: {
          color: "#7B8FA3",
          font: { size: 12, weight: "bold" as const },
        },
      },
    },
  }), []);

  const programasOfertados = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + 1);
    });
    const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    const top8 = sorted.slice(0, 8);
    const othersCount = sorted.slice(8).reduce((acc, [, v]) => acc + v, 0);
    if (othersCount > 0) top8.push(["Otros", othersCount]);
    return top8;
  }, [fichas]);

  const chart4Data = useMemo(() => ({
    labels: programasOfertados.map((p) => p[0].length > 30 ? p[0].slice(0, 27) + "..." : p[0]),
    datasets: [{
      data: programasOfertados.map((p) => p[1]),
      backgroundColor: programasOfertados.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
      borderColor: "#ffffff",
      borderWidth: 3,
      hoverBorderColor: "#F5F6F8",
      hoverBorderWidth: 2,
      hoverOffset: 8,
    }],
  }), [programasOfertados]);

  const chart4Options = useMemo(() => ({
    ...defaultOptions,
    cutout: "55%",
    plugins: {
      ...defaultOptions.plugins,
      legend: {
        ...defaultOptions.plugins.legend,
        position: "right" as const,
      },
    },
  }), []);

  const programasInscritos = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + f.totalAprendices);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [fichas]);

  const chart5Data = useMemo(() => ({
    labels: programasInscritos.map((p) => p[0].length > 30 ? p[0].slice(0, 27) + "..." : p[0]),
    datasets: [{
      label: "Aprendices",
      data: programasInscritos.map((p) => p[1]),
      backgroundColor: "#7CB342CC",
      borderRadius: 4,
      borderSkipped: false,
    }],
  }), [programasInscritos]);

  const chart5Options = useMemo(() => ({
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      legend: { display: false },
    },
  }), []);

  const programasCertificados = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      if (f.estadoCurso.includes("Terminada") || f.estadoCurso.includes("TERMINADO")) {
        map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [fichas]);

  const chart6Data = useMemo(() => ({
    labels: programasCertificados.map((p) => p[0].length > 30 ? p[0].slice(0, 27) + "..." : p[0]),
    datasets: [{
      label: "Certificados",
      data: programasCertificados.map((p) => p[1]),
      backgroundColor: "#7CB342CC",
      borderRadius: 4,
      borderSkipped: false,
    }],
  }), [programasCertificados]);

  const chart6Options = useMemo(() => ({
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      legend: { display: false },
    },
  }), []);

  const totalCertificados = useMemo(
    () => fichas.filter((f) => f.estadoCurso.includes("Terminada") || f.estadoCurso.includes("TERMINADO")).length,
    [fichas]
  );

  if (fichas.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card chart-card chart-accent-blue" style={{ minHeight: "300px" }}>
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
        <ChartCard
          title="Estado de Aprendices por Año"
          icon={<BarChart3 className="w-4 h-4 text-lime-600" />}
          accent="chart-accent-blue"
          iconBg="bg-lime-50 border border-lime-200/60"
          badgeLabel={`${yearsMap.sortedYears.length} años`}
          badgeColor="badge-blue"
        >
          <Bar data={chart1Data} options={chart1Options} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.35s both" }}>
        <ChartCard
          title="Estado de Aprendices por Oferta"
          icon={<Layers className="w-4 h-4 text-lime-600" />}
          accent="chart-accent-yellow"
          iconBg="bg-lime-50 border border-lime-200/60"
          badgeLabel={`${sectorMap.sectors.length} ofertas`}
          badgeColor="badge-yellow"
        >
          <Bar data={chart2Data} options={chart2Options} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.4s both" }}>
        <ChartCard
          title="Programas con Más Desertados"
          icon={<TrendingDown className="w-4 h-4 text-lime-600" />}
          accent="chart-accent-purple"
          iconBg="bg-lime-50 border border-lime-200/60"
          badgeLabel={`Top ${desertados.length}`}
          badgeColor="badge-red"
        >
          <Bar data={chart3Data} options={chart3Options} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.45s both" }}>
        <ChartCard
          title="Programas Más Ofertados"
          icon={<PieChart className="w-4 h-4 text-lime-600" />}
          accent="chart-accent-green"
          iconBg="bg-sena-green/10 border border-sena-green/10"
          badgeLabel={`${programasOfertados.length} programas`}
          badgeColor="badge-green"
        >
          <Doughnut data={chart4Data} options={chart4Options} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.5s both" }}>
        <ChartCard
          title="Programas con Más Inscritos"
          icon={<Users className="w-4 h-4 text-blue-400" />}
          accent="chart-accent-blue"
          iconBg="bg-lime-50 border border-lime-200/60"
          badgeLabel={`Top ${programasInscritos.length}`}
          badgeColor="badge-blue"
        >
          <Bar data={chart5Data} options={chart5Options} />
        </ChartCard>
      </div>

      <div style={{ animation: "fadeInUp 0.5s ease-out 0.55s both" }}>
        <ChartCard
          title="Programas con Más Certificados"
          icon={<Award className="w-4 h-4 text-sena-yellow" />}
          accent="chart-accent-yellow"
          iconBg="bg-lime-50 border border-lime-200/60"
          badgeLabel={`${totalCertificados} total`}
          badgeColor="badge-yellow"
        >
          <Bar data={chart6Data} options={chart6Options} />
        </ChartCard>
      </div>
    </div>
  );
}
