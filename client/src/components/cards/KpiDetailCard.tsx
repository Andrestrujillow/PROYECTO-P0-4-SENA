import type { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Trend {
  direction: "up" | "down" | "neutral";
  label: string;
}

interface Progress {
  current: number;
  max: number;
  label: string;
}

interface KpiDetailCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  color?: string;
  trend?: Trend;
  progress?: Progress;
}

export default function KpiDetailCard({ title, value, subtitle, icon, color = "blue", trend, progress }: KpiDetailCardProps) {
  const pct = progress ? Math.round((progress.current / progress.max) * 100) : 0;

  return (
    <div className="card p-3 sm:p-4 relative overflow-hidden">
      <div className="flex items-start gap-3">
        {icon && <div className={`stat-card-icon icon-${color}`}>{icon}</div>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="stat-card-label">{title}</span>
            {trend && (
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${trend.direction === "up" ? "text-green-400" : trend.direction === "down" ? "text-rose-400" : "text-text-muted"}`}>
                {trend.direction === "up" ? <TrendingUp className="w-2.5 h-2.5" /> : trend.direction === "down" ? <TrendingDown className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
                {trend.label}
              </span>
            )}
          </div>
          <span className="stat-card-value">{value.toLocaleString?.() ?? value}</span>
          {subtitle && <p className="text-[11px] text-text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {progress && (
        <div className="mt-2.5 pt-2 border-t border-border">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-text-muted">{progress.label}</span>
            <span className="font-semibold text-text-secondary">{pct}%</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(pct, 100)}%`, background: pct >= 60 ? "var(--color-sena-green)" : pct >= 30 ? "var(--color-sena-yellow)" : "var(--color-sena-red)" }} />
          </div>
        </div>
      )}
    </div>
  );
}
