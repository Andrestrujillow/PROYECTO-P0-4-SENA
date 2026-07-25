import { Bar } from "react-chartjs-2";
import { useDashboardStore } from "../../store/dashboardStore";
import { CHART_COLORS, barOptions } from "./chartConfig";
import { Star } from "lucide-react";

export default function AprendicesPorProgramaEspecial() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorProgramaEspecial);
  const top6 = data.slice(0, 6);

  return (
    <div className="section-card chart-card p-6">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-lime-50">
            <Star className="w-5 h-5 text-lime-600" />
          </div>
          <div>
            <h3 className="chart-card-title">Programas Especiales</h3>
            <p className="chart-card-subtitle">TecnoAcademia, CAMPESENA, Alianzas</p>
          </div>
        </div>
      </div>
      <div className="chart-card-body">
        {top6.length > 0 ? (
          <Bar
            data={{
              labels: top6.map((d) =>
                d.label.length > 18 ? d.label.slice(0, 16) + "..." : d.label
              ),
              datasets: [{
                data: top6.map((d) => d.value),
                backgroundColor: top6.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.65,
              }],
            }}
            options={barOptions}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Star className="w-10 h-10 text-text-muted/20 mb-3" />
            <span className="text-sm font-medium text-text-muted">Sin datos disponibles</span>
          </div>
        )}
      </div>
    </div>
  );
}
