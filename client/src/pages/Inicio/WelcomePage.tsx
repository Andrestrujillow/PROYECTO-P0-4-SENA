import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  FileSpreadsheet,
  TrendingUp,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Carga Directa",
    body: "Sube tu reporte PE-04 en formato Excel. Analisis automatico de 49 columnas de datos.",
  },
  {
    icon: TrendingUp,
    title: "Graficas Interactivas",
    body: "Visualiza tendencias por nivel, centro, programa y modalidad con filtros dinamicos.",
  },
  {
    icon: Shield,
    title: "Datos Seguros",
    body: "Toda la informacion se procesa en memoria. Nada se almacena en servidores externos.",
  },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-dvh flex flex-col bg-surface">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center px-6 pt-20 pb-16 lg:pt-28 lg:pb-20 text-center">
        <div className="w-full max-w-3xl mx-auto">
          {/* Badge */}
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sena-green-50 border border-sena-green-100 text-xs font-semibold tracking-wide uppercase text-sena-green mb-8">
            Servicio Nacional de Aprendizaje
          </p>

          {/* Headline */}
          <h1 className="text-[clamp(36px,8vw,64px)] font-medium leading-[1.08] tracking-tight text-text-primary mb-8">
            Reporte Ofertas de
            <br />
            <span className="text-sena-green">Formacion</span>
          </h1>

          {/* Subtitle */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <span className="text-xl font-medium text-text-secondary">
              {year - 4} &ndash; {year}
            </span>
            <span className="text-base text-text-muted">
              SENA Regional Cauca
            </span>
            <span className="text-sm text-text-muted">
              Actualizado:{" "}
              {new Date().toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-sena-green text-white font-semibold text-sm shadow-lg shadow-sena-green/20 hover:bg-sena-green-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
          >
            Ingresar al Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 pb-20 lg:pb-28">
        <div className="h-px bg-border mb-16" />

        <div className="max-w-lg mb-14">
          <h2 className="text-2xl font-medium tracking-tight text-text-primary mb-3">
            Herramientas de analisis
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            Tres capacidades core para transformar datos crudos en decisiones
            informadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-surface border border-border rounded-2xl p-8 transition-shadow hover:shadow-card"
            >
              <div className="w-10 h-10 rounded-xl bg-sena-green-50 border border-sena-green-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-sena-green" />
              </div>
              <h3 className="text-lg font-medium tracking-tight text-text-primary mt-6 mb-3">
                {title}
              </h3>
              <p className="text-base text-text-muted leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-border mt-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold tracking-wide uppercase text-text-muted">
            Plataforma de Inteligencia Educativa &middot; PE-04 v1.0
          </p>
          <p className="text-xs font-medium text-text-muted">
            SENA Regional Cauca &middot; {year}
          </p>
        </div>
      </footer>
    </div>
  );
}
