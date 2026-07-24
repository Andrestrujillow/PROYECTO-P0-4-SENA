import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import type { Ficha } from "../../types";
import { COORDINATES_CAUCA, DEFAULT_CENTER, DEFAULT_ZOOM } from "../../utils/coordinates";

interface Props {
  fichas: Ficha[];
}

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

export default function StrategiesMap({ fichas }: Props) {
  const puntos = useMemo(() => {
    const map = new Map<string, { cantidadFichas: number; totalAprendices: number }>();
    fichas.forEach((f) => {
      const key = f.nombreMunicipioCurso.toUpperCase().trim();
      if (!key) return;
      const entry = map.get(key) || { cantidadFichas: 0, totalAprendices: 0 };
      entry.cantidadFichas += 1;
      entry.totalAprendices += f.totalAprendices;
      map.set(key, entry);
    });
    const result: { lat: number; lng: number; nombre: string; cantidadFichas: number; cantidadAprendices: number }[] = [];
    map.forEach((val, nombre) => {
      const coords = COORDINATES_CAUCA[nombre];
      if (coords) {
        result.push({ lat: coords.lat, lng: coords.lng, nombre, cantidadFichas: val.cantidadFichas, cantidadAprendices: val.totalAprendices });
      }
    });
    return result;
  }, [fichas]);

  return (
    <div className="card map-card chart-accent-purple">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-purple-400/10 border border-purple-400/10">
            <MapPin className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="chart-card-title">Distribución por Subregiones</h3>
            <p className="text-[9px] text-sena-gray/40 mt-0.5">{puntos.length} municipios con datos</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[{ size: 7, label: "<10" }, { size: 13, label: "20+" }, { size: 22, label: "100+" }].map(({ size, label }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="rounded-full bg-purple-400/40 border border-purple-400/30" style={{ width: size * 0.7, height: size * 0.7 }} />
              <span className="text-[8px] text-sena-gray/30">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="map-body">
        <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} className="h-full w-full" zoomControl={false} attributionControl={false}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {puntos.map((p) => (
            <CircleMarker key={p.nombre} center={[p.lat, p.lng]} radius={getRadius(p.cantidadFichas)}
              pathOptions={{ color: "#A855F7", fillColor: "#A855F7", fillOpacity: getOpacity(p.cantidadFichas), weight: 2 }}>
              <Popup>
                <div className="text-[13px] font-bold mb-1">{p.nombre}</div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span><span className="font-semibold">{p.cantidadFichas}</span> fichas</span>
                  <span><span className="font-semibold" style={{ color: "#A855F7" }}>{p.cantidadAprendices.toLocaleString("es-CO")}</span> aprendices</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
