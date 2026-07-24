import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { useFilteredData } from "../../hooks/useFilteredData";
import type { Filtros } from "../../types";

type FilterKey = keyof Filtros;

interface FilterConfig {
  key: FilterKey;
  label: string;
  options: { value: string; count: number }[];
}

export default function FilterBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const fichas = useDashboardStore((s) => s.fichas);
  const filtros = useDashboardStore((s) => s.filtros);
  const setFiltros = useDashboardStore((s) => s.setFiltros);
  const resetFiltros = useDashboardStore((s) => s.resetFiltros);

  const data = useFilteredData(fichas);

  const filters: FilterConfig[] = [
    { key: "nombreCentro", label: "Centro", options: data.centros },
    { key: "modalidadFormacion", label: "Modalidad", options: data.modalidades },
    { key: "nivelFormacion", label: "Nivel", options: data.niveles },
    { key: "programaFormacion", label: "Programa", options: data.programas },
    { key: "empresa", label: "Empresa", options: data.empresas },
    { key: "municipio", label: "Municipio", options: data.municipios },
    { key: "programaEspecial", label: "Prog. Especial", options: data.programasEspeciales },
    { key: "anioTerminacion", label: "Año", options: data.anios.map((a) => ({ value: a, count: 0 })) },
    { key: "estadoCurso", label: "Estado", options: data.estados },
    { key: "etapaFicha", label: "Etapa", options: data.etapas },
    { key: "jornada", label: "Jornada", options: data.jornadas },
    { key: "sectorPrograma", label: "Sector", options: data.sectores },
  ];

  const activeEntries = (Object.entries(filtros) as [FilterKey, string][]).filter(
    ([, v]) => v !== ""
  );

  const removeFilter = (key: FilterKey) => {
    setFiltros({ [key]: "" });
  };

  return (
    <div className="card overflow-visible">
      <div
        className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-sena-blue-light/10 transition-colors rounded-t-[18px]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sena-green/10 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sena-green" />
          </div>
          <span className="text-[13px] font-semibold text-sena-white">Filtros</span>
          {activeEntries.length > 0 && (
            <span className="badge badge-green">{activeEntries.length}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeEntries.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetFiltros();
              }}
              className="btn-ghost text-sena-red/60 hover:text-sena-red hover:bg-sena-red/5"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-sena-gray/30 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {activeEntries.length > 0 && (
        <div className="px-5 pb-2 flex flex-wrap gap-1.5">
          {activeEntries.map(([key, value]) => (
            <button
              key={key}
              onClick={() => removeFilter(key)}
              className="pill cursor-pointer group"
            >
              {value.length > 25 ? value.slice(0, 22) + "..." : value}
              <X className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="px-5 pb-4 pt-1 border-t border-sena-blue-light/10">
          <div className="filter-grid">
            {filters.map(({ key, label, options }) => (
              <select
                key={key}
                value={filtros[key]}
                onChange={(e) => setFiltros({ [key]: e.target.value })}
                className={`filter-item ${filtros[key] ? "active" : ""}`}
              >
                <option value="">{label}</option>
                {options.map(({ value, count }) => (
                  <option key={value} value={value}>
                    {value} {count > 0 ? `(${count})` : ""}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
