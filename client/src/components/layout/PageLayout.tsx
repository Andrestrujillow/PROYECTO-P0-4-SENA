import type { ReactNode } from "react";
import { FileText, HardDrive } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageSection({ id, title, subtitle, icon, children, className = "" }: SectionProps) {
  return (
    <section id={id}>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="w-7 h-7 rounded-lg bg-sena-green/10 flex items-center justify-center shrink-0">{icon}</div>}
          <div>
            <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
            {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
          </div>
        </div>
      )}
      <div className={className || ""}>{children}</div>
    </section>
  );
}

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, subtitle, icon, children }: PageLayoutProps) {
  const excelFileName = useDashboardStore((s) => s.excelFileName);
  const fichas = useDashboardStore((s) => s.fichas);

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-6">
      <section>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-sena-green/10 border border-sena-green/20 flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-text-primary">{title}</h1>
              {subtitle && <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sena-green/10 border border-sena-green/20">
              <HardDrive className="w-3 h-3 text-sena-green" />
              <span className="text-[11px] font-medium text-sena-green tabular-nums">
                {fichas.length.toLocaleString("es-CO")} registros
              </span>
            </div>
            {excelFileName && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sena-green/10 border border-sena-green/20">
                <FileText className="w-3 h-3 text-sena-green" />
                <span className="text-[11px] font-medium text-sena-green truncate max-w-[160px]">{excelFileName}</span>
              </div>
            )}
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}

export default PageLayout;
