import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Upload, Shield } from "lucide-react";

export default function WelcomePage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-dvh flex flex-col bg-bg-base">
      {/* ═══ Hero — Full viewport, cinematic ═══ */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        
        {/* Grid pattern — subtle */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="animate-fade-in-down" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-[11px] font-medium tracking-widest uppercase text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-sena-green animate-pulse" />
              Servicio Nacional de Aprendizaje
            </span>
          </div>

          {/* Headline — massive, tight, Apple-style */}
          <h1
            className="mt-10 mb-8 animate-fade-in-up"
            style={{
              fontSize: "clamp(44px, 9vw, 96px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              fontWeight: 700,
              animationDelay: "100ms",
            }}
          >
            <span className="text-text-primary">Reporte</span>
            <br />
            <span className="text-text-primary">Ofertas de</span>
            <br />
            <span className="text-sena-green">Formacion</span>
          </h1>

          {/* Subtitle */}
          <div
            className="flex flex-col items-center gap-1.5 mb-12 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-[17px] font-medium text-text-secondary">
              {year - 4} &ndash; {year}
            </span>
            <span className="text-[14px] text-text-muted">
              SENA Regional Cauca
            </span>
          </div>

          {/* CTA — pill button, Apple-style */}
          <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <button
              onClick={() => navigate("/dashboard")}
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-text-primary text-bg-base font-medium text-[15px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(241,245,249,0.1)]"
            >
              Ingresar al Dashboard
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Date */}
          <p
            className="mt-8 text-[12px] text-text-muted animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            Actualizado:{" "}
            {new Date().toLocaleDateString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <div className="w-5 h-8 rounded-full border border-text-muted/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-text-muted/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══ Features — Full-bleed alternating sections ═══ */}
      <section className="relative">
        {/* Feature 1 */}
        <div className="min-h-[60vh] flex items-center px-6 py-20">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="w-10 h-10 rounded-lg bg-sena-green/10 flex items-center justify-center mb-6">
                <Upload className="w-5 h-5 text-sena-green" />
              </div>
              <h2
                className="text-text-primary mb-4"
                style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700 }}
              >
                Carga tu reporte
                <br />
                en un clic
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed max-w-md">
                Arrastra tu archivo Excel PE-04 y el sistema procesa automaticamente
                las 53 columnas del reporte. Sin configuracion, sin espera.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl bg-surface border border-border overflow-hidden flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-2xl bg-sena-green/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-7 h-7 text-sena-green" />
                  </div>
                  <p className="text-sm text-text-muted font-medium">Arrastra tu archivo .xlsx</p>
                  <p className="text-xs text-text-muted/60 mt-1">Reporte PE-04 del SENA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="min-h-[60vh] flex items-center px-6 py-20 border-t border-border">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-xl bg-surface border border-border overflow-hidden flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-2xl bg-sena-green/10 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-7 h-7 text-sena-green" />
                  </div>
                  <p className="text-sm text-text-muted font-medium">Graficas en tiempo real</p>
                  <p className="text-xs text-text-muted/60 mt-1">Analisis interactivo</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-10 h-10 rounded-lg bg-sena-green/10 flex items-center justify-center mb-6">
                <BarChart3 className="w-5 h-5 text-sena-green" />
              </div>
              <h2
                className="text-text-primary mb-4"
                style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700 }}
              >
                Visualiza cada
                <br />
                detalle
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed max-w-md">
                Graficas interactivas, mapa geografico, filtros dinamicos y tabla de datos.
                Todo lo que necesitas para analizar la oferta de formacion del Cauca.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="min-h-[50vh] flex items-center px-6 py-20 border-t border-border">
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="w-10 h-10 rounded-lg bg-sena-green/10 flex items-center justify-center mb-6">
                <Shield className="w-5 h-5 text-sena-green" />
              </div>
              <h2
                className="text-text-primary mb-4"
                style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700 }}
              >
                Datos seguros,
                <br />
                siempre disponibles
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed max-w-md">
                Exporta a Excel con un clic. Tus datos se procesan localmente
                y nunca salen de tu navegador.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl bg-surface border border-border overflow-hidden flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-2xl bg-sena-green/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-sena-green" />
                  </div>
                  <p className="text-sm text-text-muted font-medium">Procesamiento local</p>
                  <p className="text-xs text-text-muted/60 mt-1">Sin servidores externos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-border px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded overflow-hidden">
              <img src="/logoSena.png" alt="SENA" className="w-full h-full object-contain" />
            </div>
            <span className="text-[12px] font-medium text-text-muted">
              PE-04 v1.0 &middot; Regional Cauca
            </span>
          </div>
          <span className="text-[11px] text-text-muted/60">
            {year}
          </span>
        </div>
      </footer>
    </div>
  );
}
