import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from "lucide-react";
import type { Ficha } from "../../types";

interface BehaviorFiltersProps {
  fichas: Ficha[];
  filtros: Record<string, string>;
  onFiltroChange: (key: string, value: string) => void;
  onReset: () => void;
}

function uniqueSorted(fichas: Ficha[], extractor: (f: Ficha) => string): { value: string; count: number }[] {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    const val = extractor(f);
    if (val) map.set(val, (map.get(val) || 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({ value, count }));
}

function uniqueYears(fichas: Ficha[]): string[] {
  const years = new Set<string>();
  fichas.forEach((f) => {
    const parts = f.fechaTerminacionFicha.split("/");
    if (parts.length === 3 && parts[2]) years.add(parts[2]);
  });
  return Array.from(years).sort().reverse();
}

interface FilterDef {
  key: string;
  label: string;
  options: { value: string; count: number }[];
}

export default function BehaviorFilters({ fichas, filtros, onFiltroChange, onReset }: BehaviorFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const yearOptions = uniqueYears(fichas).map((y) => ({ value: y, count: 0 }));

  const filters: FilterDef[] = [
    { key: "sectorPrograma", label: "Oferta", options: uniqueSorted(fichas, (f) => f.nombreSectorPrograma) },
    { key: "anioTerminacion", label: "Año", options: yearOptions },
    { key: "modalidadFormacion", label: "Modalidad", options: uniqueSorted(fichas, (f) => f.modalidadFormacion) },
    { key: "programaEspecial", label: "Prog. Especial", options: uniqueSorted(fichas, (f) => f.nombreProgramaEspecial) },
    { key: "nombreCentro", label: "Centro", options: uniqueSorted(fichas, (f) => f.nombreCentro) },
    { key: "programaFormacion", label: "Programa", options: uniqueSorted(fichas, (f) => f.nombreProgramaFormacion) },
    { key: "nivelFormacion", label: "Nivel", options: uniqueSorted(fichas, (f) => f.nivelFormacion) },
  ];

  const activeEntries = Object.entries(filtros).filter(([, v]) => v !== "");

  return (
    <div className="card overflow-visible">
      <div
        className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-sena-blue-light/10 transition-colors rounded-t-[18px]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-400/10 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <span className="text-[13px] font-semibold text-sena-white">Filtros de Comportamiento</span>
          {activeEntries.length > 0 && (
            <span className="badge badge-blue">{activeEntries.length}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeEntries.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
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
              onClick={() => onFiltroChange(key, "")}
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
          <div className="filter-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            {filters.map(({ key, label, options }) => (
              <select
                key={key}
                value={filtros[key] || ""}
                onChange={(e) => onFiltroChange(key, e.target.value)}
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
