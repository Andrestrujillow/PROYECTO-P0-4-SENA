import { BarChart3, Menu, X, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardStore } from "../../store/dashboardStore";

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const fichasCount = useDashboardStore((s) => s.fichas.length);
  const fichasFiltradasCount = useDashboardStore((s) => s.fichasFiltradas.length);
  const isFiltered = fichasCount !== fichasFiltradasCount && fichasCount > 0;

  return (
    <header className="glass-strong h-14 flex items-center justify-between px-4 lg:px-6 shrink-0 relative z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg hover:bg-sena-blue-light/40 transition-colors text-sena-gray hover:text-sena-white cursor-pointer"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-sena-green to-sena-green-dark rounded-lg flex items-center justify-center shadow-md">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block leading-none">
            <p className="text-[13px] font-bold text-sena-white tracking-tight">
              PE-04
            </p>
            <p className="text-[9px] text-sena-gray/50 font-medium mt-px">
              Formación SENA
            </p>
          </div>
        </button>

        {fichasCount > 0 && (
          <div className="hidden md:flex items-center gap-1.5 ml-2">
            <span className="badge badge-green">
              {fichasFiltradasCount.toLocaleString("es-CO")} fichas
            </span>
            {isFiltered && (
              <span className="badge badge-yellow">
                de {fichasCount.toLocaleString("es-CO")}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sena-gray/30" />
          <input
            placeholder="Buscar..."
            className="input-premium pl-8 pr-3 py-1.5 w-48 text-[11px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-sena-gray/30 hidden xl:block font-medium">
          SENA Regional Cauca
        </span>

        <div className="w-px h-4 bg-sena-blue-light/30 hidden xl:block" />

        <button className="relative p-1.5 rounded-lg hover:bg-sena-blue-light/40 transition-colors text-sena-gray/50 hover:text-sena-white cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-sena-green rounded-full" />
        </button>

        <div className="w-7 h-7 bg-gradient-to-br from-sena-green/20 to-sena-green/5 border border-sena-green/15 rounded-lg flex items-center justify-center">
          <span className="text-[9px] font-bold text-sena-green tracking-wide">SC</span>
        </div>
      </div>
    </header>
  );
}
