import { NavLink } from "react-router-dom";
import { useDashboardStore } from "../../store/dashboardStore";
import { cn } from "../../lib/cn";
import {
  LayoutDashboard,
  GitCompareArrows,
  TrendingUp,
  Star,
  Target,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/ofertas-comparadas", icon: GitCompareArrows, label: "Comparar" },
  { to: "/comportamiento", icon: TrendingUp, label: "Tendencias" },
  { to: "/oferta-especial", icon: Star, label: "Especial" },
  { to: "/estrategias", icon: Target, label: "Estrategias" },
];

/**
 * Desktop: vertical floating pill on the left side, sticky centered.
 */
export function DesktopFloatingNav() {
  const activeFilters = useDashboardStore((s) => Object.values(s.filtros).filter(Boolean).length);
  const resetFiltros = useDashboardStore((s) => s.resetFiltros);

  return (
    <div className="hidden lg:flex sticky top-12 h-[calc(100dvh-3rem)] shrink-0 w-20 xl:w-24 items-start justify-center z-20 pointer-events-none pt-6">
      <nav className="floating-nav pointer-events-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group relative flex flex-col items-center justify-center gap-1 w-14 h-14 xl:w-[58px] xl:h-14 rounded-xl text-[10px] font-medium transition-all duration-200",
                isActive
                  ? "bg-sena-green/10 text-sena-green"
                  : "text-text-muted hover:bg-surface-hover hover:text-text-secondary"
              )
            }
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
            <span className="leading-none">{label}</span>
          </NavLink>
        ))}

        {activeFilters > 0 && (
          <div className="w-full border-t border-border pt-2 mt-1">
            <button
              onClick={resetFiltros}
              className="w-full flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-xl text-[9px] font-medium text-sena-red/70 hover:text-sena-red hover:bg-sena-red/5 transition-colors"
            >
              <span className="text-xs leading-none">{activeFilters}</span>
              <span className="leading-none">Limpiar</span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

/**
 * Mobile: horizontal floating pill at the bottom.
 */
export function MobileBottomNav() {
  return (
    <nav className="mobile-nav">
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
