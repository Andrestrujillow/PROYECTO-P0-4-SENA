import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../utils/coordinates";

function getRadius(cantidad: number): number {
  if (cantidad >= 100) return 22;
  if (cantidad >= 50) return 17;
  if (cantidad >= 20) return 13;
  if (cantidad >= 10) return 10;
  return 7;
}

function getOpacity(cantidad: number): number {
  if (cantidad >= 50) return 0.85;
  if (cantidad >= 20) return 0.7;
  return 0.55;
}

export default function MapView() {
  const puntos = useDashboardStore((s) => s.puntosMapa);

  return (
    <div className="card map-card chart-accent-green">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-green/10 border border-sena-green/10">
            <MapPin className="w-4 h-4 text-sena-green" />
          </div>
          <div>
            <h3 className="chart-card-title">Distribución Geográfica</h3>
            <p className="text-[9px] text-sena-gray/40 mt-0.5">
              {puntos.length} municipios con datos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[
            { size: 7, label: "<10" },
            { size: 13, label: "20+" },
            { size: 22, label: "100+" },
          ].map(({ size, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div
                className="rounded-full bg-sena-green/40 border border-sena-green/30"
                style={{ width: size * 0.7, height: size * 0.7 }}
              />
              <span className="text-[8px] text-sena-gray/30">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="map-body">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {puntos.map((p) => (
            <CircleMarker
              key={p.nombre}
              center={[p.lat, p.lng]}
              radius={getRadius(p.cantidadFichas)}
              pathOptions={{
                color: "#00843D",
                fillColor: "#00843D",
                fillOpacity: getOpacity(p.cantidadFichas),
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-[13px] font-bold text-sena-white mb-1">
                  {p.nombre}
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-sena-gray/60">
                    <span className="font-semibold text-sena-white/80">{p.cantidadFichas}</span> fichas
                  </span>
                  <span className="text-sena-gray/60">
                    <span className="font-semibold text-sena-green">{p.cantidadAprendices.toLocaleString("es-CO")}</span> aprendices
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
