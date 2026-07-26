import { useDashboardStore } from "../../store/dashboardStore";
import EChart, { bar2DOption } from "./EChart";
import { Building2 } from "lucide-react";

export default function AprendicesPorCentro() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorCentro);
  const top6 = data.slice(0, 6);

  return (
    <div className="section-card chart-card p-5">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-lime-500/10">
            <Building2 className="w-4 h-4 text-lime-400" />
          </div>
          <div>
            <h3 className="chart-card-title">Aprendices por Centro</h3>
            <p className="chart-card-subtitle">Top centros de formacion</p>
          </div>
        </div>
      </div>
      <div className="chart-card-body" style={{ height: 240 }}>
        {top6.length > 0 ? (
          <EChart
            option={bar2DOption(
              top6.map((d) => d.label.length > 22 ? d.label.slice(0, 20) + "..." : d.label),
              top6.map((d) => d.value),
              { horizontal: true, showLabels: true }
            )}
            height={240}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Building2 className="w-10 h-10 text-text-muted/20 mb-3" />
            <span className="text-sm font-medium text-text-muted">Sin datos disponibles</span>
          </div>
        )}
      </div>
    </div>
  );
}
