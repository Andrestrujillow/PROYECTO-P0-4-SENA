import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDashboardStore } from "../../store/dashboardStore";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../utils/coordinates";

function getRadius(c: number) {
  if (c >= 100) return 16;
  if (c >= 50) return 13;
  if (c >= 20) return 10;
  if (c >= 10) return 8;
  return 6;
}

function getOpacity(c: number) {
  if (c >= 50) return 0.85;
  if (c >= 20) return 0.7;
  return 0.55;
}

export default function MapView() {
  const puntos = useDashboardStore((s) => s.puntosMapa);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-600">Distribución Geográfica</h3>
        <div className="flex items-center gap-2">
          {[
            { size: 6, label: "<10" },
            { size: 10, label: "20+" },
            { size: 16, label: "100+" },
          ].map(({ size, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="rounded-full bg-blue-400/40 border border-blue-400/30"
                style={{ width: size, height: size }} />
              <span className="text-[8px] text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[180px] rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          {puntos.map((p) => (
            <CircleMarker
              key={p.nombre}
              center={[p.lat, p.lng]}
              radius={getRadius(p.cantidadFichas)}
              pathOptions={{
                color: "#3B82F6",
                fillColor: "#3B82F6",
                fillOpacity: getOpacity(p.cantidadFichas),
                weight: 1.5,
              }}
            >
              <Popup>
                <div className="text-[10px] font-semibold text-gray-800">{p.nombre}</div>
                <div className="text-[9px] text-gray-500">
                  {p.cantidadFichas} fichas · {p.cantidadAprendices.toLocaleString("es-CO")} ap.
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
