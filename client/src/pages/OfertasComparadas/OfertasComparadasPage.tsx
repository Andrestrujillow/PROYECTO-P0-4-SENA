import { useState, useMemo, useCallback } from "react";
import { GitCompareArrows } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import OffersFilters from "./OffersFilters";
import OffersKPIs from "./OffersKPIs";
import OffersCharts from "./OffersCharts";
import OffersMap from "./OffersMap";
import OffersTable from "./OffersTable";
import FileUpload from "../../components/ui/FileUpload";

export default function OfertasComparadasPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Record<string, string>>({});

  const onFiltroChange = useCallback((key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onReset = useCallback(() => setFiltros({}), []);

  const filteredFichas = useMemo(() => {
    return fichas.filter((f) => {
      if (filtros.anio) {
        const year = f.fechaTerminacionFicha.split("/")[2];
        if (year !== filtros.anio) return false;
      }
      if (filtros.centro && f.nombreCentro !== filtros.centro) return false;
      if (filtros.nivel && f.nivelFormacion !== filtros.nivel) return false;
      if (filtros.programa && f.nombreProgramaFormacion !== filtros.programa) return false;
      if (filtros.oferta && f.nombreSectorPrograma !== filtros.oferta) return false;
      if (filtros.municipio && f.nombreMunicipioCurso !== filtros.municipio) return false;
      return true;
    });
  }, [fichas, filtros]);

  if (fichas.length === 0) {
    return (
      <div className="page-card flex items-center justify-center min-h-[65vh]">
        <div className="max-w-md w-full" style={{ animation: "scaleIn 0.5s ease-out" }}>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-sena-green/10 border border-sena-green/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <GitCompareArrows className="w-8 h-8 text-sena-green" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Cargar datos PE-04</h2>
            <p className="text-sm text-text-muted mb-6 max-w-xs mx-auto leading-relaxed">
              Sube el archivo Excel del reporte PE-04 para ver las ofertas comparadas.
            </p>
            <FileUpload />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card space-y-6">
      <OffersKPIs fichas={filteredFichas} />
      <OffersFilters fichas={fichas} filtros={filtros} onFiltroChange={onFiltroChange} onReset={onReset} />
      <OffersCharts fichas={filteredFichas} />
      <OffersMap fichas={filteredFichas} />
      <OffersTable fichas={filteredFichas} />
    </div>
  );
}
