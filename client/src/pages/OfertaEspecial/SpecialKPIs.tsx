import { FileText, Users, Building2, Briefcase } from "lucide-react";
import type { Ficha } from "../../types";

interface SpecialKPIsProps {
  fichas: Ficha[];
}

export default function SpecialKPIs({ fichas }: SpecialKPIsProps) {
  const totalAprendices = fichas.reduce((acc, f) => acc + f.totalAprendices, 0);
  const totalCentros = new Set(fichas.map((f) => f.codigoCentro)).size;
  const totalEmpresas = new Set(fichas.filter((f) => f.nombreEmpresa).map((f) => f.nombreEmpresa)).size;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
      <div className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200">
        <div className="stat-card-accent accent-green" />
        <div className="flex items-center gap-3 pl-1">
          <div className="stat-card-icon icon-green">
            <FileText className="w-5 h-5" />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Fichas Especiales</span>
            <span className="stat-card-value">{fichas.length.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>
      <div className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200">
        <div className="stat-card-accent accent-blue" />
        <div className="flex items-center gap-3 pl-1">
          <div className="stat-card-icon icon-blue">
            <Users className="w-5 h-5" />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Aprendices</span>
            <span className="stat-card-value">{totalAprendices.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>
      <div className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200">
        <div className="stat-card-accent accent-purple" />
        <div className="flex items-center gap-3 pl-1">
          <div className="stat-card-icon icon-purple">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Centros</span>
            <span className="stat-card-value">{totalCentros}</span>
          </div>
        </div>
      </div>
      <div className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200">
        <div className="stat-card-accent accent-orange" />
        <div className="flex items-center gap-3 pl-1">
          <div className="stat-card-icon icon-orange">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Empresas</span>
            <span className="stat-card-value">{totalEmpresas}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
