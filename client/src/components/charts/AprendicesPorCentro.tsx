import { Doughnut } from "react-chartjs-2";
import { Building2 } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { defaultOptions, CHART_COLORS } from "./chartConfig";

export default function AprendicesPorCentro() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorCentro);
  const top10 = data.slice(0, 10);
  const total = top10.reduce((s, d) => s + d.value, 0);

  const chartData = {
    labels: top10.map((d) =>
      d.label.length > 28 ? d.label.slice(0, 25) + "..." : d.label
    ),
    datasets: [
      {
        data: top10.map((d) => d.value),
        backgroundColor: top10.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
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
    <div className="card chart-card chart-accent-blue">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-blue-400/10 border border-blue-400/10">
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="chart-card-title">Aprendices por Centro de Formación</h3>
        </div>
        <span className="badge badge-blue">
          {top10.length} centros
        </span>
      </div>
      <div className="chart-card-body">
        {top10.length > 0 ? (
          <>
            <Doughnut data={chartData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginRight: "30%" }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-sena-white">{total.toLocaleString("es-CO")}</p>
                <p className="text-[9px] text-sena-gray/40 font-semibold uppercase tracking-wider">Aprendices</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Building2 className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}
