import { Bar } from "react-chartjs-2";
import { Clock } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { barHorizontalOptions, glassTooltip } from "./chartConfig";

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
    <div className="section-card chart-card p-6">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-amber-500/10">
            <Clock size={20} className="text-amber-600" />
          </div>
          <div>
            <h3 className="chart-card-title">Horas por Tipo de Instructor</h3>
            <p className="chart-card-subtitle">Distribucion de horas por fuente</p>
          </div>
        </div>
        {totalGeneral > 0 && (
          <span className="text-xs font-semibold text-text-muted bg-bg-base px-3 py-1 rounded-full">
            {totalGeneral.toLocaleString("es-CO")}h total
          </span>
        )}
      </div>
      <div className="chart-card-body">
        {totalGeneral > 0 ? (
          <Bar
            data={{
              labels: horas.map((h) => h.label),
              datasets: [{
                data: horas.map((h) => h.total),
                backgroundColor: horas.map((h) => h.color),
                borderRadius: 8,
                borderSkipped: false,
                barPercentage: 0.65,
              }],
            }}
            options={{
              ...barHorizontalOptions,
              plugins: {
                legend: { display: false },
                tooltip: {
                  ...glassTooltip,
                  callbacks: {
                    label: (ctx: { parsed: { x: number | null }; label: string }) => {
                      const v = ctx.parsed.x ?? 0;
                      const pct = totalGeneral > 0 ? ((v / totalGeneral) * 100).toFixed(1) : 0;
                      return ` ${ctx.label}: ${v.toLocaleString("es-CO")}h (${pct}%)`;
                    },
                  },
                },
              },
            }}
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
