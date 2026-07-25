import { FileText } from "lucide-react";
import type { Ficha } from "../../types";

interface BehaviorKPIsProps {
  fichas: Ficha[];
}

export default function BehaviorKPIs({ fichas }: BehaviorKPIsProps) {
  const total = fichas.length;

  return (
    <div style={{ animation: "fadeInUp 0.5s ease-out both" }}>
      <div className="card stat-card" style={{ height: "140px", justifyContent: "center" }}>
        <div className="stat-card-accent accent-green" />
        <div className="stat-card-content items-center text-center">
          <p className="stat-card-label">Total Ofertas</p>
          <p className="text-5xl font-bold text-text-primary tracking-tight">
            {total.toLocaleString("es-CO")}
          </p>
        </div>
        <div className="stat-card-icon icon-green">
          <FileText className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
