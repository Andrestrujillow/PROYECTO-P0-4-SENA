import { Clock } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import EChart, { bar2DOption } from "./EChart";

const HORAS_CONFIG = [
  { key: "horasPlanta" as const, label: "Planta", color: "#3B82F6" },
  { key: "horasContratistas" as const, label: "Contratistas", color: "#10B981" },
  { key: "horasContratistasExternos" as const, label: "Ext. Externos", color: "#F59E0B" },
  { key: "horasMonitores" as const, label: "Monitores", color: "#8B5CF6" },
  { key: "horasInstEmpresa" as const, label: "Inst. Empresa", color: "#EC4899" },
];

export default function HorasPorTipo() {
  const fichas = useDashboardStore((s) => s.fichasFiltradas);

  const horas = HORAS_CONFIG.map((cfg) => ({
    ...cfg,
    total: fichas.reduce((acc, f) => acc + f[cfg.key], 0),
  }));

  const totalGeneral = horas.reduce((acc, h) => acc + h.total, 0);

  return (
    <div className="section-card chart-card p-5">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-amber-500/10">
            <Clock size={18} className="text-amber-400" />
          </div>
          <div>
            <h3 className="chart-card-title">Horas por Tipo</h3>
            <p className="chart-card-subtitle">Distribucion de horas por fuente</p>
          </div>
        </div>
        {totalGeneral > 0 && (
          <span className="text-xs font-semibold text-text-muted bg-surface px-3 py-1 rounded-full">
            {totalGeneral.toLocaleString("es-CO")}h
          </span>
        )}
      </div>
      <div className="chart-card-body" style={{ height: 240 }}>
        {totalGeneral > 0 ? (
          <EChart
            option={bar2DOption(
              horas.map((h) => h.label),
              horas.map((h) => h.total),
              { horizontal: true, showLabels: true }
            )}
            height={240}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Clock size={40} className="text-text-muted/20 mb-3" />
            <span className="text-sm font-medium text-text-muted">Sin datos disponibles</span>
          </div>
        )}
      </div>
    </div>
  );
}
