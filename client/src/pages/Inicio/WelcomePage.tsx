import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-dvh flex flex-col bg-surface">
      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Badge */}
          <p className="inline-flex items-center px-5 py-2 rounded-full border border-border text-xs font-semibold tracking-wide uppercase text-text-muted mb-10">
            Servicio Nacional de Aprendizaje
          </p>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(48px, 10vw, 120px)", lineHeight: 0.85, letterSpacing: "-0.03em", fontWeight: 700 }}
              className="text-text-primary mb-10">
            Reporte
            <br />
            Ofertas de
            <br />
            <span className="text-sena-green">Formacion</span>
          </h1>

          {/* Subtitle */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <span className="text-lg font-medium text-text-secondary">
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-[20px] bg-sena-green text-white font-medium text-base transition-all duration-200 hover:bg-sena-green-hover"
          >
            Ingresar al Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-border py-8">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
