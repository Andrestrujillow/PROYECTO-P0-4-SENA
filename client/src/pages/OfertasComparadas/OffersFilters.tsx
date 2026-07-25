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

export default function OffersFilters({ fichas, filtros, onFiltroChange, onReset }: Props) {
  const options = useMemo(() => {
    const anios = [
      ...new Set(
        fichas.map((f) => f.fechaTerminacionFicha.split("/")[2]).filter(Boolean)
      ),
    ].sort((a, b) => b.localeCompare(a));
    return {
      anios,
      centros: uniqueSorted(fichas, (f) => f.nombreCentro),
      niveles: uniqueSorted(fichas, (f) => f.nivelFormacion),
      programas: uniqueSorted(fichas, (f) => f.nombreProgramaFormacion),
      ofertas: uniqueSorted(fichas, (f) => f.nombreSectorPrograma),
      municipios: uniqueSorted(fichas, (f) => f.nombreMunicipioCurso),
    };
  }, [fichas]);

  const activeCount = Object.values(filtros).filter(Boolean).length;

  const filters = [
    { key: "anio", label: "Año", items: options.anios.map((v) => ({ value: v, count: 0 })) },
    { key: "centro", label: "Centro", items: options.centros },
    { key: "nivel", label: "Nivel", items: options.niveles },
    { key: "programa", label: "Programa", items: options.programas },
    { key: "oferta", label: "Oferta", items: options.ofertas },
    { key: "municipio", label: "Municipio", items: options.municipios },
  ];

  const activeEntries = Object.entries(filtros).filter(([, v]) => v !== "");

  return (
    <div className="card overflow-visible">
      <div className="flex items-center justify-between px-5 py-3 rounded-t-[18px]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-bold text-text-primary">Filtros</span>
          {activeCount > 0 && <span className="badge badge-blue">{activeCount}</span>}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button onClick={onReset} className="btn-ghost text-sena-red/60 hover:text-sena-red hover:bg-sena-red/5">
              <RotateCcw className="w-4 h-4" />
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
              <X className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}

      <div className="px-5 pb-4 pt-1 border-t border-border-default">
        <div className="filter-grid">
          {filters.map(({ key, label, items }) => (
            <div key={key} className="relative">
              <select
                value={filtros[key] || ""}
                onChange={(e) => onFiltroChange(key, e.target.value)}
                className={`filter-item ${filtros[key] ? "!border-blue-400/30 !text-blue-400 !bg-blue-400/5" : ""}`}
              >
                <option value="">{label}</option>
                {items.map(({ value, count }) => (
                  <option key={value} value={value}>
                    {value} {count > 0 ? `(${count})` : ""}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
