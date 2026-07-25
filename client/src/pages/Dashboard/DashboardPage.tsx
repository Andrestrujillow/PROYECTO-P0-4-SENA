import {
  FileText,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import StatCard from "../../components/cards/StatCard";
import FileUpload from "../../components/ui/FileUpload";
import FilterBar from "../../components/filters/FilterBar";
import FichasPorNivel from "../../components/charts/FichasPorNivel";
import AprendicesPorProgramaEspecial from "../../components/charts/AprendicesPorProgramaEspecial";
import AprendicesPorCentro from "../../components/charts/AprendicesPorCentro";
import AprendicesPorModalidad from "../../components/charts/AprendicesPorModalidad";
import MapView from "../../components/map/MapView";
import DataTable from "../../components/table/DataTable";
import { useDashboardStore } from "../../store/dashboardStore";

export default function DashboardPage() {
  const stats = useDashboardStore((s) => s.estadisticas);
  const fichasCount = useDashboardStore((s) => s.fichas.length);
  const fichasFiltradasCount = useDashboardStore((s) => s.fichasFiltradas.length);

  if (fichasCount === 0) {
    return (
      <div className="page-card flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md animate-scale-in">
          <div className="section-card p-10 text-center">
            <div className="w-20 h-20 mx-auto bg-sena-green-50 rounded-2xl flex items-center justify-center mb-8">
              <FileText className="w-10 h-10 text-sena-green" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">Bienvenido al Dashboard PE-04</h2>
            <p className="text-sm text-text-secondary mb-8 leading-relaxed">
              Sube el archivo Excel con la programacion especifica para comenzar el analisis.
            </p>
            <FileUpload />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card space-y-6">
      {/* KPI Row */}
      <section className="section-card p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          <StatCard title="Fichas" value={fichasFiltradasCount} icon={<FileText className="w-5 h-5" />} color="blue" />
          <StatCard title="Aprendices" value={stats.totalAprendices} icon={<Users className="w-5 h-5" />} color="green" />
          <StatCard title="Centros" value={stats.totalCentros} icon={<Building2 className="w-5 h-5" />} color="purple" />
          <StatCard title="Empresas" value={stats.totalEmpresas} icon={<Briefcase className="w-5 h-5" />} color="orange" />
          <StatCard title="Instructores" value={stats.totalInstructores} icon={<GraduationCap className="w-5 h-5" />} color="teal" />
        </div>
      </section>

      {/* Filters */}
      <section className="section-card p-6">
        <FilterBar />
      </section>

      {/* Charts Row 1 */}
      <section className="section-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FichasPorNivel />
          <AprendicesPorModalidad />
        </div>
      </section>

      {/* Charts Row 2 */}
      <section className="section-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AprendicesPorProgramaEspecial />
          <AprendicesPorCentro />
        </div>
      </section>

      {/* Map */}
      <section className="section-card p-6">
        <MapView />
      </section>

      {/* Table */}
      <section className="section-card overflow-hidden">
        <DataTable />
      </section>

      {/* Upload */}
      <section className="section-card p-6 text-center">
        <h3 className="section-title mb-4">Actualizar Datos</h3>
        <FileUpload />
      </section>
    </div>
  );
}
