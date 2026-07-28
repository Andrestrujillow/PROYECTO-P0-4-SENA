import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, MobileBottomNav } from "./Sidebar";
import { CheckCircle2, Loader2, AlertCircle, X, Sun, Moon, Menu } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { useTheme } from "../../hooks/useTheme";

const PAGE_NAMES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/ofertas-comparadas": "Ofertas Comparadas",
  "/comportamiento": "Comportamiento",
  "/oferta-especial": "Oferta Especial",
  "/estrategias": "Estrategias",
};

export default function Layout() {
  const location = useLocation();
  const pageName = PAGE_NAMES[location.pathname] || "Dashboard";
  const isLoading = useDashboardStore((s) => s.isLoading);
  const excelFileName = useDashboardStore((s) => s.excelFileName);
  const error = useDashboardStore((s) => s.error);
  const setError = useDashboardStore((s) => s.setError);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <div className="flex flex-col min-h-dvh bg-bg-base">
      {/* Header */}
      <header
        className={`
          h-12 shrink-0 flex items-center px-3 sm:px-4 lg:px-5
          z-30 sticky top-0
          transition-all duration-300
          lg:pl-[calc(70px+16px)] xl:pl-[calc(200px+20px)] 2xl:pl-[calc(220px+24px)]
          ${scrolled
            ? "bg-bg-base/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
          }
        `}
      >
        {/* Left: hamburger (mobile) + logo */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-1.5 -ml-1 rounded-lg hover:bg-surface-hover transition-colors text-text-muted hover:text-text-secondary"
            aria-label="Abrir menu"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-md overflow-hidden">
            <img src="/logoSena.png" alt="SENA" className="w-full h-full object-contain" />
          </div>
          <span className="text-[13px] font-semibold text-text-primary tracking-tight hidden sm:block">
            PE-04
          </span>
          <span className="text-[11px] text-text-muted font-medium hidden md:block">
            Regional Cauca
          </span>
        </div>

        {/* Center: Page name */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
          <span className="text-[13px] font-medium text-text-secondary">{pageName}</span>
        </div>

        {/* Right: Status */}
        <div className="ml-auto flex items-center gap-2.5">
          {isLoading && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sena-green/10 border border-sena-green/20">
              <Loader2 className="w-3 h-3 text-sena-green animate-spin" />
              <span className="text-[11px] font-medium text-sena-green">Cargando</span>
            </div>
          )}
          {excelFileName && !isLoading && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sena-green/10 border border-sena-green/20">
              <CheckCircle2 className="w-3 h-3 text-sena-green" />
              <span className="text-[11px] font-medium text-sena-green truncate max-w-[120px]">
                {excelFileName}
              </span>
            </div>
          )}
          <span className="hidden md:block text-[11px] text-text-muted tabular-nums">
            {new Date().toLocaleDateString("es-CO", { day: "numeric", month: "short" })}
          </span>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors text-text-muted hover:text-text-secondary"
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div className="mx-3 sm:mx-4 lg:mx-5 mt-2 px-3 py-2.5 rounded-lg bg-sena-red/10 border border-sena-red/20 flex items-center gap-2.5">
          <AlertCircle className="w-3.5 h-3.5 text-sena-red shrink-0" />
          <span className="text-[13px] text-sena-red flex-1">{error}</span>
          <button onClick={() => setError(null)} className="p-0.5 rounded hover:bg-sena-red/10 transition-colors">
            <X className="w-3 h-3 text-sena-red/60" />
          </button>
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <main className="flex-1 overflow-y-auto w-full pb-24 lg:pb-8 lg:pl-[70px] xl:pl-[200px] 2xl:pl-[220px]">
          <div className="px-3 sm:px-4 lg:px-5 py-4 sm:py-5 lg:py-6">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileBottomNav />

      {/* Footer */}
      <footer className="hidden lg:flex items-center justify-between px-6 py-2.5 border-t border-border text-[10px] text-text-muted tracking-wide lg:pl-[calc(70px+24px)] xl:pl-[calc(200px+24px)] 2xl:pl-[calc(220px+24px)]">
        <span>SENA PE-04 v1.0</span>
        <span>Regional Cauca &middot; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
