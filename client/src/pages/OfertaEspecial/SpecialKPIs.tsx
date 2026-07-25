import { FileText } from "lucide-react";
import type { Ficha } from "../../types";

interface SpecialKPIsProps {
  fichas: Ficha[];
}

export default function SpecialKPIs({ fichas }: SpecialKPIsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:gap-4">
      <div className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200">
        <div className="stat-card-accent accent-green" />
        <div className="flex items-center gap-3 pl-1">
          <div className="stat-card-icon icon-green">
            <FileText className="w-5 h-5" />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Total Fichas</span>
            <span className="stat-card-value">{fichas.length.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
