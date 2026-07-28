import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import WelcomePage from "./pages/Inicio/WelcomePage";

const DashboardPage = lazy(() => import("./pages/Dashboard/DashboardPage"));
const OfertasComparadasPage = lazy(() => import("./pages/OfertasComparadas/OfertasComparadasPage"));
const ComportamientoPage = lazy(() => import("./pages/Comportamiento/ComportamientoPage"));
const OfertaEspecialPage = lazy(() => import("./pages/OfertaEspecial/OfertaEspecialPage"));
const EstrategiasPage = lazy(() => import("./pages/EstrategiasInstitucionales/EstrategiasPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-sena-green border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-text-muted">Cargando...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>} />
          <Route path="/ofertas-comparadas" element={<Suspense fallback={<PageLoader />}><OfertasComparadasPage /></Suspense>} />
          <Route path="/comportamiento" element={<Suspense fallback={<PageLoader />}><ComportamientoPage /></Suspense>} />
          <Route path="/oferta-especial" element={<Suspense fallback={<PageLoader />}><OfertaEspecialPage /></Suspense>} />
          <Route path="/estrategias" element={<Suspense fallback={<PageLoader />}><EstrategiasPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
