import { useState, useMemo, useCallback } from "react";
import { BookOpen } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import type { Filtros } from "../../types";
import StrategiesFilters from "./StrategiesFilters";
import StrategiesKPIs from "./StrategiesKPIs";
import StrategiesCharts from "./StrategiesCharts";
import StrategiesMap from "./StrategiesMap";
import FileUpload from "../../components/ui/FileUpload";

export default function EstrategiasPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Partial<Filtros>>({});

  const onFiltroChange = useCallback((key: keyof Filtros, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onReset = useCallback(() => setFiltros({}), []);

  const filteredFichas = useMemo(() => {
    return fichas.filter((f) => {
      if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
      if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
      if (filtros.programaEspecial && f.nombreProgramaEspecial !== filtros.programaEspecial) return false;
      if (filtros.municipio && f.nombreMunicipioCurso !== filtros.municipio) return false;
      return true;
    });
  }, [fichas, filtros]);

  if (fichas.length === 0) {
    return (
      <div className="page-card flex items-center justify-center min-h-[65vh]">
        <div className="max-w-md w-full" style={{ animation: "scaleIn 0.5s ease-out" }}>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-purple-400/10 border border-purple-400/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Cargar datos PE-04</h2>
            <p className="text-sm text-text-muted mb-6 max-w-xs mx-auto leading-relaxed">
              Sube el archivo Excel del reporte PE-04 para ver las estrategias institucionales.
            </p>
            <FileUpload />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card space-y-6">
      <section className="section-card p-6">
        <StrategiesKPIs fichas={filteredFichas} />
      </section>
      <section className="section-card p-6">
        <StrategiesFilters fichas={fichas} filtros={filtros} onFiltroChange={onFiltroChange} onReset={onReset} />
      </section>
      <section className="section-card p-6">
        <StrategiesCharts fichas={filteredFichas} />
      </section>
      <section className="section-card p-6">
        <StrategiesMap fichas={filteredFichas} />
      </section>
    </div>
  );
}
