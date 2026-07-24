import { Bar } from "react-chartjs-2";
import { Sparkles } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { defaultOptions, CHART_COLORS } from "./chartConfig";

export default function AprendicesPorProgramaEspecial() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorProgramaEspecial);
  const top8 = data.slice(0, 8);

  const chartData = {
    labels: top8.map((d) =>
      d.label.length > 18 ? d.label.slice(0, 16) + "..." : d.label
    ),
    datasets: [
      {
        label: "Aprendices",
        data: top8.map((d) => d.value),
        backgroundColor: top8.map((_, i) => CHART_COLORS[i % CHART_COLORS.length] + "BB"),
        hoverBackgroundColor: top8.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderRadius: { topLeft: 6, topRight: 6 },
        borderSkipped: false,
        barThickness: 30,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      legend: { display: false },
    },
  };

  return (
    <div className="card chart-card chart-accent-yellow">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-yellow/10 border border-sena-yellow/10">
            <Sparkles className="w-4 h-4 text-sena-yellow" />
          </div>
          <h3 className="chart-card-title">Programa Especial</h3>
        </div>
        <span className="badge badge-yellow">
          Top {top8.length}
        </span>
      </div>
      <div className="chart-card-body">
        {top8.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Sparkles className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}
