import { useState, useMemo } from "react";
import { Star, Lightbulb } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import type { Filtros } from "../../types";
import SpecialFilters from "./SpecialFilters";
import SpecialKPIs from "./SpecialKPIs";
import SpecialCharts, { SpecialChartsBottom } from "./SpecialCharts";
import SpecialTable from "./SpecialTable";

export default function OfertaEspecialPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Partial<Filtros>>({});

  const centros = useMemo(
    () => [...new Set(fichas.map((f) => f.nombreCentro))].filter(Boolean).sort(),
    [fichas]
  );

  // Pre-filter: only special programs
  const fichasEspeciales = useMemo(
    () => fichas.filter((f) => f.nombreProgramaEspecial && f.nombreProgramaEspecial.trim() !== ""),
    [fichas]
  );

  const filteredFichas = useMemo(() => {
    let result = fichasEspeciales;

    if (filtros.nombreCentro) {
      result = result.filter((f) => f.nombreCentro === filtros.nombreCentro);
    }
    if (filtros.anioTerminacion) {
      result = result.filter((f) => {
        const parts = f.fechaTerminacionFicha?.split("/");
        return parts?.length === 3 ? parts[2] === filtros.anioTerminacion : false;
      });
    }
    if (filtros.nivelFormacion) {
      result = result.filter((f) => f.nivelFormacion === filtros.nivelFormacion);
    }
    if (filtros.programaFormacion) {
      result = result.filter((f) => f.nombreProgramaFormacion === filtros.programaFormacion);
    }
    if (filtros.empresa) {
      result = result.filter((f) => f.nombreEmpresa === filtros.empresa);
    }

    return result;
  }, [fichasEspeciales, filtros]);

  const handleFiltroChange = (key: keyof Filtros, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFiltros({});
  };

  if (fichasEspeciales.length === 0) {
    return (
      <div className="page-card flex items-center justify-center min-h-[65vh]">
        <div className="max-w-md w-full" style={{ animation: "scaleIn 0.5s ease-out" }}>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-sena-yellow/10 border border-sena-yellow/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Star className="w-8 h-8 text-sena-yellow" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">
              Sin programas especiales
            </h2>
            <p className="text-sm text-text-muted mb-6 max-w-xs mx-auto leading-relaxed">
              El archivo cargado no contiene programas especiales (TecnoAcademia, CAMPESENA, Alianzas Estrategicas).
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card space-y-3 sm:space-y-4">
      <section className="section-card p-3 sm:p-5">
        <SpecialKPIs fichas={filteredFichas} />
      </section>

      <section className="section-card p-3 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-sena-yellow" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Centros de Formacion
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFiltroChange("nombreCentro", "")}
            className={`btn-ghost transition-all duration-200 ${
              !filtros.nombreCentro ? "active" : ""
            }`}
          >
            Todos
          </button>
          {centros.map((centro) => (
            <button
              key={centro}
              onClick={() => handleFiltroChange("nombreCentro", centro)}
              className={`btn-ghost transition-all duration-200 ${
                filtros.nombreCentro === centro ? "active" : ""
              }`}
            >
              {centro}
            </button>
          ))}
        </div>
      </section>

      <section className="section-card p-3 sm:p-5">
        <SpecialFilters
          fichas={fichas}
          filtros={filtros}
          onFiltroChange={handleFiltroChange}
          onReset={handleReset}
        />
      </section>

      <section className="section-card p-3 sm:p-5">
        <SpecialCharts fichas={filteredFichas} />
        <div className="mt-4 sm:mt-6">
          <SpecialChartsBottom fichas={filteredFichas} />
        </div>
      </section>

      <SpecialTable fichas={filteredFichas} />
    </div>
  );
}
