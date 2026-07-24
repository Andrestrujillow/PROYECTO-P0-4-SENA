import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  trend?: { value: number; isPositive: boolean };
  color?: "green" | "yellow" | "blue" | "red" | "purple";
}

const colorClasses = {
  green: { accent: "accent-green", icon: "icon-green" },
  yellow: { accent: "accent-yellow", icon: "icon-yellow" },
  blue: { accent: "accent-blue", icon: "icon-blue" },
  red: { accent: "accent-green", icon: "icon-green" },
  purple: { accent: "accent-purple", icon: "icon-purple" },
};

export default function StatCard({
  title,
  value,
  icon,
  trend,
  color = "green",
}: StatCardProps) {
  const c = colorClasses[color];

  return (
    <div className="card stat-card">
      <div className={`stat-card-accent ${c.accent}`} />
      <div className="stat-card-content">
        <p className="stat-card-label">{title}</p>
        <p className="stat-card-value">
          {typeof value === "number" ? value.toLocaleString("es-CO") : value}
        </p>
        {trend && (
          <p
            className={`text-[10px] mt-1 font-semibold ${
              trend.isPositive ? "text-sena-green" : "text-sena-red"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </p>
        )}
      </div>
      <div className={`stat-card-icon ${c.icon}`}>
        {icon}
      </div>
    </div>
  );
}
