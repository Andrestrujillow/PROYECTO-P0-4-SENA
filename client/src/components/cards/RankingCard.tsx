import type { ReactNode } from "react";
import { Trophy } from "lucide-react";

interface RankingItem {
  label: string;
  value: number;
}

interface RankingCardProps {
  title: string;
  icon?: ReactNode;
  items: RankingItem[];
  color?: string;
  valueLabel?: string;
  maxItems?: number;
}

export default function RankingCard({ title, icon, items, color = "green", valueLabel = "valor", maxItems = 10 }: RankingCardProps) {
  const displayed = items.slice(0, maxItems);
  if (displayed.length === 0) return null;

  const maxValue = displayed[0]?.value || 1;

  return (
    <div className="card p-3 sm:p-4">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-7 h-7 rounded-lg bg-sena-${color}/10 flex items-center justify-center shrink-0`}>
          {icon || <Trophy className="w-3.5 h-3.5 text-sena-green" />}
        </div>
        <h3 className="text-xs font-semibold text-text-primary">{title}</h3>
        <span className="ml-auto text-[10px] text-text-muted tabular-nums">{displayed.length} items</span>
      </div>
      <div className="space-y-1.5">
        {displayed.map((item, i) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <span className={`w-5 text-center text-[10px] font-bold shrink-0 ${i < 3 ? "text-sena-green" : "text-text-muted"}`}>
              {i === 0 ? "1" : i === 1 ? "2" : i === 2 ? "3" : `${i + 1}`}
            </span>
            <span className="flex-1 text-xs text-text-secondary truncate" title={item.label}>{item.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 sm:w-24 h-1.5 bg-border rounded-full overflow-hidden hidden sm:block">
                <div className="h-full rounded-full transition-all" style={{ width: `${(item.value / maxValue) * 100}%`, background: i === 0 ? "var(--color-sena-green)" : i === 1 ? "var(--color-sena-green-hover)" : i === 2 ? "rgba(0,132,61,0.5)" : "rgba(0,132,61,0.2)" }} />
              </div>
              <span className="text-xs font-semibold text-text-primary tabular-nums w-14 text-right">{item.value.toLocaleString("es-CO")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
