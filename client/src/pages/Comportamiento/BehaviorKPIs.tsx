import { FileText } from "lucide-react";
import type { Ficha } from "../../types";

interface BehaviorKPIsProps {
  fichas: Ficha[];
}

export default function BehaviorKPIs({ fichas }: BehaviorKPIsProps) {
  const total = fichas.length;

  return (
    <div className="grid grid-cols-1 gap-3 lg:gap-4">
      <div className="stat-card section-card p-4 relative hover:shadow-md transition-shadow duration-200">
        <div className="stat-card-accent accent-green" />
        <div className="flex items-center gap-3 pl-1">
          <div className="stat-card-icon icon-green">
            <FileText className="w-5 h-5" />
          </div>
          <div className="stat-card-content">
            <span className="stat-card-label">Total Ofertas</span>
            <span className="stat-card-value">{total.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
