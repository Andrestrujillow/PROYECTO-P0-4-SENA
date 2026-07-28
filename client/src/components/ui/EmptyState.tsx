import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {icon && <div className="w-14 h-14 rounded-2xl bg-sena-green/10 border border-sena-green/20 flex items-center justify-center mb-5">{icon}</div>}
      <h3 className="text-base font-bold text-text-primary mb-1.5">{title}</h3>
      {description && <p className="text-sm text-text-muted mb-6 max-w-xs leading-relaxed">{description}</p>}
      {action}
    </div>
  );
}
