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
    <div className="min-h-dvh flex flex-col bg-editorial-cream">
      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 py-20 text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/logoSena.png"
            alt=""
            className="w-full h-full object-cover opacity-[0.04]"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(228, 223, 217, 0.90)" }} />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto">
          {/* Badge */}
          <p className="editorial-caption mb-8">
            Servicio Nacional de Aprendizaje
          </p>

          {/* Headline */}
          <h1 className="editorial-display leading-[1.08] mb-8">
            Reporte Ofertas de
            <br />
            Formacion<span className="text-editorial-ember">.</span>
          </h1>

          {/* Subtitle */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <span className="text-editorial-subheading font-medium text-editorial-iron">
              {year - 4} &ndash; {year}
            </span>
            <span className="text-editorial-body text-editorial-slate">
              SENA Regional Cauca
            </span>
            <span className="text-editorial-caption text-editorial-stone">
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
            className="editorial-btn-primary"
          >
            Ingresar al Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-20 lg:py-28">
        <div className="editorial-section-header mb-14">
          <h2 className="editorial-heading">
            Herramientas de analisis
            <span className="text-editorial-ember">.</span>
          </h2>
          <p className="editorial-body text-editorial-slate mt-3 max-w-lg">
            Tres capacidades core para transformar datos crudos en decisiones
            informadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="editorial-feature-card">
              <div className="editorial-feature-icon">
                <Icon className="w-5 h-5 text-editorial-charcoal" />
              </div>
              <h3 className="editorial-heading-sm mt-6 mb-3">{title}</h3>
              <p className="editorial-body text-editorial-slate leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-editorial-fog">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="editorial-caption text-editorial-stone">
            Plataforma de Inteligencia Educativa &middot; PE-04 v1.0
          </p>
          <p className="editorial-caption text-editorial-pewter">
            SENA Regional Cauca &middot; {year}
          </p>
        </div>
      </footer>
    </div>
  );
}
