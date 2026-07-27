import {
  FileText,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import StatCard from "../../components/cards/StatCard";
import FileUpload from "../../components/ui/FileUpload";
import FilterBar from "../../components/filters/FilterBar";
import FichasPorNivel from "../../components/charts/FichasPorNivel";
import AprendicesPorProgramaEspecial from "../../components/charts/AprendicesPorProgramaEspecial";
import AprendicesPorCentro from "../../components/charts/AprendicesPorCentro";
import AprendicesPorModalidad from "../../components/charts/AprendicesPorModalidad";
import EquidadGenero from "../../components/charts/EquidadGenero";
import HorasPorTipo from "../../components/charts/HorasPorTipo";
import MapView from "../../components/map/MapView";
import DataTable from "../../components/table/DataTable";
import { useDashboardStore } from "../../store/dashboardStore";

export default function DashboardPage() {
  const stats = useDashboardStore((s) => s.estadisticas);
  const fichasCount = useDashboardStore((s) => s.fichas.length);
  const fichasFiltradasCount = useDashboardStore((s) => s.fichasFiltradas.length);
  const fichasFiltradas = useDashboardStore((s) => s.fichasFiltradas);

  const totalActivos = fichasFiltradas.reduce((acc, f) => acc + f.totalAprendicesActivos, 0);
  const totalGeneral = fichasFiltradas.reduce((acc, f) => acc + f.totalAprendices, 0);
  const tasaRetencion = totalGeneral > 0 ? Math.round((totalActivos / totalGeneral) * 100) : 0;

  if (fichasCount === 0) {
    return (
      <div className="page-card flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-sm animate-scale-in text-center">
          <div className="w-16 h-16 mx-auto bg-sena-green/10 rounded-xl flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-sena-green" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-2 tracking-tight">
            Dashboard PE-04
          </h2>
          <p className="text-[14px] text-text-muted mb-6 leading-relaxed">
            Sube el archivo Excel para comenzar el analisis.
          </p>
          <FileUpload />
        </div>
      </div>
    );
  }

  return (
    <div className="page-card space-y-3 sm:space-y-4">
      {/* KPI Row */}
      <section className="section-card p-3 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          <StatCard title="Fichas" value={fichasFiltradasCount} icon={<FileText className="w-4 h-4" />} color="blue" />
          <StatCard title="Aprendices" value={stats.totalAprendices} icon={<Users className="w-4 h-4" />} color="green" />
          <StatCard title="Centros" value={stats.totalCentros} icon={<Building2 className="w-4 h-4" />} color="purple" />
          <StatCard title="Empresas" value={stats.totalEmpresas} icon={<Briefcase className="w-4 h-4" />} color="orange" />
          <StatCard title="Instructores" value={stats.totalInstructores} icon={<GraduationCap className="w-4 h-4" />} color="teal" />
          <StatCard title="Retencion" value={`${tasaRetencion}%`} icon={<UserCheck className="w-4 h-4" />} color="rose" />
        </div>
      </section>

      {/* Filters */}
      <section className="section-card p-3 sm:p-4">
        <FilterBar />
      </section>

      {/* Charts Row 1 */}
      <section className="section-card p-3 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
          <FichasPorNivel />
          <AprendicesPorModalidad />
          <HorasPorTipo />
        </div>
      </section>

      {/* Charts Row 2 */}
      <section className="section-card p-3 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
          <AprendicesPorProgramaEspecial />
          <AprendicesPorCentro />
          <EquidadGenero />
        </div>
      </section>

      {/* Map */}
      <MapView />

      {/* Table */}
      <DataTable />

      {/* Upload */}
      <section className="section-card p-4 sm:p-5 text-center">
        <h3 className="section-title mb-3">Actualizar Datos</h3>
        <FileUpload />
      </section>
    </div>
  );
}
