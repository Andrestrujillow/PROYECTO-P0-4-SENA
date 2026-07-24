import { Pie } from "react-chartjs-2";
import { Monitor } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { defaultOptions, CHART_COLORS } from "./chartConfig";

export default function AprendicesPorModalidad() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorModalidad);
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
            <Monitor className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="chart-card-title">Aprendices por Modalidad</h3>
        </div>
        <span className="badge badge-purple">
          {total.toLocaleString("es-CO")} total
        </span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <>
            <Pie data={chartData} options={options} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginRight: "30%" }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-sena-white">{total.toLocaleString("es-CO")}</p>
                <p className="text-[9px] text-sena-gray/40 font-semibold uppercase tracking-wider">Total</p>
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
