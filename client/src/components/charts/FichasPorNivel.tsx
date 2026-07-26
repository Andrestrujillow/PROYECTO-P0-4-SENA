import { useDashboardStore } from "../../store/dashboardStore";
import EChart, { bar2DOption } from "./EChart";
import { ChartBarIcon } from "../icons/chart-bar";

export default function FichasPorNivel() {
  const data = useDashboardStore((s) => s.datosGraficas.fichasPorNivel);

  return (
    <div className="section-card chart-card p-5">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-lime-500/10">
            <ChartBarIcon size={18} className="text-lime-400" />
          </div>
          <div>
            <h3 className="chart-card-title">Fichas por Nivel</h3>
            <p className="chart-card-subtitle">Distribucion por tipo de formacion</p>
          </div>
        </div>
      </div>
      <div className="chart-card-body" style={{ height: 240 }}>
        {data.length > 0 ? (
          <EChart option={bar2DOption(data.map((d) => d.label), data.map((d) => d.value))} height={240} />
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
