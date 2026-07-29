import {
  FileText, Users, Building2, Briefcase, BookOpen, MapPin,
  UserCheck, Award, Target, AlertTriangle, Percent, TrendingUp, Clock,
} from "lucide-react";
import StatCard from "../../components/cards/StatCard";
import KpiDetailCard from "../../components/cards/KpiDetailCard";
import RankingCard from "../../components/cards/RankingCard";
import FileUpload from "../../components/ui/FileUpload";
import ExportPanel from "../../components/ui/ExportPanel";
import Breadcrumb from "../../components/ui/Breadcrumb";
import EmptyState from "../../components/ui/EmptyState";
import { StatCardSkeleton, ChartCardSkeleton, TableSkeleton } from "../../components/ui/Skeleton";
import FilterBar from "../../components/filters/FilterBar";
import FichasPorNivel from "../../components/charts/FichasPorNivel";
import AprendicesPorCentro from "../../components/charts/AprendicesPorCentro";
import AprendicesPorModalidad from "../../components/charts/AprendicesPorModalidad";
import EquidadGenero from "../../components/charts/EquidadGenero";
import HorasPorTipo from "../../components/charts/HorasPorTipo";
import TimeSeriesChart from "../../components/charts/TimeSeriesChart";
import RadarChart from "../../components/charts/RadarChart";
import MapView from "../../components/map/MapView";
import DataTable from "../../components/table/DataTable";
import { PageLayout, PageSection } from "../../components/layout/PageLayout";
import { useDashboardStore } from "../../store/dashboardStore";
import { useMemo } from "react";
import { CHART_COLORS } from "../../components/charts/EChart";
import { calcularTendencias, calcularRankingProgramas, calcularRankingCentros, calcularRankingEmpresas } from "../../analytics/DashboardAnalytics/charts";

export default function DashboardPage() {
  const stats = useDashboardStore((s) => s.estadisticas);
  const detailed = useDashboardStore((s) => s.estadisticasDetalladas);
  const indicadores = useDashboardStore((s) => s.indicadores);
  const fichasCount = useDashboardStore((s) => s.fichas.length);
  const fichasFiltered = useDashboardStore((s) => s.fichasFiltradas);
  const isLoading = useDashboardStore((s) => s.isLoading);

  const tendencias = useMemo(() => calcularTendencias(fichasFiltered), [fichasFiltered]);
  const programsRanking = useMemo(() => calcularRankingProgramas(fichasFiltered), [fichasFiltered]);
  const centrosRanking = useMemo(() => calcularRankingCentros(fichasFiltered), [fichasFiltered]);
  const empresasRanking = useMemo(() => calcularRankingEmpresas(fichasFiltered), [fichasFiltered]);

  if (isLoading && fichasCount === 0) {
    return (
      <PageLayout title="Dashboard" subtitle="Panel principal de indicadores" icon={<Target className="w-5 h-5" />}>
        <PageSection className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (<StatCardSkeleton key={i} />))}
        </PageSection>
        <PageSection><ChartCardSkeleton /></PageSection>
        <PageSection><TableSkeleton /></PageSection>
      </PageLayout>
    );
  }

  if (fichasCount === 0) {
    return (
      <PageLayout title="Dashboard" subtitle="Panel principal de indicadores" icon={<Target className="w-5 h-5" />}>
        <PageSection className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-sm text-center">
            <EmptyState icon={<FileText className="w-6 h-6 text-sena-green" />} title="Dashboard PE-04" description="Sube el archivo Excel para comenzar el analisis." action={<FileUpload />} />
          </div>
        </PageSection>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Dashboard" subtitle="Panel principal de indicadores del PE-04" icon={<Target className="w-5 h-5" />}>
      <PageSection><Breadcrumb /></PageSection>

        <PageSection className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4 stagger-children">
          <StatCard title="Fichas" value={fichasFiltered.length} icon={<FileText className="w-4 h-4" />} color="blue" />
          <StatCard title="Aprendices" value={stats.totalAprendices} icon={<Users className="w-4 h-4" />} color="green" />
          <StatCard title="Cupos" value={stats.totalAprendices} icon={<BookOpen className="w-4 h-4" />} color="teal" />
          <StatCard title="Activos" value={detailed.totalActivos || 0} icon={<UserCheck className="w-4 h-4" />} color="purple" />
          <StatCard title="Desertados" value={stats.totalAprendices - (detailed.totalActivos || 0)} icon={<AlertTriangle className="w-4 h-4" />} color="rose" />
          <StatCard title="Empresas" value={stats.totalEmpresas} icon={<Briefcase className="w-4 h-4" />} color="orange" />
          <StatCard title="Centros" value={stats.totalCentros} icon={<Building2 className="w-4 h-4" />} color="purple" />
          <StatCard title="Programas" value={detailed.totalProgramas || 0} icon={<BookOpen className="w-4 h-4" />} color="teal" />
          <StatCard title="Instructores" value={detailed.totalInstructores || stats.totalInstructores || 0} icon={<UserCheck className="w-4 h-4" />} color="blue" />
          <StatCard title="Municipios" value={detailed.totalMunicipios || 0} icon={<MapPin className="w-4 h-4" />} color="rose" />
        </PageSection>

      <PageSection title="Indicadores Clave" icon={<Target className="w-4 h-4" />} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        {indicadores.length > 0 ? indicadores.map((ind) => (
          <KpiDetailCard key={ind.nombre} title={ind.nombre} value={`${ind.valor}${ind.unidad}`} subtitle={ind.descripcion}
            icon={ind.nombre === "Ocupacion" ? <UserCheck className="w-4 h-4" /> : ind.nombre === "Certificacion" ? <Award className="w-4 h-4" /> : ind.nombre === "Cumplimiento" ? <Target className="w-4 h-4" /> : ind.nombre === "Desercion" ? <AlertTriangle className="w-4 h-4" /> : <Percent className="w-4 h-4" />}
            color={ind.color || "blue"}
            trend={ind.valor >= 60 ? { direction: "up", label: "Saludable" } : ind.valor >= 30 ? { direction: "neutral", label: "En monitoreo" } : { direction: "down", label: "Requiere atencion" }}
            progress={ind.nombre === "Desercion" ? { current: 100 - ind.valor, max: 100, label: "Retencion" } : { current: ind.valor, max: 100, label: "Meta: 100%" }} />
        )) : (
          <>
            <KpiDetailCard title="Ocupacion" value="0%" subtitle="tasa de ocupacion" icon={<UserCheck className="w-4 h-4" />} color="blue" />
            <KpiDetailCard title="Certificacion" value="0%" subtitle="tasa de certificacion" icon={<Award className="w-4 h-4" />} color="green" />
            <KpiDetailCard title="Cumplimiento" value="0%" subtitle="tasa de cumplimiento" icon={<Target className="w-4 h-4" />} color="teal" />
            <KpiDetailCard title="Desercion" value="0%" subtitle="tasa de desercion" icon={<AlertTriangle className="w-4 h-4" />} color="rose" />
          </>
        )}
        <KpiDetailCard title="Horas Totales" value={(detailed.totalHoras || 0).toLocaleString("es-CO")} subtitle="horas de formacion" icon={<Clock className="w-4 h-4" />} color="purple" />
        <KpiDetailCard title="Certificados" value={detailed.totalCertificados || 0} subtitle="fichas terminadas" icon={<Award className="w-4 h-4" />} color="blue" />
        <KpiDetailCard title="Crecimiento" value={`+${detailed.crecimientoAnual || 0}%`} subtitle="crecimiento anual" icon={<TrendingUp className="w-4 h-4" />} color="teal" trend={{ direction: "up", label: "Positivo" }} />
      </PageSection>

      <PageSection><FilterBar /></PageSection>

      <PageSection className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 stagger-children">
        <FichasPorNivel />
        <AprendicesPorModalidad />
        <HorasPorTipo />
      </PageSection>

      <PageSection className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 stagger-children">
        <AprendicesPorCentro />
        <EquidadGenero />
      </PageSection>

      {tendencias.length > 0 && (
        <PageSection className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 stagger-children">
          <div className="card chart-card">
            <div className="chart-card-header">
              <div className="chart-card-title-group">
                <div className="chart-card-icon icon-blue"><TrendingUp className="w-4 h-4 text-blue-400" /></div>
                <div>
                  <h3 className="chart-card-title">Tendencias por Ano</h3>
                  <p className="chart-card-subtitle">Inscritos vs Activos vs Desertados</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sena-green/10 text-sena-green text-[10px] font-bold border border-sena-green/20">{tendencias.length} anos</span>
            </div>
            <div className="chart-card-body">
              <TimeSeriesChart categories={tendencias.map(t => t.etiqueta)}
                series={[
                  { name: "Inscritos", data: tendencias.map(t => t.inscritos), color: CHART_COLORS[0] },
                  { name: "Activos", data: tendencias.map(t => t.activos), color: CHART_COLORS[1] },
                  { name: "Desertados", data: tendencias.map(t => t.desertados), color: CHART_COLORS[4] },
                ]} height={280} />
            </div>
          </div>
          <div className="card chart-card">
            <div className="chart-card-header">
              <div className="chart-card-title-group">
                <div className="chart-card-icon icon-purple"><Target className="w-4 h-4 text-purple-400" /></div>
                <div>
                  <h3 className="chart-card-title">Indicadores Clave</h3>
                  <p className="chart-card-subtitle">Radar de rendimiento general</p>
                </div>
              </div>
            </div>
            <div className="chart-card-body">
              <RadarChart indicators={indicadores.map(i => i.nombre)} series={[{ name: "Indicadores", data: indicadores.map(i => i.valor) }]} height={280} />
            </div>
          </div>
        </PageSection>
      )}

      <PageSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 stagger-children">
        <RankingCard title="Programas con Mas Aprendices" icon={<BookOpen className="w-4 h-4" />} items={programsRanking} color="green" valueLabel="total aprendices" />
        <RankingCard title="Centros con Mas Aprendices" icon={<Building2 className="w-4 h-4" />} items={centrosRanking} color="blue" valueLabel="total aprendices" />
        <RankingCard title="Empresas con Mas Aprendices" icon={<Briefcase className="w-4 h-4" />} items={empresasRanking} color="orange" valueLabel="total aprendices" />
      </PageSection>

      <PageSection className="flex items-center justify-end gap-2"><ExportPanel elementId="dashboard-content" /></PageSection>

      <PageSection><MapView /></PageSection>
      <PageSection><DataTable /></PageSection>

      <PageSection>
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-7 h-7 rounded-lg bg-sena-green/10 flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-sena-green" /></div>
            <h3 className="text-sm font-semibold text-text-primary">Informacion del Archivo</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div><span className="text-text-muted">Registros:</span><p className="font-semibold text-text-primary">{fichasFiltered.length.toLocaleString("es-CO")}</p></div>
            <div><span className="text-text-muted">Columnas:</span><p className="font-semibold text-text-primary">52</p></div>
            <div><span className="text-text-muted">Actualizacion:</span><p className="font-semibold text-text-primary">{new Date().toLocaleDateString("es-CO")}</p></div>
            <div><span className="text-text-muted">Fuente:</span><p className="font-semibold text-text-primary">PE-04 SENA Regional Cauca</p></div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <FileUpload />
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
