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
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-full max-w-[280px]">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm">
            <FileUpload />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard title="Fichas" value={fichasFiltradasCount} icon={<FileText className="w-3.5 h-3.5" />} color="blue" />
        <StatCard title="Aprendices" value={stats.totalAprendices} icon={<Users className="w-3.5 h-3.5" />} color="green" />
        <StatCard title="Centros" value={stats.totalCentros} icon={<Building2 className="w-3.5 h-3.5" />} color="purple" />
        <StatCard title="Empresas" value={stats.totalEmpresas} icon={<Briefcase className="w-3.5 h-3.5" />} color="orange" />
        <StatCard title="Instructores" value={stats.totalInstructores} icon={<GraduationCap className="w-3.5 h-3.5" />} color="teal" />
      </div>

      {/* ── Filters ── */}
      <FilterBar />

      {/* ── Charts Grid: 2 columns on large screens ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FichasPorNivel />
        <AprendicesPorModalidad />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AprendicesPorProgramaEspecial />
        <AprendicesPorCentro />
      </div>

      {/* ── Map ── */}
      <MapView />

      {/* ── Table ── */}
      <DataTable />

      {/* ── Upload ── */}
      <FileUpload />
    </div>
  );
}
