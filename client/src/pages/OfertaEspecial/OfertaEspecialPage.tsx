import { useState, useMemo } from "react";
import { Star, Lightbulb } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import SpecialFilters from "./SpecialFilters";
import SpecialKPIs from "./SpecialKPIs";
import SpecialCharts, { SpecialChartsBottom } from "./SpecialCharts";
import SpecialTable from "./SpecialTable";

export default function OfertaEspecialPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Record<string, string>>({});

  const centros = useMemo(
    () => [...new Set(fichas.map((f) => f.nombreCentro))].filter(Boolean).sort(),
    [fichas]
  );

  const filteredFichas = useMemo(() => {
    let result = fichas;

    if (filtros.centro) {
      result = result.filter((f) => f.nombreCentro === filtros.centro);
    }
    if (filtros.anio) {
      result = result.filter((f) => {
        const parts = f.fechaTerminacionFicha?.split("/");
        return parts?.length === 3 ? parts[2] === filtros.anio : false;
      });
    }
    if (filtros.nivel) {
      result = result.filter((f) => f.nivelFormacion === filtros.nivel);
    }
    if (filtros.programa) {
      result = result.filter((f) => f.nombreProgramaFormacion === filtros.programa);
    }
    if (filtros.empresa) {
      result = result.filter((f) => f.nombreEmpresa === filtros.empresa);
    }

    return result;
  }, [fichas, filtros]);

  const handleFiltroChange = (key: string, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFiltros({});
  };

  if (fichas.length === 0) {
    return (
      <div className="page-card flex items-center justify-center min-h-[65vh]">
        <div className="max-w-md w-full" style={{ animation: "scaleIn 0.5s ease-out" }}>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-sena-yellow/10 border border-sena-yellow/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Star className="w-8 h-8 text-sena-yellow" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">
              Sin datos disponibles
            </h2>
            <p className="text-sm text-text-muted mb-6 max-w-xs mx-auto leading-relaxed">
              Carga el archivo Excel del reporte PE-04 desde el dashboard principal para ver la oferta especial.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card space-y-6">
      <section className="section-card p-6">
        <SpecialKPIs fichas={filteredFichas} />
      </section>

      <section className="section-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-sena-yellow" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Centros de Formacion
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFiltroChange("centro", "")}
            className={`btn-ghost transition-all duration-200 ${
              !filtros.centro
                ? "!bg-sena-green/15 !text-sena-green !border-sena-green/20"
                : ""
            }`}
          >
            Todos
          </button>
          {centros.map((centro) => (
            <button
              key={centro}
              onClick={() => handleFiltroChange("centro", centro)}
              className={`btn-ghost transition-all duration-200 ${
                filtros.centro === centro
                  ? "!bg-sena-green/15 !text-sena-green !border-sena-green/20"
                  : ""
              }`}
            >
              {centro}
            </button>
          ))}
        </div>
      </section>

      <section className="section-card p-6">
        <SpecialFilters
          fichas={fichas}
          filtros={filtros}
          onFiltroChange={handleFiltroChange}
          onReset={handleReset}
        />
      </section>

      <section className="section-card p-6">
        <div className="chart-grid-2">
          <SpecialCharts fichas={filteredFichas} />
        </div>
      </section>

      <section className="section-card p-6">
        <SpecialChartsBottom fichas={filteredFichas} />
      </section>

      <section className="section-card overflow-hidden">
        <SpecialTable fichas={filteredFichas} />
      </section>
    </div>
  );
}
