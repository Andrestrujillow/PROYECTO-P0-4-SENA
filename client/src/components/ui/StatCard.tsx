import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({ title, value, icon, color = "text-sena-green" }: StatCardProps) {
  return (
    <div className="bg-sena-blue-medium rounded-card shadow-card border border-sena-blue-light/30 p-4 lg:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-sena-gray uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl lg:text-3xl font-bold text-sena-white">
            {typeof value === "number" ? value.toLocaleString("es-CO") : value}
          </p>
        </div>
        <div className={`${color} opacity-80`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
