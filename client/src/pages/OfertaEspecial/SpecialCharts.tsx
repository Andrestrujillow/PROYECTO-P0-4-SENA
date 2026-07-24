import { useMemo } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Monitor, Award, PieChart } from "lucide-react";
import { defaultOptions, CHART_COLORS } from "../../components/charts/chartConfig";
import type { Ficha } from "../../types";

interface SpecialChartsProps {
  fichas: Ficha[];
}

function ActivosPorModalidad({ fichas }: { fichas: Ficha[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const key = f.modalidadFormacion || "Sin dato";
      map.set(key, (map.get(key) ?? 0) + f.totalAprendicesActivos);
    });
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, [fichas]);

  const total = data.reduce((s, d) => s + d.value, 0);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderColor: "#111D2E",
        borderWidth: 3,
        hoverBorderColor: "#F0F4F8",
        hoverBorderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    cutout: "55%",
    plugins: {
      ...defaultOptions.plugins,
      legend: {
        ...defaultOptions.plugins.legend,
        position: "right" as const,
      },
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: (ctx: { parsed: number; label: string }) => {
            const value = ctx.parsed;
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return ` ${ctx.label}: ${value.toLocaleString("es-CO")} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="card chart-card chart-accent-green">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-green/10 border border-sena-green/10">
            <Monitor className="w-4 h-4 text-sena-green" />
          </div>
          <h3 className="chart-card-title">Activos por Modalidad</h3>
        </div>
        <span className="badge badge-green">
          {total.toLocaleString("es-CO")} total
        </span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <>
            <Doughnut data={chartData} options={options} />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ marginRight: "30%" }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-sena-white">
                  {total.toLocaleString("es-CO")}
                </p>
                <p className="text-[9px] text-sena-gray/40 font-semibold uppercase tracking-wider">
                  Total
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Monitor className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CertificadosPorTipoOferta({ fichas }: { fichas: Ficha[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      if (f.estadoCurso && f.estadoCurso.toLowerCase().includes("terminad")) {
        const key = f.nombreSectorPrograma || "Sin dato";
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    });
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, [fichas]);

  const total = data.reduce((s, d) => s + d.value, 0);

  const chartData = {
    labels: data.map((d) =>
      d.label.length > 20 ? d.label.slice(0, 17) + "..." : d.label
    ),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderColor: "#111D2E",
        borderWidth: 2,
        borderRadius: 6,
        hoverBorderColor: "#F0F4F8",
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    indexAxis: "y" as const,
    plugins: {
      ...defaultOptions.plugins,
      legend: { display: false },
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: (ctx: { parsed: { x: number | null }; label: string }) => {
            const value = ctx.parsed.x ?? 0;
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return ` ${ctx.label}: ${value.toLocaleString("es-CO")} (${pct}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#7B8FA3",
          font: { size: 10, weight: "bold" as const },
        },
        grid: { color: "rgba(28,45,66,0.3)", drawBorder: false },
        border: { display: false },
      },
      y: {
        ticks: {
          color: "#7B8FA3",
          font: { size: 10, weight: "bold" as const },
        },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div className="card chart-card chart-accent-blue">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-blue-400/10 border border-blue-400/10">
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="chart-card-title">Certificados por Tipo de Oferta</h3>
        </div>
        <span className="badge badge-blue">
          {total.toLocaleString("es-CO")} total
        </span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Award className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparacionEstadoAprendices({ fichas }: { fichas: Ficha[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();
    fichas.forEach((f) => {
      const key = f.estadoCurso || "Sin dato";
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, [fichas]);

  const total = data.reduce((s, d) => s + d.value, 0);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderColor: "#111D2E",
        borderWidth: 3,
        hoverBorderColor: "#F0F4F8",
        hoverBorderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    cutout: "55%",
    plugins: {
      ...defaultOptions.plugins,
      legend: {
        ...defaultOptions.plugins.legend,
        position: "right" as const,
      },
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: (ctx: { parsed: number; label: string }) => {
            const value = ctx.parsed;
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return ` ${ctx.label}: ${value.toLocaleString("es-CO")} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="card chart-card chart-accent-purple">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-purple-400/10 border border-purple-400/10">
            <PieChart className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="chart-card-title">Comparación del Estado de Aprendices</h3>
        </div>
        <span className="badge badge-purple">
          {total.toLocaleString("es-CO")} total
        </span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <>
            <Doughnut data={chartData} options={options} />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ marginRight: "30%" }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-sena-white">
                  {total.toLocaleString("es-CO")}
                </p>
                <p className="text-[9px] text-sena-gray/40 font-semibold uppercase tracking-wider">
                  Total
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <PieChart className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SpecialCharts({ fichas }: SpecialChartsProps) {
  return (
    <>
      <ActivosPorModalidad fichas={fichas} />
      <CertificadosPorTipoOferta fichas={fichas} />
    </>
  );
}

export function SpecialChartsBottom({ fichas }: SpecialChartsProps) {
  return <ComparacionEstadoAprendices fichas={fichas} />;
}
