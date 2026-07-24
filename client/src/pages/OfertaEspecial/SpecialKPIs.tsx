import { FileText } from "lucide-react";
import type { Ficha } from "../../types";

interface SpecialKPIsProps {
  fichas: Ficha[];
}

export default function SpecialKPIs({ fichas }: SpecialKPIsProps) {
  return (
    <div className="kpi-grid" style={{ gridTemplateColumns: "1fr" }}>
      <div className="card stat-card">
        <div className="stat-card-accent accent-green" />
        <div className="stat-card-content">
          <p className="stat-card-label">Total de Fichas</p>
          <p className="stat-card-value">
            {fichas.length.toLocaleString("es-CO")}
          </p>
        </div>
        <div className="stat-card-icon icon-green">
          <FileText className="w-5 h-5 text-sena-green" />
        </div>
      </div>
    </div>
  );
}
