import { Users } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import EChart, { donut2DOption } from "./EChart";

export default function EquidadGenero() {
  const fichas = useDashboardStore((s) => s.fichasFiltradas);

  const masculinos = fichas.reduce((acc, f) => acc + f.totalAprendicesMasculinos, 0);
  const femeninos = fichas.reduce((acc, f) => acc + f.totalAprendicesFemeninos, 0);
  const noBinario = fichas.reduce((acc, f) => acc + f.totalAprendicesNoBinario, 0);
  const total = masculinos + femeninos + noBinario;

  const pct = (v: number) => total > 0 ? Math.round((v / total) * 100) : 0;

  return (
    <div className="section-card chart-card p-5">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-pink-500/10">
            <Users size={18} className="text-pink-400" />
          </div>
          <div>
            <h3 className="chart-card-title">Equidad de Genero</h3>
            <p className="chart-card-subtitle">Distribucion por genero</p>
          </div>
        </div>
      </div>
      <div className="chart-card-body" style={{ height: 240 }}>
        {total > 0 ? (
          <div className="flex flex-col items-center gap-3 h-full">
            <div className="flex-1 w-full" style={{ height: 160 }}>
              <EChart
                option={donut2DOption(
                  [
                    { name: "Masculino", value: masculinos, color: "#3B82F6" },
                    { name: "Femenino", value: femeninos, color: "#EC4899" },
                    ...(noBinario > 0 ? [{ name: "No Binario", value: noBinario, color: "#A78BFA" }] : []),
                  ],
                  total
                )}
                height={160}
              />
            </div>
            <div className="flex items-center gap-5 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span className="text-text-muted">M</span>
                <span className="font-bold text-text-primary tabular-nums">{masculinos.toLocaleString("es-CO")}</span>
                <span className="text-text-muted">({pct(masculinos)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]" />
                <span className="text-text-muted">F</span>
                <span className="font-bold text-text-primary tabular-nums">{femeninos.toLocaleString("es-CO")}</span>
                <span className="text-text-muted">({pct(femeninos)}%)</span>
              </div>
              {noBinario > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]" />
                  <span className="text-text-muted">NB</span>
                  <span className="font-bold text-text-primary tabular-nums">{noBinario.toLocaleString("es-CO")}</span>
                  <span className="text-text-muted">({pct(noBinario)}%)</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Users size={40} className="text-text-muted/20 mb-3" />
            <span className="text-sm font-medium text-text-muted">Sin datos disponibles</span>
          </div>
        )}
      </div>
    </div>
  );
}
