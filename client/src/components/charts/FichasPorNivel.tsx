import { Bar } from "react-chartjs-2";
import { useDashboardStore } from "../../store/dashboardStore";
import { CHART_COLORS, barHorizontalOptions } from "./chartConfig";
import { ChartBarIcon } from "../icons/chart-bar";

export default function FichasPorNivel() {
  const data = useDashboardStore((s) => s.datosGraficas.fichasPorNivel);

  return (
    <div className="section-card chart-card p-6">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-lime-500/10">
            <ChartBarIcon size={20} className="text-lime-600" />
          </div>
          <div>
            <h3 className="chart-card-title">Fichas por Nivel</h3>
            <p className="chart-card-subtitle">Distribucion por tipo de formacion</p>
          </div>
        </div>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <Bar
            data={{
              labels: data.map((d) => d.label),
              datasets: [{
                data: data.map((d) => d.value),
                backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.7,
              }],
            }}
            options={barHorizontalOptions}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <ChartBarIcon size={40} className="text-text-muted/20 mb-3" />
            <span className="text-sm font-medium text-text-muted">Sin datos disponibles</span>
          </div>
        )}
      </div>
    </div>
  );
}
