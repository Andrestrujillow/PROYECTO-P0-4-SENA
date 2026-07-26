import { useState } from "react";
import { X, ChevronDown, RotateCcw, Check } from "lucide-react";
import { SlidersHorizontalIcon } from "../icons/sliders-horizontal";
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

/* ── color per filter type for active chips ── */
const chipColor: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  Centro:      { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-700",    dot: "bg-blue-400" },
  Modalidad:   { bg: "bg-violet-50",  border: "border-violet-200",  text: "text-violet-700",  dot: "bg-violet-400" },
  Nivel:       { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   dot: "bg-amber-400" },
  Programa:    { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-400" },
  Empresa:     { bg: "bg-rose-50",    border: "border-rose-200",    text: "text-rose-700",    dot: "bg-rose-400" },
  Municipio:   { bg: "bg-cyan-50",    border: "border-cyan-200",    text: "text-cyan-700",    dot: "bg-cyan-400" },
  "Prog. Especial": { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", dot: "bg-indigo-400" },
  Ano:         { bg: "bg-orange-50",  border: "border-orange-200",  text: "text-orange-700",  dot: "bg-orange-400" },
  Estado:      { bg: "bg-teal-50",    border: "border-teal-200",    text: "text-teal-700",    dot: "bg-teal-400" },
  Etapa:       { bg: "bg-pink-50",    border: "border-pink-200",    text: "text-pink-700",    dot: "bg-pink-400" },
  Jornada:     { bg: "bg-lime-50",    border: "border-lime-200",    text: "text-lime-700",    dot: "bg-lime-400" },
  Sector:      { bg: "bg-sky-50",     border: "border-sky-200",     text: "text-sky-700",     dot: "bg-sky-400" },
  Instructor:  { bg: "bg-fuchsia-50", border: "border-fuchsia-200", text: "text-fuchsia-700", dot: "bg-fuchsia-400" },
  Convenio:    { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-400" },
  "Tipo Formacion": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-400" },
};

function getChipColor(label: string) {
  return chipColor[label] ?? { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", dot: "bg-gray-400" };
}

export default function FilterBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const fichas = useDashboardStore((s) => s.fichas);
  const filtros = useDashboardStore((s) => s.filtros);
  const setFiltros = useDashboardStore((s) => s.setFiltros);
  const resetFiltros = useDashboardStore((s) => s.resetFiltros);

  const data = useFilteredData(fichas);

  const filters: FilterConfig[] = [
    { key: "nombreCentro",      label: "Centro",       options: data.centros },
    { key: "modalidadFormacion", label: "Modalidad",    options: data.modalidades },
    { key: "nivelFormacion",    label: "Nivel",         options: data.niveles },
    { key: "programaFormacion", label: "Programa",      options: data.programas },
    { key: "empresa",           label: "Empresa",       options: data.empresas },
    { key: "municipio",         label: "Municipio",     options: data.municipios },
    { key: "programaEspecial",  label: "Prog. Especial", options: data.programasEspeciales },
    { key: "anioTerminacion",   label: "Ano",           options: data.anios.map((a) => ({ value: a, count: 0 })) },
    { key: "estadoCurso",       label: "Estado",        options: data.estados },
    { key: "etapaFicha",        label: "Etapa",         options: data.etapas },
    { key: "jornada",           label: "Jornada",       options: data.jornadas },
    { key: "sectorPrograma",    label: "Sector",        options: data.sectores },
    { key: "instructor",        label: "Instructor",     options: data.instructores },
    { key: "convenio",          label: "Convenio",       options: data.convenios },
    { key: "tipoFormacion",     label: "Tipo Formacion", options: data.tiposFormacion },
  ];

  const activeEntries = (Object.entries(filtros) as [FilterKey, string][]).filter(
    ([, v]) => v !== ""
  );

  const removeFilter = (key: FilterKey) => {
    setFiltros({ [key]: "" });
  };

  /* ── single select component ── */
  const FilterSelect = ({ filter, compact = false }: { filter: FilterConfig; compact?: boolean }) => {
    const active = filtros[filter.key];
    return (
      <div className="relative group">
        <select
          value={active}
          onChange={(e) => setFiltros({ [filter.key]: e.target.value })}
          className={cn(
            "w-full appearance-none rounded-xl border text-sm font-medium transition-all duration-150 outline-none cursor-pointer",
            compact ? "h-10 px-3 pr-8 text-xs" : "h-11 px-3.5 pr-9 text-sm",
            active
              ? "border-sena-green/40 bg-sena-green-light/40 text-text-primary shadow-[0_0_0_1px_rgba(0,132,61,0.1)]"
              : "border-border bg-bg-base/60 text-text-secondary hover:border-text-muted hover:bg-bg-base focus:border-sena-green focus:shadow-[0_0_0_2px_rgba(0,132,61,0.08)]"
          )}
        >
          <option value="">{filter.label}</option>
          {filter.options.map(({ value, count }) => (
            <option key={value} value={value}>
              {value}{count > 0 ? ` (${count})` : ""}
            </option>
          ))}
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-text-secondary transition-colors">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  };

  /* ── active chip ── */
  const ActiveChip = ({ label, value, onRemove }: { label: string; value: string; onRemove: () => void }) => {
    const colors = getChipColor(label);
    const display = value.length > 22 ? value.slice(0, 20) + "…" : value;
    return (
      <button
        onClick={onRemove}
        className={cn(
          "inline-flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-full text-xs font-semibold transition-all duration-150",
          "border hover:shadow-sm",
          colors.bg, colors.border, colors.text
        )}
      >
        <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
        {display}
        <X className="w-3 h-3 opacity-50 hover:opacity-100 transition-opacity" />
      </button>
    );
  };

  return (
    <>
      {/* ═══ Desktop ═══ */}
      <div className="hidden lg:block section-card">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-border-light">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sena-green-50 flex items-center justify-center">
              <SlidersHorizontalIcon size={15} className="text-sena-green" />
            </div>
            <span className="section-title">Filtros</span>
            {activeEntries.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-sena-green text-white text-[10px] font-bold tabular-nums">
                {activeEntries.length}
              </span>
            )}
          </div>
          {activeEntries.length > 0 && (
            <button
              onClick={resetFiltros}
              className="flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-sena-red transition-colors px-2.5 py-1.5 rounded-lg hover:bg-sena-red-100"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar
            </button>
          )}
        </div>

        {/* filter grid */}
        <div className="p-5">
          <div className="grid grid-cols-6 gap-2.5">
            {filters.map((f) => (
              <FilterSelect key={f.key} filter={f} />
            ))}
          </div>

          {/* active chips row */}
          {activeEntries.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border-light">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mr-1">
                  Activos
                </span>
                {activeEntries.map(([key, value]) => {
                  const filter = filters.find((f) => f.key === key);
                  return (
                    <ActiveChip
                      key={key}
                      label={filter?.label ?? key}
                      value={value}
                      onRemove={() => removeFilter(key)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Mobile ═══ */}
      <div className="lg:hidden">
        {/* trigger + horizontal chips */}
        <div className="flex items-center gap-2.5 mb-3">
          <button
            onClick={() => setIsExpanded(true)}
            className="h-10 px-4 rounded-xl bg-surface border border-border text-sm font-semibold text-text-secondary flex items-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
          >
            <SlidersHorizontalIcon size={15} className="text-text-muted" />
            Filtros
            {activeEntries.length > 0 && (
              <span className="ml-0.5 w-5 h-5 rounded-full bg-sena-green text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {activeEntries.length}
              </span>
            )}
          </button>

          <div className="flex-1 overflow-x-auto flex gap-2 no-scrollbar pb-0.5">
            {activeEntries.map(([key, value]) => {
              const filter = filters.find((f) => f.key === key);
              return (
                <ActiveChip
                  key={key}
                  label={filter?.label ?? key}
                  value={value}
                  onRemove={() => removeFilter(key)}
                />
              );
            })}
          </div>
        </div>

        {/* mobile sheet */}
        {isExpanded && (
          <div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center"
            onClick={() => setIsExpanded(false)}
          >
            <div
              className="bg-surface w-full max-h-[85vh] rounded-t-3xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* sheet header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sena-green-50 flex items-center justify-center">
                    <SlidersHorizontalIcon size={15} className="text-sena-green" />
                  </div>
                  <h2 className="text-base font-bold">Filtros</h2>
                  {activeEntries.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-sena-green text-white text-[10px] font-bold tabular-nums">
                      {activeEntries.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-bg-base transition-colors"
                >
                  <X className="w-4 h-4 text-text-muted" />
                </button>
              </div>

              {/* sheet body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {filters.map((f) => (
                  <div key={f.key}>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <FilterSelect filter={f} compact />
                  </div>
                ))}
              </div>

              {/* sheet footer */}
              <div className="px-6 py-4 border-t border-border-light flex gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <button
                  onClick={resetFiltros}
                  className="flex-1 h-11 rounded-xl border border-border text-text-secondary text-sm font-semibold hover:bg-bg-base transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpiar
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 h-11 rounded-xl bg-sena-green text-white text-sm font-semibold hover:bg-sena-green-hover transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
