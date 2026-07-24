import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  TrendingUp,
  Shield,
  Calendar,
  Map,
} from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="landing-container">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at 25% 15%, rgba(0,132,61,0.9) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(255,209,0,0.2) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(28,45,66,0.8) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      <div
        className="absolute top-16 left-8 w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{ background: "rgba(0,132,61,0.06)" }}
      />
      <div
        className="absolute bottom-16 right-8 w-[600px] h-[600px] rounded-full blur-[160px]"
        style={{ background: "rgba(255,209,0,0.03)" }}
      />

      <div className="relative z-10 w-full max-w-3xl">

        <div
          className="landing-logo"
          style={{ animation: "fadeInDown 0.7s ease-out" }}
        >
          <div className="landing-logo-icon">
            <BarChart3 className="w-12 h-12 text-sena-green" />
            <div className="landing-logo-badge">
              <Map className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div
          className="landing-title"
          style={{ animation: "fadeInUp 0.7s ease-out 0.1s both" }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-sena-green/80 mb-6"
          >
            Servicio Nacional de Aprendizaje
          </p>
          <h1>
            Reporte Ofertas de
            <br />
            <span>Formación</span>
          </h1>
        </div>

        <div
          className="landing-subtitle"
          style={{ animation: "fadeInUp 0.7s ease-out 0.2s both" }}
        >
          <span className="year">2020 – {year}</span>
          <span className="region">SENA Regional Cauca</span>
          <span className="date">
            <Calendar className="w-3 h-3" />
            Actualizado:{" "}
            {new Date().toLocaleDateString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <p
          className="landing-description"
          style={{ animation: "fadeInUp 0.7s ease-out 0.3s both" }}
        >
          Sistema de análisis y visualización inteligente del reporte PE-04.
          Indicadores clave, gráficas interactivas, mapas y tablas detalladas.
        </p>

        <div
          className="landing-button"
          style={{ animation: "fadeInUp 0.7s ease-out 0.4s both" }}
        >
          <button onClick={() => navigate("/dashboard")}>
            Ingresar al Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div
          className="landing-features"
          style={{ animation: "fadeInUp 0.7s ease-out 0.5s both" }}
        >
          {[
            { icon: FileSpreadsheet, label: "Carga Excel", desc: "Drag & drop", bg: "rgba(0,132,61,0.08)", iconColor: "text-sena-green/60" },
            { icon: TrendingUp, label: "Gráficas", desc: "Interactivas", bg: "rgba(255,209,0,0.08)", iconColor: "text-sena-yellow/60" },
            { icon: Shield, label: "Datos Seguros", desc: "En memoria", bg: "rgba(96,165,250,0.08)", iconColor: "text-blue-400/60" },
          ].map(({ icon: Icon, label, desc, bg, iconColor }) => (
            <div key={label} className="landing-feature-card">
              <div
                className={`landing-feature-icon ${iconColor}`}
                style={{ background: bg }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="landing-feature-text">
                <span className="label">{label}</span>
                <span className="desc">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        <p
          className="landing-footer"
          style={{ animation: "fadeInUp 0.7s ease-out 0.6s both" }}
        >
          Plataforma de Inteligencia Educativa · PE-04 v1.0
        </p>

      </div>
    </div>
  );
}
