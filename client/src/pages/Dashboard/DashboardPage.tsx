import {
  FileText,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  BarChart3,
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
      <div className="flex items-center justify-center min-h-[65vh]">
        <div className="max-w-md w-full" style={{ animation: "scaleIn 0.5s ease-out" }}>
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-sena-green/10 border border-sena-green/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <BarChart3 className="w-8 h-8 text-sena-green" />
            </div>
            <h2 className="text-xl font-bold text-sena-white mb-2">
              Cargar datos PE-04
            </h2>
            <p className="text-sm text-sena-gray/50 mb-6 max-w-xs mx-auto leading-relaxed">
              Sube el archivo Excel del reporte PE-04 para comenzar el análisis.
            </p>
            <FileUpload />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">

      <div className="kpi-grid">
        {[
          { title: "Fichas", value: fichasFiltradasCount, icon: <FileText className="w-5 h-5" />, color: "green" as const },
          { title: "Aprendices", value: stats.totalAprendices, icon: <Users className="w-5 h-5" />, color: "blue" as const },
          { title: "Centros", value: stats.totalCentros, icon: <Building2 className="w-5 h-5" />, color: "yellow" as const },
          { title: "Empresas", value: stats.totalEmpresas, icon: <Briefcase className="w-5 h-5" />, color: "purple" as const },
          { title: "Instructores", value: stats.totalInstructores, icon: <GraduationCap className="w-5 h-5" />, color: "green" as const },
        ].map((s) => (
          <div key={s.title} style={{ animation: "fadeInUp 0.5s ease-out both" }}>
            <StatCard title={s.title} value={s.value} icon={s.icon} color={s.color} />
          </div>
        ))}
      </div>

      <FilterBar />

      <div className="chart-grid-2">
        <FichasPorNivel />
        <AprendicesPorProgramaEspecial />
      </div>

      <AprendicesPorCentro />

      <div className="chart-grid-2">
        <AprendicesPorModalidad />
        <MapView />
      </div>

      <DataTable />

      <FileUpload />
    </div>
  );
}
