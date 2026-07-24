import { useMemo } from "react";
import { SlidersHorizontal, RotateCcw, X } from "lucide-react";
import type { Ficha } from "../../types";

interface Props {
  fichas: Ficha[];
  filtros: Record<string, string>;
  onFiltroChange: (key: string, value: string) => void;
  onReset: () => void;
}

function uniqueSorted(fichas: Ficha[], extractor: (f: Ficha) => string) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    const val = extractor(f);
    if (val) map.set(val, (map.get(val) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

export default function StrategiesFilters({ fichas, filtros, onFiltroChange, onReset }: Props) {
  const options = useMemo(() => ({
    centros: uniqueSorted(fichas, (f) => f.nombreCentro),
    programas: uniqueSorted(fichas, (f) => f.nombreProgramaFormacion),
    estrategias: uniqueSorted(fichas.filter((f) => f.nombreProgramaEspecial), (f) => f.nombreProgramaEspecial),
    municipios: uniqueSorted(fichas, (f) => f.nombreMunicipioCurso),
  }), [fichas]);

  const activeCount = Object.values(filtros).filter(Boolean).length;
  const activeEntries = Object.entries(filtros).filter(([, v]) => v !== "");

  const filters = [
    { key: "centro", label: "Centro de Formación", items: options.centros },
    { key: "programa", label: "Programa de Formación", items: options.programas },
    { key: "estrategia", label: "Estrategia Institucional", items: options.estrategias },
    { key: "municipio", label: "Municipio", items: options.municipios },
  ];

  return (
    <div className="card overflow-visible">
      <div className="flex items-center justify-between px-5 py-3 rounded-t-[18px]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-400/10 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="text-[13px] font-semibold text-sena-white">Filtros</span>
          {activeCount > 0 && <span className="badge badge-purple">{activeCount}</span>}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button onClick={onReset} className="btn-ghost text-sena-red/60 hover:text-sena-red hover:bg-sena-red/5">
              <RotateCcw className="w-3 h-3" />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {activeEntries.length > 0 && (
        <div className="px-5 pb-2 flex flex-wrap gap-1.5">
          {activeEntries.map(([key, value]) => (
            <button key={key} onClick={() => onFiltroChange(key, "")} className="pill cursor-pointer group">
              {value.length > 25 ? value.slice(0, 22) + "..." : value}
              <X className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}

      <div className="px-5 pb-4 pt-1 border-t border-sena-blue-light/10">
        <div className="filter-grid">
          {filters.map(({ key, label, items }) => (
            <select
              key={key}
              value={filtros[key] || ""}
              onChange={(e) => onFiltroChange(key, e.target.value)}
              className={`filter-item ${filtros[key] ? "!border-purple-400/30 !text-purple-400 !bg-purple-400/5" : ""}`}
            >
              <option value="">{label}</option>
              {items.map(({ value, count }) => (
                <option key={value} value={value}>{value} ({count})</option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </div>
  );
}
