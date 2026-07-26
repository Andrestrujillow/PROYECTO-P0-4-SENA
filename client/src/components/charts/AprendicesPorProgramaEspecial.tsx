import { useDashboardStore } from "../../store/dashboardStore";
import EChart, { bar2DOption } from "./EChart";
import { Star } from "lucide-react";

export default function AprendicesPorProgramaEspecial() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorProgramaEspecial);
  const top6 = data.slice(0, 6);

  return (
    <div className="section-card chart-card p-5">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-lime-500/10">
            <Star className="w-4 h-4 text-lime-400" />
          </div>
          <div>
            <h3 className="chart-card-title">Programas Especiales</h3>
            <p className="chart-card-subtitle">TecnoAcademia, CAMPESENA, Alianzas</p>
          </div>
        </div>
      </div>
      <div className="chart-card-body" style={{ height: 240 }}>
        {top6.length > 0 ? (
          <EChart
            option={bar2DOption(
              top6.map((d) => d.label),
              top6.map((d) => d.value)
            )}
            height={240}
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
