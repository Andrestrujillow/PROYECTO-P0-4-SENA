import { Outlet, useLocation } from "react-router-dom";
import { DesktopFloatingNav, MobileBottomNav } from "./Sidebar";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";

const PAGE_NAMES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/ofertas-comparadas": "Ofertas Comparadas",
  "/comportamiento": "Comportamiento",
  "/oferta-especial": "Oferta Especial",
  "/estrategias": "Estrategias",
};

const PAGE_SUBTITLES: Record<string, string> = {
  "/dashboard": "Panel principal de analisis",
  "/ofertas-comparadas": "Comparacion entre periodos",
  "/comportamiento": "Tendencias y comportamiento",
  "/oferta-especial": "Programas especiales SENA",
  "/estrategias": "Estrategias institucionales",
};

export default function Layout() {
  const location = useLocation();
  const pageName = PAGE_NAMES[location.pathname] || "Dashboard";
  const pageSubtitle = PAGE_SUBTITLES[location.pathname] || "";
  const isLoading = useDashboardStore((s) => s.isLoading);
  const excelFileName = useDashboardStore((s) => s.excelFileName);

  return (
    <div className="flex flex-col min-h-dvh bg-bg-base">
      {/* Header */}
      <header className="h-16 lg:h-18 shrink-0 bg-surface border-b border-border-light flex items-center px-4 lg:px-6 z-30 sticky top-2 mx-3 mt-2 rounded-2xl">
        {/* Left: Logo + brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm">
            <img src="/logoSena.png" alt="SENA" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-text-primary leading-tight">SENA PE-04</div>
            <div className="text-[11px] text-text-muted leading-tight">Regional Cauca</div>
          </div>
        </div>

        {/* Center: Page name */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2">
          <div className="text-center">
            <div className="text-sm font-semibold text-text-primary">{pageName}</div>
            {pageSubtitle && (
              <div className="text-[11px] text-text-muted">{pageSubtitle}</div>
            )}
          </div>
        </div>

        {/* Right: Status + actions */}
        <div className="ml-auto flex items-center gap-3">
          {isLoading && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sena-green-50 border border-sena-green-100">
              <Loader2 className="w-3.5 h-3.5 text-sena-green animate-spin" />
              <span className="text-xs font-medium text-sena-green">Cargando...</span>
            </div>
          )}
          {excelFileName && !isLoading && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-sena-green-50 border border-sena-green-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-sena-green" />
              <span className="text-xs font-medium text-sena-green truncate max-w-[140px]">
                {excelFileName}
              </span>
            </div>
          )}
          <div className="hidden md:block text-xs text-text-muted font-medium">
            {new Date().toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Desktop: floating nav on left (sticky) */}
        <DesktopFloatingNav />

        <main className="flex-1 overflow-y-auto w-full pb-28 lg:pb-8 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile: floating nav at bottom */}
      <MobileBottomNav />
    </div>
  );
}
