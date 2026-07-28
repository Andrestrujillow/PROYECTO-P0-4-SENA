import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useDashboardStore } from "../../store/dashboardStore";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../utils/coordinates";
import { MapPinIcon } from "../icons/map-pin";

/* ── color tiers ── */
const tiers = [
  { min: 100, color: "#00843D", label: "100+" },   // SENA green
  { min: 20,  color: "#7C3AED", label: "20–99" },   // violet
  { min: 0,   color: "#F59E0B", label: "<20" },     // amber
] as const;

function getTier(c: number) {
  return tiers.find((t) => c >= t.min) ?? tiers[tiers.length - 1];
}

function getRadius(c: number) {
  if (c >= 100) return 18;
  if (c >= 50) return 14;
  if (c >= 20) return 11;
  if (c >= 10) return 8;
  return 6;
}

function getOpacity(c: number) {
  if (c >= 50) return 0.55;
  if (c >= 20) return 0.45;
  return 0.35;
}

/* ── auto-fit bounds when data changes ── */
function FitBounds({ puntos }: { puntos: { lat: number; lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (puntos.length === 0) return;
    const bounds = puntos.map((p) => [p.lat, p.lng] as [number, number]);
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 11 });
  }, [puntos, map]);
  return null;
}

export default function MapView() {
  const puntos = useDashboardStore((s) => s.puntosMapa);

  return (
    <div className="section-card overflow-hidden">
      {/* ── header ── */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sena-green/10 flex items-center justify-center">
            <MapPinIcon size={18} className="text-sena-green" />
          </div>
          <div>
            <h3 className="section-title">Distribucion Geografica</h3>
            <p className="chart-card-subtitle">
              {puntos.length} municipio{puntos.length !== 1 ? "s" : ""} con datos
            </p>
          </div>
        </div>

        {/* ── legend ── */}
        <div className="flex items-center gap-3 sm:gap-4">
          {tiers.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="rounded-full"
                style={{ width: 8, height: 8, background: color, opacity: 0.5 }}
              />
              <span className="text-[9px] sm:text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── map ── */}
      <div className="relative h-[250px] sm:h-[320px] lg:h-[420px]">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
          style={{ background: "#e8f0f6" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap &copy; CARTO"
          />
          <FitBounds puntos={puntos} />
          {puntos.map((p) => {
            const tier = getTier(p.cantidadFichas);
            return (
              <CircleMarker
                key={p.nombre}
                center={[p.lat, p.lng]}
                radius={getRadius(p.cantidadFichas)}
                pathOptions={{
                  color: tier.color,
                  fillColor: tier.color,
                  fillOpacity: getOpacity(p.cantidadFichas),
                  weight: 1.5,
                  className: "map-marker",
                }}
              >
                <Popup>
                  <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: "2px 0" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#e8e8e8" }}>
                      {p.nombre}
                    </div>
                    <div style={{ fontSize: 12, color: "#8a8a8a", lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 600, color: tier.color }}>{p.cantidadFichas}</span> fichas
                      <span style={{ margin: "0 6px", color: "#555555" }}>·</span>
                      <span style={{ fontWeight: 600, color: tier.color }}>
                        {p.cantidadAprendices.toLocaleString("es-CO")}
                      </span>{" "}
                      aprendices
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* ── total badge ── */}
        {puntos.length > 0 && (
          <div className="absolute bottom-3 right-3 z-[1000] bg-surface/95 backdrop-blur-sm border border-border rounded-xl px-3.5 py-2 shadow-sm">
            <span className="text-xs font-bold text-sena-green">{puntos.length}</span>
            <span className="text-xs text-text-muted ml-1">municipios</span>
          </div>
        )}
      </div>
    </div>
  );
}
