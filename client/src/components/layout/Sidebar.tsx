import { NavLink } from "react-router-dom";
import { useDashboardStore } from "../../store/dashboardStore";
import { cn } from "../../lib/cn";
import {
  LayoutDashboard,
  GitCompareArrows,
  TrendingUp,
  Star,
  Target,
  X,
  RotateCcw,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/ofertas-comparadas", icon: GitCompareArrows, label: "Comparar" },
  { to: "/comportamiento", icon: TrendingUp, label: "Tendencias" },
  { to: "/oferta-especial", icon: Star, label: "Especial" },
  { to: "/estrategias", icon: Target, label: "Estrategias" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const activeFilters = useDashboardStore((s) => Object.values(s.filtros).filter(Boolean).length);
  const resetFiltros = useDashboardStore((s) => s.resetFiltros);

  return (
    <>
      {/* ── Desktop sidebar (>= lg) ── */}
      <aside className="hidden lg:flex fixed left-0 top-12 bottom-0 z-20 flex-col bg-surface border-r border-border overflow-hidden w-[70px] xl:w-[200px] 2xl:w-[220px] transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center justify-center xl:justify-start gap-2.5 h-14 px-3 border-b border-border shrink-0">
          <div className="w-7 h-7 rounded-md overflow-hidden shrink-0">
            <img src="/logoSena.png" alt="SENA" className="w-full h-full object-contain" />
          </div>
          <span className="hidden xl:block text-xs font-semibold text-text-primary tracking-tight truncate">
            PE-04 Dashboard
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col items-center xl:items-stretch gap-0.5 p-2 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => onClose()}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center justify-center xl:justify-start gap-3 h-11 xl:h-10 2xl:h-11 rounded-xl text-xs font-medium transition-all duration-200 shrink-0",
                  "w-11 xl:w-auto px-0 xl:px-3",
                  isActive
                    ? "bg-sena-green/10 text-sena-green"
                    : "text-text-muted hover:bg-surface-hover hover:text-text-secondary"
                )
              }
            >
              <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
              <span className="hidden xl:block truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Reset filters */}
        {activeFilters > 0 && (
          <div className="border-t border-border p-2 shrink-0">
            <button
              onClick={resetFiltros}
              className="flex items-center justify-center xl:justify-start gap-2 w-full h-10 rounded-xl text-xs font-medium text-sena-red/70 hover:text-sena-red hover:bg-sena-red/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:block">{activeFilters} activo{activeFilters !== 1 ? "s" : ""}</span>
            </button>
          </div>
        )}
      </aside>

      {/* ── Mobile drawer (< lg) ── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-surface border-r border-border flex flex-col overflow-hidden animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md overflow-hidden">
                  <img src="/logoSena.png" alt="SENA" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-semibold text-text-primary">PE-04</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-hover transition-colors"
              >
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            {/* Drawer nav */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-sena-green/10 text-sena-green"
                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                    )
                  }
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Drawer footer */}
            {activeFilters > 0 && (
              <div className="border-t border-border p-3 shrink-0">
                <button
                  onClick={() => { resetFiltros(); onClose(); }}
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-medium text-sena-red/70 hover:text-sena-red hover:bg-sena-red/5 border border-border transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpiar filtros ({activeFilters})
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

/**
 * Mobile: horizontal floating pill at the bottom (< lg).
 */
export function MobileBottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl text-[10px] font-medium transition-all duration-200",
              isActive
                ? "text-sena-green"
                : "text-text-muted active:text-text-secondary"
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-sena-green/10 border border-sena-green/15" />
              )}
              <Icon className="w-[18px] h-[18px] relative z-10" strokeWidth={1.5} />
              <span className="relative z-10 leading-none">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
