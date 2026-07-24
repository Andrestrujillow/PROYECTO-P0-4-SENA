import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GitCompareArrows,
  Activity,
  Star,
  BookOpen,
  RotateCcw,
  HardDrive,
  ChevronRight,
} from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "green" },
  { to: "/ofertas-comparadas", label: "Ofertas Comparadas", icon: GitCompareArrows, color: "blue" },
  { to: "/comportamiento", label: "Comportamiento", icon: Activity, color: "purple" },
  { to: "/oferta-especial", label: "Oferta Especial", icon: Star, color: "yellow" },
  { to: "/estrategias", label: "Estrategias", icon: BookOpen, color: "blue" },
];

const colorMap: Record<string, { active: string; icon: string }> = {
  green: {
    active: "bg-sena-green/10 text-sena-green border-sena-green/20",
    icon: "text-sena-green",
  },
  blue: {
    active: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    icon: "text-blue-400",
  },
  purple: {
    active: "bg-purple-400/10 text-purple-400 border-purple-400/20",
    icon: "text-purple-400",
  },
  yellow: {
    active: "bg-sena-yellow/10 text-sena-yellow border-sena-yellow/20",
    icon: "text-sena-yellow",
  },
};

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const resetFiltros = useDashboardStore((s) => s.resetFiltros);
  const fichasCount = useDashboardStore((s) => s.fichas.length);
  const activeFilters = useDashboardStore((s) =>
    Object.values(s.filtros).filter(Boolean).length
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => {}}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[260px] lg:w-[240px]
          glass-strong flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 pb-3">
          <p className="text-[9px] text-sena-gray/40 uppercase tracking-[0.25em] font-semibold">
            Navegación
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, color }, index) => {
            const c = colorMap[color];
            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => {
                  const base = "group flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 border border-transparent ";
                  if (isActive) return base + c.active;
                  return base + "text-sena-gray/60 hover:text-sena-white hover:bg-sena-blue-light/30";
                }}
                style={{ animation: `slideInLeft 0.3s ease-out ${0.04 * index}s both` }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 truncate">{label}</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sena-blue-light/15 space-y-1.5">
          {fichasCount > 0 && activeFilters > 0 && (
            <button
              onClick={resetFiltros}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-[11px] text-sena-gray/50 hover:text-sena-red hover:bg-sena-red/5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar {activeFilters} filtro{activeFilters > 1 ? "s" : ""}
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sena-blue-light/15">
            <HardDrive className="w-3 h-3 text-sena-green/50" />
            <span className="text-[10px] text-sena-gray/40 font-medium">
              {fichasCount > 0
                ? `${fichasCount.toLocaleString()} fichas cargadas`
                : "Sin datos"}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
