import { useMemo } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import type { Ficha } from "../../types";

interface SpecialFiltersProps {
  fichas: Ficha[];
  filtros: Record<string, string>;
  onFiltroChange: (key: string, value: string) => void;
  onReset: () => void;
}

export default function SpecialFilters({
  fichas,
  filtros,
  onFiltroChange,
  onReset,
}: SpecialFiltersProps) {
  const options = useMemo(() => {
    const unique = (field: keyof Ficha) =>
      [...new Set(fichas.map((f) => f[field]))].filter(Boolean).sort();

    const extractYear = (fecha: string): string => {
      if (!fecha) return "";
      const parts = fecha.split("/");
      return parts.length === 3 ? parts[2] : "";
    };

    const years = [
      ...new Set(fichas.map((f) => extractYear(f.fechaTerminacionFicha)).filter(Boolean)),
    ].sort();

    return {
      anios: years.map((y) => ({ value: y, label: y })),
      niveles: unique("nivelFormacion").map((v) => ({ value: v as string, label: v as string })),
      programas: unique("nombreProgramaFormacion").map((v) => ({ value: v as string, label: v as string })),
      empresas: unique("nombreEmpresa").map((v) => ({ value: v as string, label: v as string })),
    };
  }, [fichas]);

  const activeCount = Object.values(filtros).filter(Boolean).length;

  const filters: { key: string; label: string; items: { value: string; label: string }[] }[] = [
    { key: "anio", label: "Año", items: options.anios },
    { key: "nivel", label: "Nivel", items: options.niveles },
    { key: "programa", label: "Programa", items: options.programas },
    { key: "empresa", label: "Empresa", items: options.empresas },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sena-green/10 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sena-green" />
          </div>
          <span className="text-[13px] font-semibold text-sena-white">Filtros</span>
          {activeCount > 0 && (
            <span className="badge badge-green">{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="btn-ghost text-sena-red/60 hover:text-sena-red hover:bg-sena-red/5"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar
          </button>
        )}
      </div>
      <div className="px-5 pb-4 pt-1 border-t border-sena-blue-light/10">
        <div className="filter-grid">
          {filters.map(({ key, label, items }) => (
            <select
              key={key}
              value={filtros[key] ?? ""}
              onChange={(e) => onFiltroChange(key, e.target.value)}
              className={`filter-item ${filtros[key] ? "active" : ""}`}
            >
              <option value="">{label}</option>
              {items.map(({ value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </div>
  );
}
