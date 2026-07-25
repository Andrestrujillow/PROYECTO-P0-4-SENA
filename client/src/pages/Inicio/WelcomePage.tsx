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
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 text-center bg-bg-base relative overflow-hidden">
      {/* Background radial accent */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at 25% 15%, rgba(0,132,61,0.8) 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, rgba(245,158,11,0.15) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Logo */}
        <div className="mb-10 w-24 h-24 bg-sena-green-light rounded-3xl border border-sena-green/10 flex items-center justify-center shadow-sm relative">
          <BarChart3 className="w-10 h-10 text-sena-green" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-sena-green rounded-xl flex items-center justify-center shadow-md">
            <Map className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-sena-green mb-6">
            Servicio Nacional de Aprendizaje
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-[1.1] tracking-tight">
            Reporte Ofertas de
            <br />
            <span className="text-sena-green">Formacion</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="text-lg font-light text-text-muted">{year - 4} &ndash; {year}</span>
          <span className="text-base font-medium text-text-secondary">SENA Regional Cauca</span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <Calendar className="w-3.5 h-3.5" />
            Actualizado:{" "}
            {new Date().toLocaleDateString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-text-muted max-w-md leading-relaxed mb-10">
          Sistema de analisis y visualizacion inteligente del reporte PE-04.
          Indicadores clave, graficas interactivas, mapas y tablas detalladas.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-64 h-14 rounded-2xl bg-sena-green text-white font-semibold text-sm inline-flex items-center justify-center gap-2.5 shadow-lg shadow-sena-green/20 hover:bg-sena-green-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 mb-12"
        >
          Ingresar al Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Feature Cards */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 w-full justify-center">
          {[
            { icon: FileSpreadsheet, label: "Carga Excel", desc: "Drag & drop", bg: "bg-sena-green-light", iconColor: "text-sena-green" },
            { icon: TrendingUp, label: "Graficas", desc: "Interactivas", bg: "bg-yellow-50", iconColor: "text-yellow-500" },
            { icon: Shield, label: "Datos Seguros", desc: "En memoria", bg: "bg-blue-50", iconColor: "text-blue-500" },
          ].map(({ icon: Icon, label, desc, bg, iconColor }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-3 w-full sm:w-52 h-28 bg-surface rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-text-secondary block">{label}</span>
                <span className="text-[10px] text-text-muted">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
          Plataforma de Inteligencia Educativa &middot; PE-04 v1.0
        </p>
      </div>
    </div>
  );
}
