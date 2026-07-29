import { useState, useMemo, useCallback } from "react";
import { GitCompareArrows, BookOpen, Building2, Briefcase, FileText } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import type { Filtros } from "../../types";
import OffersFilters from "./OffersFilters";
import OffersKPIs from "./OffersKPIs";
import OffersCharts from "./OffersCharts";
import OffersMap from "./OffersMap";
import OffersTable from "./OffersTable";
import FileUpload from "../../components/ui/FileUpload";
import EmptyState from "../../components/ui/EmptyState";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ExportPanel from "../../components/ui/ExportPanel";
import RankingCard from "../../components/cards/RankingCard";
import { PageLayout, PageSection } from "../../components/layout/PageLayout";
import { filtrarFichasComparativo } from "../../analytics/ComparativoAnalytics/helpers";
import { masOfertados, menosOfertados, masCuposPorSector, masInscritosPorCentro } from "../../analytics/ComparativoAnalytics/charts";

export default function OfertasComparadasPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Partial<Filtros>>({});

  const onFiltroChange = useCallback((key: keyof Filtros, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onReset = useCallback(() => setFiltros({}), []);

  const filteredFichas = useMemo(() => filtrarFichasComparativo(fichas, filtros as Record<string, string | undefined>), [fichas, filtros]);

  const masOfertadosData = useMemo(() => masOfertados(filteredFichas), [filteredFichas]);
  const menosOfertadosData = useMemo(() => menosOfertados(filteredFichas), [filteredFichas]);
  const masCupos = useMemo(() => masCuposPorSector(filteredFichas), [filteredFichas]);
  const masInscritos = useMemo(() => masInscritosPorCentro(filteredFichas), [filteredFichas]);

  if (fichas.length === 0) {
    return (
      <PageLayout title="Ofertas Comparadas" subtitle="Analisis comparativo de ofertas de formacion" icon={<GitCompareArrows className="w-5 h-5" />}>
        <PageSection className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-sm text-center">
            <EmptyState icon={<GitCompareArrows className="w-6 h-6 text-sena-green" />} title="Cargar datos PE-04" description="Sube el archivo Excel para ver las ofertas comparadas." action={<FileUpload />} />
          </div>
        </PageSection>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Ofertas Comparadas" subtitle="Analisis comparativo de ofertas de formacion" icon={<GitCompareArrows className="w-5 h-5" />}>
      <PageSection><Breadcrumb /></PageSection>
      <PageSection><OffersKPIs fichas={filteredFichas} /></PageSection>
      <PageSection className="flex items-center justify-end gap-2"><ExportPanel elementId="ofertas-page" fileName="PE-04_Ofertas_Comparadas" /></PageSection>
      <PageSection><OffersFilters fichas={fichas} filtros={filtros} onFiltroChange={onFiltroChange} onReset={onReset} /></PageSection>
      <PageSection><OffersCharts fichas={filteredFichas} /></PageSection>
      <PageSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 stagger-children">
        <RankingCard title="Programas Mas Ofertados" icon={<BookOpen className="w-4 h-4" />} items={masOfertadosData} color="green" valueLabel="ofertas" />
        <RankingCard title="Programas Menos Ofertados" icon={<BookOpen className="w-4 h-4" />} items={menosOfertadosData} color="rose" valueLabel="ofertas" />
        <RankingCard title="Sectores con Mas Cupos" icon={<Briefcase className="w-4 h-4" />} items={masCupos} color="blue" valueLabel="aprendices" />
        <RankingCard title="Centros con Mas Inscritos" icon={<Building2 className="w-4 h-4" />} items={masInscritos} color="purple" valueLabel="inscritos" />
      </PageSection>
      <PageSection><OffersMap fichas={filteredFichas} /></PageSection>
      <PageSection><OffersTable fichas={filteredFichas} /></PageSection>
      <PageSection>
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-lg bg-sena-green/10 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-sena-green" /></div>
            <h3 className="text-sm font-semibold text-text-primary">Informacion del Archivo</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div><span className="text-text-muted">Registros:</span><p className="font-semibold text-text-primary">{filteredFichas.length.toLocaleString("es-CO")}</p></div>
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
