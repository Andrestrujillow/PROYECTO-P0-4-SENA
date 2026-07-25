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
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: "#f7f4e8" }}>
      {/* ── Hero ── */}
      <section className="flex flex-col items-center px-6 pt-24 pb-16 lg:pt-32 lg:pb-24 text-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Badge */}
          <p className="inline-flex items-center px-5 py-2 rounded-full border border-black text-xs font-semibold tracking-wide uppercase mb-10"
             style={{ backgroundColor: "#f7f4e8", color: "#000000" }}>
            Servicio Nacional de Aprendizaje
          </p>

          {/* Headline — massive editorial */}
          <h1 style={{ fontSize: "clamp(48px, 10vw, 120px)", lineHeight: 0.85, letterSpacing: "-0.03em", fontWeight: 700, color: "#000000" }}
              className="mb-10">
            Reporte
            <br />
            Ofertas de
            <br />
            <span style={{ color: "#00843D" }}>Formacion</span>
          </h1>

          {/* Subtitle */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <span className="text-lg font-medium" style={{ color: "#000000" }}>
              {year - 4} &ndash; {year}
            </span>
            <span className="text-base" style={{ color: "#666666" }}>
              SENA Regional Cauca
            </span>
            <span className="text-sm" style={{ color: "#999999" }}>
              Actualizado:{" "}
              {new Date().toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* CTA — pill black button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-[20px] font-medium text-base transition-all duration-200"
            style={{
              backgroundColor: "#000000",
              color: "#f7f4e8",
              border: "1px solid #000000",
            }}
          >
            Ingresar al Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="w-full px-6 pb-24 lg:pb-32" style={{ backgroundColor: "#f7f4e8" }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Divider */}
          <div className="mb-20" style={{ borderTop: "1px solid #c6c3ba" }} />

          {/* Section heading */}
          <div className="mb-16" style={{ maxWidth: 560 }}>
            <h2 style={{ fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 0.85, fontWeight: 700, letterSpacing: "-0.03em", color: "#000000" }}
                className="mb-4">
              Herramientas
              <br />
              de analisis
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#666666" }}>
              Tres capacidades core para transformar datos crudos en decisiones
              informadas.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="rounded-[20px] p-6 transition-colors duration-200"
                style={{
                  backgroundColor: i === 0 ? "#00843D" : "#f7f4e8",
                  border: i === 0 ? "1px solid #00843D" : "1px solid #000000",
                  color: i === 0 ? "#f7f4e8" : "#000000",
                }}
              >
                <div
                  className="w-12 h-12 rounded-[20px] flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: i === 0 ? "rgba(247,244,232,0.15)" : "#000000",
                    border: "none",
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: i === 0 ? "#f7f4e8" : "#f7f4e8" }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: i === 0 ? "#f7f4e8" : "#000000" }}>
                  {title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: i === 0 ? "rgba(247,244,232,0.8)" : "#666666" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full" style={{ borderTop: "1px solid #c6c3ba", backgroundColor: "#f7f4e8" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#999999" }}>
            Plataforma de Inteligencia Educativa &middot; PE-04 v1.0
          </p>
          <p className="text-xs font-medium" style={{ color: "#999999" }}>
            SENA Regional Cauca &middot; {year}
          </p>
        </div>
      </footer>
    </div>
  );
}
