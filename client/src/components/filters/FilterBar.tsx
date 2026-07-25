import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { useFilteredData } from "../../hooks/useFilteredData";
import { cn } from "../../lib/cn";
import type { Filtros } from "../../types";

type FilterKey = keyof Filtros;

interface FilterConfig {
  key: FilterKey;
  label: string;
  options: { value: string; count: number }[];
}

export default function FilterBar() {
  const [isExpanded, setIsExpanded] = useState(false);
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
    { key: "anioTerminacion", label: "Ano", options: data.anios.map((a) => ({ value: a, count: 0 })) },
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
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible hover:shadow-md transition-shadow">
      <div
        className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-gray-50/50 transition-colors rounded-t-xl"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[11px] font-semibold text-gray-600">Filtros</span>
          {activeEntries.length > 0 && (
            <span className="text-[9px] font-medium bg-blue-50 text-blue-500 px-1.5 py-px rounded-full">
              {activeEntries.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {activeEntries.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); resetFiltros(); }}
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] text-gray-400 hover:text-red-500 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              Limpiar
            </button>
          )}
          <ChevronDown className={cn("w-3.5 h-3.5 text-gray-300 transition-transform", isExpanded && "rotate-180")} />
        </div>
      </div>

      {activeEntries.length > 0 && (
        <div className="px-3 pb-2 flex flex-wrap gap-1">
          {activeEntries.map(([key, value]) => (
            <button
              key={key}
              onClick={() => removeFilter(key)}
              className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[9px] font-medium hover:bg-blue-100 cursor-pointer group"
            >
              {value.length > 20 ? value.slice(0, 18) + "…" : value}
              <X className="w-2 h-2 opacity-40 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-gray-100">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5">
            {filters.map(({ key, label, options }) => (
              <select
                key={key}
                value={filtros[key]}
                onChange={(e) => setFiltros({ [key]: e.target.value })}
                className={cn(
                  "h-7 px-2 rounded-lg text-[10px] border transition-all outline-none cursor-pointer w-full appearance-none bg-no-repeat bg-[right_4px_center] bg-[length:8px]",
                  filtros[key]
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 focus:border-blue-400"
                )}
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
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
