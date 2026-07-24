import { useState, useMemo, useCallback } from "react";
import { Activity, BarChart3 } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import BehaviorKPIs from "./BehaviorKPIs";
import BehaviorFilters from "./BehaviorFilters";
import BehaviorCards from "./BehaviorCards";
import BehaviorCharts from "./BehaviorCharts";

const emptyFilters: Record<string, string> = {
  sectorPrograma: "",
  anioTerminacion: "",
  modalidadFormacion: "",
  programaEspecial: "",
  nombreCentro: "",
  programaFormacion: "",
  nivelFormacion: "",
};

function filtrarFichas(fichas: any[], filtros: Record<string, string>) {
  return fichas.filter((f) => {
    if (filtros.sectorPrograma && f.nombreSectorPrograma !== filtros.sectorPrograma) return false;
    if (filtros.modalidadFormacion && f.modalidadFormacion !== filtros.modalidadFormacion) return false;
    if (filtros.nivelFormacion && f.nivelFormacion !== filtros.nivelFormacion) return false;
    if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
    if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
    if (filtros.programaEspecial && f.nombreProgramaEspecial !== filtros.programaEspecial) return false;
    if (filtros.anioTerminacion) {
      const parts = f.fechaTerminacionFicha.split("/");
      const year = parts.length === 3 ? parts[2] : "";
      if (year !== filtros.anioTerminacion) return false;
    }
    return true;
  });
}

export default function ComportamientoPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Record<string, string>>({ ...emptyFilters });

  const filteredFichas = useMemo(() => filtrarFichas(fichas, filtros), [fichas, filtros]);

  const handleFiltroChange = useCallback((key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setFiltros({ ...emptyFilters });
  }, []);

  if (fichas.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[65vh]">
        <div className="max-w-md w-full" style={{ animation: "scaleIn 0.5s ease-out" }}>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-blue-400/10 border border-blue-400/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-sena-white mb-2">
              Sin datos disponibles
            </h2>
            <p className="text-sm text-sena-gray/50 mb-6 max-w-xs mx-auto leading-relaxed">
              Carga el archivo Excel del reporte PE-04 para comenzar el análisis de comportamiento.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sena-blue-light/15 border border-sena-blue-light/10">
              <div className="w-1.5 h-1.5 bg-sena-yellow rounded-full animate-pulse-soft" />
              <span className="text-[9px] text-sena-gray/35 uppercase tracking-wider font-semibold">
                Esperando datos
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      <div style={{ animation: "fadeInUp 0.5s ease-out" }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-blue-400/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sena-white">Comportamiento</h1>
            <p className="text-[11px] text-sena-gray/40">Análisis de tendencias y comportamiento de la formación</p>
          </div>
        </div>
      </div>

      <BehaviorKPIs fichas={filteredFichas} />

      <BehaviorFilters
        fichas={fichas}
        filtros={filtros}
        onFiltroChange={handleFiltroChange}
        onReset={handleReset}
      />

      <BehaviorCards fichas={filteredFichas} />

      <BehaviorCharts fichas={filteredFichas} />
    </div>
  );
}
