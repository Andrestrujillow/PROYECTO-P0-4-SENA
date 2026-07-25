import { NavLink } from "react-router-dom";
import { useDashboardStore } from "../../store/dashboardStore";
import { cn } from "../../lib/cn";
import {
  LayoutDashboard,
  GitCompareArrows,
  TrendingUp,
  Star,
  Target,
  BarChart3,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/ofertas-comparadas", icon: GitCompareArrows, label: "Comparar" },
  { to: "/comportamiento", icon: TrendingUp, label: "Tendencias" },
  { to: "/oferta-especial", icon: Star, label: "Especial" },
  { to: "/estrategias", icon: Target, label: "Estrategias" },
];

export function DesktopSidebar() {
  const activeFilters = useDashboardStore((s) => Object.values(s.filtros).filter(Boolean).length);
  const resetFiltros = useDashboardStore((s) => s.resetFiltros);

  return (
    <aside className="hidden lg:flex flex-col w-16 xl:w-64 h-full bg-surface border-r border-border-light shrink-0">
      <div className="h-18 border-b border-border-light flex items-center px-4 xl:px-6 gap-3">
        <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm shrink-0">
          <img src="/logoSena.png" alt="SENA" className="w-full h-full object-contain" />
        </div>
        <div className="hidden xl:block">
          <div className="font-bold text-sm text-text-primary leading-tight">SENA PE-04</div>
          <div className="text-[11px] text-text-muted">Dashboard</div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sena-green-light text-sena-green shadow-sm"
                  : "text-text-secondary hover:bg-bg-base hover:text-text-primary"
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="hidden xl:block truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
      
      {activeFilters > 0 && (
        <div className="p-4 border-t border-border-light">
          <button
            onClick={resetFiltros}
            className="w-full px-3 py-2 text-xs font-semibold text-sena-red bg-sena-red-100 rounded-xl hover:bg-sena-red/15 transition-colors"
          >
            Limpiar Filtros ({activeFilters})
          </button>
        </div>
      )}
    </aside>
  );
}

export function MobileBottomNav() {
  return (
    <nav className="mobile-nav">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-full text-[10px] font-semibold transition-all duration-200",
              isActive
                ? "text-sena-green"
                : "text-text-muted active:text-text-secondary"
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-sena-green-light border border-sena-green/15 shadow-[0_0_8px_rgba(0,132,61,0.1)]" />
              )}
              <Icon className="w-[18px] h-[18px] relative z-10" />
              <span className="relative z-10 leading-none">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
