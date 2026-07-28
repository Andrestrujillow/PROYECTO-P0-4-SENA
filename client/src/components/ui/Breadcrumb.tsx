import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PAGE_NAMES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/ofertas-comparadas": "Ofertas Comparadas",
  "/comportamiento": "Comportamiento",
  "/oferta-especial": "Oferta Especial",
  "/estrategias": "Estrategias",
};

export default function Breadcrumb() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-0">
      <Link to="/dashboard" className="hover:text-sena-green transition-colors font-medium">Inicio</Link>
      {segments.map((seg, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const label = PAGE_NAMES[path] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" />
            {i === segments.length - 1 ? (
              <span className="text-text-secondary font-semibold">{label}</span>
            ) : (
              <Link to={path} className="hover:text-sena-green transition-colors">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
