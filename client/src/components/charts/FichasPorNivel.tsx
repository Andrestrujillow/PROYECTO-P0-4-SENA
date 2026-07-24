import { Doughnut } from "react-chartjs-2";
import { Layers } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { defaultOptions, CHART_COLORS } from "./chartConfig";

export default function FichasPorNivel() {
  const data = useDashboardStore((s) => s.datosGraficas.fichasPorNivel);
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
    cutout: "62%",
    plugins: {
      ...defaultOptions.plugins,
      legend: {
        ...defaultOptions.plugins.legend,
        position: "right" as const,
      },
    },
  };

  return (
    <div className="card chart-card chart-accent-green">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-green/10 border border-sena-green/10">
            <Layers className="w-4 h-4 text-sena-green" />
          </div>
          <h3 className="chart-card-title">Fichas por Nivel</h3>
        </div>
        <span className="badge badge-green">
          {total.toLocaleString("es-CO")} total
        </span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <>
            <Doughnut data={chartData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginRight: "25%" }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-sena-white">{total.toLocaleString("es-CO")}</p>
                <p className="text-[9px] text-sena-gray/40 font-semibold uppercase tracking-wider">Fichas</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Layers className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}
