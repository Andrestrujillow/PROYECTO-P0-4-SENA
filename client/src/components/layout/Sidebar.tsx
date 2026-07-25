import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GitCompareArrows,
  TrendingUp,
  Star,
  Target,
  BarChart3,
  X,
} from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { cn } from "../../lib/cn";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, tip: "Dashboard" },
  { to: "/ofertas-comparadas", icon: GitCompareArrows, tip: "Ofertas Comparadas" },
  { to: "/comportamiento", icon: TrendingUp, tip: "Comportamiento" },
  { to: "/oferta-especial", icon: Star, tip: "Oferta Especial" },
  { to: "/estrategias", icon: Target, tip: "Estrategias" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const resetFiltros = useDashboardStore((s) => s.resetFiltros);
  const fichasCount = useDashboardStore((s) => s.fichas.length);
  const activeFilters = useDashboardStore((s) =>
    Object.values(s.filtros).filter(Boolean).length
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar — floating pill, centered vertically on the left */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50",
          "h-screen w-16 shrink-0",
          "flex items-center justify-center",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-0 translate-x-full p-2 text-gray-400 hover:text-gray-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating glass pill */}
        <nav className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-xl rounded-full py-5 px-3 shadow-lg shadow-black/5 border border-white/50">
          {/* Brand */}
          <div className="w-10 h-10 bg-gradient-to-br from-sena-green to-sena-green-light rounded-full flex items-center justify-center shadow-md shadow-sena-green/20 mb-1">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>

          {/* Divider */}
          <div className="w-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Nav icons */}
          {navItems.map(({ to, icon: Icon, tip }) => (
            <NavLink
              key={to}
              to={to}
              title={tip}
              className={({ isActive }) =>
                cn(
                  "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200",
                  isActive
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105"
                    : "text-gray-400 hover:text-gray-700 hover:bg-white hover:shadow-md hover:scale-105"
                )
              }
            >
              <Icon className="w-[18px] h-[18px]" />
            </NavLink>
          ))}

          {/* Divider */}
          <div className="w-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Filter badge (when active) */}
          {fichasCount > 0 && activeFilters > 0 && (
            <button
              onClick={resetFiltros}
              title={`Limpiar ${activeFilters} filtro${activeFilters > 1 ? "s" : ""}`}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-sena-red/10 text-sena-red hover:bg-sena-red hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span className="text-xs font-bold">{activeFilters}</span>
            </button>
          )}
        </nav>
      </aside>
    </>
  );
}
