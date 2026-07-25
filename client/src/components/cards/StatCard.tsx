import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "teal";
}

const COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-500", accent: "border-l-blue-500" },
  green: { bg: "bg-emerald-50", text: "text-emerald-500", accent: "border-l-emerald-500" },
  purple: { bg: "bg-violet-50", text: "text-violet-500", accent: "border-l-violet-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-500", accent: "border-l-orange-500" },
  teal: { bg: "bg-teal-50", text: "text-teal-500", accent: "border-l-teal-500" },
};

export default function StatCard({ title, value, icon, color = "blue" }: StatCardProps) {
  const c = COLORS[color] || COLORS.blue;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 border-l-[3px] ${c.accent} px-3 py-3 hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.bg}`}>
          <span className={c.text}>{icon}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-gray-400 leading-none mb-0.5">{title}</p>
          <p className="text-sm font-bold text-gray-800 leading-tight">
            {typeof value === "number" ? value.toLocaleString("es-CO") : value}
          </p>
        </div>
      </div>
    </div>
  );
}
