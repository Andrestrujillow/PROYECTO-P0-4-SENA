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
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at 25% 15%, rgba(0,132,61,0.8) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(245,158,11,0.15) 0%, transparent 55%)",
        }}
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
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-sena-green/80 mb-6">
            Servicio Nacional de Aprendizaje
          </p>
          <h1>
            Reporte Ofertas de
            <br />
            <span>Formacion</span>
          </h1>
        </div>

        <div
          className="landing-subtitle"
          style={{ animation: "fadeInUp 0.7s ease-out 0.2s both" }}
        >
          <span className="year">2020 &ndash; {year}</span>
          <span className="region">SENA Regional Cauca</span>
          <span className="date">
            <Calendar className="w-4 h-4" />
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
          Sistema de analisis y visualizacion inteligente del reporte PE-04.
          Indicadores clave, graficas interactivas, mapas y tablas detalladas.
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
            { icon: FileSpreadsheet, label: "Carga Excel", desc: "Drag & drop", bg: "bg-sena-green/8", iconColor: "text-sena-green" },
            { icon: TrendingUp, label: "Graficas", desc: "Interactivas", bg: "bg-sena-yellow/10", iconColor: "text-sena-yellow" },
            { icon: Shield, label: "Datos Seguros", desc: "En memoria", bg: "bg-blue-100", iconColor: "text-blue-500" },
          ].map(({ icon: Icon, label, desc, bg, iconColor }) => (
            <div key={label} className="landing-feature-card">
              <div className={`landing-feature-icon ${bg} ${iconColor}`}>
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
          Plataforma de Inteligencia Educativa &middot; PE-04 v1.0
        </p>

      </div>
    </div>
  );
}
