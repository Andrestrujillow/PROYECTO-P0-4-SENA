import { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "teal";
}

const COLORS: Record<string, { icon: string; accent: string }> = {
  blue: { icon: "icon-blue", accent: "accent-blue" },
  green: { icon: "icon-green", accent: "accent-green" },
  purple: { icon: "icon-purple", accent: "accent-purple" },
  orange: { icon: "icon-orange", accent: "accent-orange" },
  teal: { icon: "icon-teal", accent: "accent-teal" },
};

export default function StatCard({ title, value, icon, color = "blue" }: StatCardProps) {
  const c = COLORS[color] || COLORS.blue;
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof value !== "number" || !valueRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      valueRef.current.textContent = value.toLocaleString("es-CO");
      return;
    }
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 0.8,
      ease: "power2.out",
      snap: { val: 1 },
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = Math.round(obj.val).toLocaleString("es-CO");
        }
      },
    });
  }, [value]);

  return (
    <div className="stat-card section-card p-4 border-l-0 relative hover:shadow-md transition-shadow duration-200">
      <div className={`stat-card-accent ${c.accent}`} />
      <div className="flex items-center gap-3 pl-1">
        <div className={`stat-card-icon ${c.icon}`}>
          {icon}
        </div>
        <div className="stat-card-content">
          <p className="stat-card-label">{title}</p>
          <p className="stat-card-value">
            {typeof value === "number" ? (
              <span ref={valueRef}>0</span>
            ) : (
              value
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
