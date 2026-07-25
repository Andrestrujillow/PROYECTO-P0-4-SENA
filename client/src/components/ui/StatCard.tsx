import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({ title, value, icon, color = "text-sena-green" }: StatCardProps) {
  return (
    <div className={cn("card neu-raised-sm p-4 lg:p-5")}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-800">
            {typeof value === "number" ? value.toLocaleString("es-CO") : value}
          </p>
        </div>
        <div className={cn(color, "opacity-80")}>
          {icon}
        </div>
      </div>
    </div>
  );
}
