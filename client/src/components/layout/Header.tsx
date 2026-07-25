import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, Menu, X } from "lucide-react";
import { cn } from "../../lib/cn";

const navTabs = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/ofertas-comparadas", label: "Ofertas" },
  { to: "/comportamiento", label: "Comportamiento" },
  { to: "/oferta-especial", label: "Oferta Especial" },
  { to: "/estrategias", label: "Estrategias" },
];

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/50 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30">
      {/* Left: Mobile menu + Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl hover:bg-white/80 hover:shadow-sm transition-all text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-sena-green to-sena-green-light rounded-xl flex items-center justify-center shadow-sm">
            <BarChart3 className="w-[18px] h-4 text-white" />
          </div>
          <span className="hidden sm:block text-base font-bold text-gray-900 tracking-tight">
            PE-04
          </span>
        </button>
      </div>

      {/* Center: Navigation tabs — pill style like reference */}
      <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm rounded-full px-1.5 py-1 border border-white/40 shadow-sm">
        {navTabs.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white/80"
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Right: Info */}
      <div className="hidden lg:flex items-center gap-3">
        <span className="text-xs text-gray-400 font-medium">
          SENA Regional Cauca
        </span>
      </div>
    </header>
  );
}
