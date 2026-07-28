import { useState, useMemo, useCallback } from "react";
import { BookOpen, Handshake, Building2, BarChart3, FileText } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import type { Filtros } from "../../types";
import StrategiesFilters from "./StrategiesFilters";
import StrategiesKPIs from "./StrategiesKPIs";
import StrategiesCharts from "./StrategiesCharts";
import StrategiesMap from "./StrategiesMap";
import FileUpload from "../../components/ui/FileUpload";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ExportPanel from "../../components/ui/ExportPanel";
import RankingCard from "../../components/cards/RankingCard";
import { PageLayout, PageSection } from "../../components/layout/PageLayout";
import { filtrarFichasEstrategias } from "../../analytics/EstrategiasAnalytics/helpers";
import { conveniosPorParticipacion, aprendicesPorNivel, centrosConConvenios } from "../../analytics/EstrategiasAnalytics/charts";

export default function EstrategiasPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Partial<Filtros>>({});

  const onFiltroChange = useCallback((key: keyof Filtros, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onReset = useCallback(() => setFiltros({}), []);

  const filteredFichas = useMemo(() => filtrarFichasEstrategias(fichas, filtros as Record<string, string | undefined>), [fichas, filtros]);

  const participacionEstrategias = useMemo(() => conveniosPorParticipacion(filteredFichas), [filteredFichas]);
  const participacionNivel = useMemo(() => aprendicesPorNivel(filteredFichas), [filteredFichas]);
  const estrategiasCentros = useMemo(() => centrosConConvenios(filteredFichas), [filteredFichas]);

  if (fichas.length === 0) {
    return (
      <PageLayout title="Estrategias Institucionales" subtitle="Convenios y estrategias de formacion" icon={<BookOpen className="w-5 h-5" />}>
        <PageSection className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-sm text-center">
            <div className="card p-6"><FileUpload /></div>
          </div>
        </PageSection>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Estrategias Institucionales" subtitle="Convenios y estrategias de formacion" icon={<BookOpen className="w-5 h-5" />}>
      <PageSection><Breadcrumb /></PageSection>
      <PageSection><StrategiesKPIs fichas={filteredFichas} /></PageSection>
      <PageSection className="flex items-center justify-end gap-2"><ExportPanel elementId="estrategias-page" fileName="PE-04_Estrategias" /></PageSection>
      <PageSection><StrategiesFilters fichas={fichas} filtros={filtros} onFiltroChange={onFiltroChange} onReset={onReset} /></PageSection>
      <PageSection><StrategiesCharts fichas={filteredFichas} /></PageSection>

      <PageSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 stagger-children">
        <RankingCard title="Convenios con Mayor Participacion" icon={<Handshake className="w-4 h-4" />} items={participacionEstrategias} color="green" valueLabel="aprendices" />
        <RankingCard title="Distribucion por Nivel" icon={<BarChart3 className="w-4 h-4" />} items={participacionNivel} color="purple" valueLabel="aprendices" />
        <RankingCard title="Centros con Convenios" icon={<Building2 className="w-4 h-4" />} items={estrategiasCentros} color="blue" valueLabel="aprendices" />
      </PageSection>

      <PageSection><StrategiesMap fichas={filteredFichas} /></PageSection>

      <PageSection>
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-lg bg-sena-green/10 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-sena-green" /></div>
            <h3 className="text-sm font-semibold text-text-primary">Informacion del Archivo</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div><span className="text-text-muted">Registros:</span><p className="font-semibold text-text-primary">{filteredFichas.length.toLocaleString("es-CO")}</p></div>
            <div><span className="text-text-muted">Convenios:</span><p className="font-semibold text-text-primary">{participacionEstrategias.length}</p></div>
            <div><span className="text-text-muted">Actualizacion:</span><p className="font-semibold text-text-primary">{new Date().toLocaleDateString("es-CO")}</p></div>
            <div><span className="text-text-muted">Fuente:</span><p className="font-semibold text-text-primary">PE-04 SENA Regional Cauca</p></div>
          </div>
          <div className="mt-3 pt-3 border-t border-border"><FileUpload /></div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
