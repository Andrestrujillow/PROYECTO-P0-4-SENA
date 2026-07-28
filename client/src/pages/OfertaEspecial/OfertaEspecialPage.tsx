import { useState, useMemo } from "react";
import { Star, Lightbulb, Users, Award, BookOpen, GraduationCap, FileText } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import type { Filtros } from "../../types";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ExportPanel from "../../components/ui/ExportPanel";
import RankingCard from "../../components/cards/RankingCard";
import FileUpload from "../../components/ui/FileUpload";
import SpecialFilters from "./SpecialFilters";
import SpecialKPIs from "./SpecialKPIs";
import SpecialCharts, { SpecialChartsBottom } from "./SpecialCharts";
import SpecialTable from "./SpecialTable";
import MapView from "../../components/map/MapView";
import { PageLayout, PageSection } from "../../components/layout/PageLayout";
import { filtrarFichasEspecial } from "../../analytics/EspecialAnalytics/helpers";
import { masMatriculados, masCertificados, masActivosPorCentro, masOfertados } from "../../analytics/EspecialAnalytics/charts";

export default function OfertaEspecialPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Partial<Filtros>>({});

  const fichasEspeciales = useMemo(() => fichas.filter((f) => f.nombreProgramaEspecial && f.nombreProgramaEspecial.trim() !== ""), [fichas]);

  const filteredFichas = useMemo(() => filtrarFichasEspecial(fichas, filtros as Record<string, string | undefined>), [fichas, filtros]);

  const handleFiltroChange = (key: keyof Filtros, value: string) => setFiltros((p) => ({ ...p, [key]: value }));
  const handleReset = () => setFiltros({});

  const masMatriculadosData = useMemo(() => masMatriculados(filteredFichas), [filteredFichas]);
  const masCertificadosData = useMemo(() => masCertificados(filteredFichas), [filteredFichas]);
  const masActivos = useMemo(() => masActivosPorCentro(filteredFichas), [filteredFichas]);
  const masOfertadosData = useMemo(() => masOfertados(filteredFichas), [filteredFichas]);

  const centros = useMemo(() => [...new Set(fichas.map((f) => f.nombreCentro))].filter(Boolean).sort(), [fichas]);

  if (fichasEspeciales.length === 0) {
    return (
      <PageLayout title="Oferta Especial" subtitle="Programas especiales de formacion" icon={<Star className="w-5 h-5" />}>
        <PageSection className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-sm text-center">
            <div className="card p-6"><p className="text-sm text-text-muted">El archivo cargado no contiene programas especiales.</p></div>
          </div>
        </PageSection>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Oferta Especial" subtitle="Programas especiales de formacion" icon={<Star className="w-5 h-5" />}>
      <PageSection><Breadcrumb /></PageSection>
      <PageSection><SpecialKPIs fichas={filteredFichas} /></PageSection>
      <PageSection className="flex items-center justify-end gap-2"><ExportPanel elementId="oferta-especial-page" fileName="PE-04_Oferta_Especial" /></PageSection>

      <PageSection>
        <div className="card p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-sena-yellow" />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Centros de Formacion</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleFiltroChange("nombreCentro", "")} className={`btn-ghost ${!filtros.nombreCentro ? "active" : ""}`}>Todos</button>
            {centros.map((c) => (
              <button key={c} onClick={() => handleFiltroChange("nombreCentro", c)} className={`btn-ghost ${filtros.nombreCentro === c ? "active" : ""}`}>{c}</button>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection><SpecialFilters fichas={fichas} filtros={filtros} onFiltroChange={handleFiltroChange} onReset={handleReset} /></PageSection>

      <PageSection><SpecialCharts fichas={filteredFichas} /></PageSection>
      <PageSection className="max-w-2xl mx-auto"><SpecialChartsBottom fichas={filteredFichas} /></PageSection>

      <PageSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 stagger-children">
        <RankingCard title="Programas Mas Matriculados" icon={<Users className="w-4 h-4" />} items={masMatriculadosData} color="green" valueLabel="matriculados" />
        <RankingCard title="Programas Mas Certificados" icon={<Award className="w-4 h-4" />} items={masCertificadosData} color="blue" valueLabel="certificados" />
        <RankingCard title="Centros con Mas Activos" icon={<GraduationCap className="w-4 h-4" />} items={masActivos} color="purple" valueLabel="activos" />
        <RankingCard title="Programas Mas Ofertados" icon={<BookOpen className="w-4 h-4" />} items={masOfertadosData} color="orange" valueLabel="ofertas" />
      </PageSection>

      <PageSection><MapView /></PageSection>
      <PageSection><SpecialTable fichas={filteredFichas} /></PageSection>

      <PageSection>
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-lg bg-sena-green/10 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-sena-green" /></div>
            <h3 className="text-sm font-semibold text-text-primary">Informacion del Archivo</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div><span className="text-text-muted">Registros especiales:</span><p className="font-semibold text-text-primary">{filteredFichas.length.toLocaleString("es-CO")}</p></div>
            <div><span className="text-text-muted">Filtros activos:</span><p className="font-semibold text-text-primary">{Object.values(filtros).filter(Boolean).length}</p></div>
            <div><span className="text-text-muted">Actualizacion:</span><p className="font-semibold text-text-primary">{new Date().toLocaleDateString("es-CO")}</p></div>
            <div><span className="text-text-muted">Fuente:</span><p className="font-semibold text-text-primary">PE-04 SENA Regional Cauca</p></div>
          </div>
          <div className="mt-3 pt-3 border-t border-border"><FileUpload /></div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
