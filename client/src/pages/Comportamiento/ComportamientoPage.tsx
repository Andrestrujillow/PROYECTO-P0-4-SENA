import { useState, useMemo, useCallback } from "react";
import { BarChart3, TrendingUp, AlertTriangle, Award, FileText } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import type { Filtros } from "../../types";
import BehaviorFilters from "./BehaviorFilters";
import BehaviorCards from "./BehaviorCards";
import BehaviorCharts from "./BehaviorCharts";
import Breadcrumb from "../../components/ui/Breadcrumb";
import ExportPanel from "../../components/ui/ExportPanel";
import KpiDetailCard from "../../components/cards/KpiDetailCard";
import RankingCard from "../../components/cards/RankingCard";
import FileUpload from "../../components/ui/FileUpload";
import EmptyState from "../../components/ui/EmptyState";
import { PageLayout, PageSection } from "../../components/layout/PageLayout";
import { filtrarFichasComportamiento } from "../../analytics/ComportamientoAnalytics/helpers";
import { calcularCrecimiento, calcularProgramasCriticos, calcularCrecimientoProgramas, calcularCentrosDestacados } from "../../analytics/ComportamientoAnalytics/charts";

export default function ComportamientoPage() {
  const fichas = useDashboardStore((s) => s.fichas);
  const [filtros, setFiltros] = useState<Partial<Filtros>>({});

  const handleFiltroChange = useCallback((key: keyof Filtros, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => setFiltros({}), []);

  const filteredFichas = useMemo(() => filtrarFichasComportamiento(fichas, filtros as Record<string, string | undefined>), [fichas, filtros]);

  const crecimiento = useMemo(() => calcularCrecimiento(filteredFichas), [filteredFichas]);
  const critically = useMemo(() => calcularProgramasCriticos(filteredFichas), [filteredFichas]);
  const crecimientoProgramas = useMemo(() => calcularCrecimientoProgramas(filteredFichas), [filteredFichas]);
  const centrosDestacados = useMemo(() => calcularCentrosDestacados(filteredFichas), [filteredFichas]);

  if (fichas.length === 0) {
    return (
      <PageLayout title="Comportamiento" subtitle="Analisis de tendencias y comportamiento" icon={<BarChart3 className="w-5 h-5" />}>
        <PageSection className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-sm text-center">
            <EmptyState icon={<BarChart3 className="w-6 h-6 text-blue-400" />} title="Sin datos" description="Carga el archivo Excel del reporte PE-04." action={<FileUpload />} />
          </div>
        </PageSection>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Comportamiento" subtitle="Analisis de tendencias y comportamiento de la formacion" icon={<BarChart3 className="w-5 h-5" />}>
      <PageSection><Breadcrumb /></PageSection>
      <PageSection><BehaviorCards fichas={filteredFichas} /></PageSection>
      <PageSection className="flex items-center justify-end gap-2"><ExportPanel elementId="comportamiento-page" fileName="PE-04_Comportamiento" /></PageSection>
      <PageSection><BehaviorFilters fichas={fichas} filtros={filtros} onFiltroChange={handleFiltroChange} onReset={handleReset} /></PageSection>

      {crecimiento && (
        <PageSection title="Crecimiento y Proyecciones" icon={<TrendingUp className="w-4 h-4" />} className="w-full max-w-lg stagger-children">
          <KpiDetailCard title="Crecimiento Anual" value={`${crecimiento.pct > 0 ? "+" : ""}${crecimiento.pct}%`} subtitle="variacion interanual" icon={<TrendingUp className="w-4 h-4" />} color="green" trend={{ direction: crecimiento.pct >= 0 ? "up" : "down", label: crecimiento.pct >= 0 ? "Crecimiento positivo" : "Decrecimiento" }} />
        </PageSection>
      )}

      <PageSection><BehaviorCharts fichas={filteredFichas} /></PageSection>

      <PageSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 stagger-children">
        <RankingCard title="Programas con Mayor Crecimiento" icon={<TrendingUp className="w-4 h-4" />} items={crecimientoProgramas} color="green" valueLabel="% crecimiento" />
        <RankingCard title="Programas Criticos (Mayor Desercion)" icon={<AlertTriangle className="w-4 h-4" />} items={critically.map(c => ({ label: c.prog, value: c.desercion }))} color="rose" valueLabel="% desercion" />
        <RankingCard title="Centros Destacados (Mas Activos)" icon={<Award className="w-4 h-4" />} items={centrosDestacados} color="blue" valueLabel="aprendices activos" />
      </PageSection>

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
