import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import WelcomePage from "./pages/Inicio/WelcomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import OfertasComparadasPage from "./pages/OfertasComparadas/OfertasComparadasPage";
import ComportamientoPage from "./pages/Comportamiento/ComportamientoPage";
import OfertaEspecialPage from "./pages/OfertaEspecial/OfertaEspecialPage";
import EstrategiasPage from "./pages/EstrategiasInstitucionales/EstrategiasPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ofertas-comparadas" element={<OfertasComparadasPage />} />
          <Route path="/comportamiento" element={<ComportamientoPage />} />
          <Route path="/oferta-especial" element={<OfertaEspecialPage />} />
          <Route path="/estrategias" element={<EstrategiasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
