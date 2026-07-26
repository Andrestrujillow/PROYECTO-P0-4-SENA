import type { Ficha, PuntoMapa } from "../types";
import { COORDINATES_CAUCA } from "./coordinates";

export function calcularPuntosMapa(fichas: Ficha[]): PuntoMapa[] {
  const map = new Map<string, { cantidadFichas: number; totalAprendices: number }>();

  fichas.forEach((f) => {
    const key = f.nombreMunicipioCurso.toUpperCase().trim();
    if (!key) return;
    const entry = map.get(key) || { cantidadFichas: 0, totalAprendices: 0 };
    entry.cantidadFichas += 1;
    entry.totalAprendices += f.totalAprendices;
    map.set(key, entry);
  });

  const puntos: PuntoMapa[] = [];
  map.forEach((val, nombre) => {
    const coords = COORDINATES_CAUCA[nombre];
    if (coords) {
      puntos.push({
        lat: coords.lat,
        lng: coords.lng,
        nombre,
        cantidadFichas: val.cantidadFichas,
        cantidadAprendices: val.totalAprendices,
      });
    }
  });

  return puntos;
}

export function getMarkerRadius(cantidadFichas: number): number {
  if (cantidadFichas >= 30) return 18;
  if (cantidadFichas >= 15) return 14;
  if (cantidadFichas >= 5) return 10;
  return 7;
}

export function getMarkerOpacity(cantidadFichas: number): number {
  if (cantidadFichas >= 30) return 0.9;
  if (cantidadFichas >= 15) return 0.75;
  if (cantidadFichas >= 5) return 0.6;
  return 0.45;
}

export function getMarkerColor(cantidadFichas: number): string {
  if (cantidadFichas >= 30) return "#16a34a";
  if (cantidadFichas >= 15) return "#7c3aed";
  return "#d97706";
}
