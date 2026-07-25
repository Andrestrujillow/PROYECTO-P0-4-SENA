import { useMemo } from "react";
import { X, ChevronDown, RotateCcw } from "lucide-react";
import { SlidersHorizontalIcon } from "../../components/icons/sliders-horizontal";
import { cn } from "../../lib/cn";
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
    { key: "centro", label: "Centro", items: options.centros },
    { key: "programa", label: "Programa", items: options.programas },
    { key: "estrategia", label: "Estrategia", items: options.estrategias },
    { key: "municipio", label: "Municipio", items: options.municipios },
  ];

  return (
    <div className="section-card">
      <div className="flex items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sena-green-50 flex items-center justify-center">
            <SlidersHorizontalIcon size={15} className="text-sena-green" />
          </div>
          <span className="section-title">Filtros</span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-sena-green text-white text-[10px] font-bold tabular-nums">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-sena-red transition-colors px-2.5 py-1.5 rounded-lg hover:bg-sena-red-100"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar
          </button>
        )}
      </div>

      <div className="px-5 pb-4 pt-1 border-t border-border-light">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {filters.map(({ key, label, items }) => (
            <div key={key} className="relative group">
              <select
                value={filtros[key] || ""}
                onChange={(e) => onFiltroChange(key, e.target.value)}
                className={cn(
                  "w-full h-11 px-3.5 pr-9 text-sm font-medium appearance-none rounded-xl border transition-all duration-150 outline-none cursor-pointer",
                  filtros[key]
                    ? "border-sena-green/40 bg-sena-green-light/40 text-text-primary shadow-[0_0_0_1px_rgba(0,132,61,0.1)]"
                    : "border-border bg-bg-base/60 text-text-secondary hover:border-text-muted focus:border-sena-green focus:shadow-[0_0_0_2px_rgba(0,132,61,0.08)]"
                )}
              >
                <option value="">{label}</option>
                {items.map(({ value, count }) => (
                  <option key={value} value={value}>
                    {value}{count > 0 ? ` (${count})` : ""}
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-text-secondary transition-colors">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {activeEntries.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border-light flex flex-wrap gap-2">
            {activeEntries.map(([key, value]) => (
              <button
                key={key}
                onClick={() => onFiltroChange(key, "")}
                className="inline-flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-full text-xs font-semibold border border-sena-green/20 bg-sena-green-light/40 text-sena-green hover:shadow-sm transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sena-green/50" />
                {value.length > 22 ? value.slice(0, 20) + "..." : value}
                <X className="w-3 h-3 opacity-50 hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
