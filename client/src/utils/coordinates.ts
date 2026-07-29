// Municipios del Cauca con coordenadas aproximadas
const RAW: Record<string, { lat: number; lng: number }> = {
  "POPAYAN": { lat: 2.4448, lng: -76.6147 },
  "SANTANDER DE QUILICHAO": { lat: 2.9594, lng: -76.6528 },
  "CALDONO": { lat: 2.7969, lng: -76.4853 },
  "TORIBIO": { lat: 2.9906, lng: -76.1358 },
  "SILVIA": { lat: 2.6369, lng: -76.3800 },
  "MORALES": { lat: 2.7608, lng: -76.6375 },
  "CORINTO": { lat: 3.1733, lng: -76.2600 },
  "MIRANDA": { lat: 3.2500, lng: -76.2392 },
  "EL TAMBO": { lat: 2.4500, lng: -76.8100 },
  "GUAPI": { lat: 2.5711, lng: -77.8894 },
  "PATIA (EL BORDO)": { lat: 2.1833, lng: -76.9833 },
  "FLORENCIA": { lat: 2.9600, lng: -76.8167 },
  "BOLIVAR": { lat: 2.4333, lng: -76.7833 },
  "LA SIERRA": { lat: 2.4833, lng: -76.7667 },
  "PIENDAMO": { lat: 2.6400, lng: -76.5300 },
  "CAJIBIO": { lat: 2.6167, lng: -76.6000 },
  "LA VEGA": { lat: 2.0167, lng: -76.7833 },
  "TIMBIO": { lat: 2.3500, lng: -76.6833 },
  "PURACE (COCONUCO)": { lat: 2.4333, lng: -76.5000 },
  "SANTA ROSA": { lat: 1.7833, lng: -76.7500 },
  "ARGELIA": { lat: 2.5000, lng: -77.0833 },
  "PIAMONTE": { lat: 2.1500, lng: -77.1000 },
  "INZA": { lat: 2.5500, lng: -76.0667 },
  "MERCADERES": { lat: 2.0333, lng: -77.1667 },
  "BALBOA": { lat: 2.0500, lng: -77.2000 },
  "ROSAS": { lat: 1.7500, lng: -76.7333 },
  "VILLA RICA": { lat: 2.7167, lng: -76.4833 },
  "TOTORO": { lat: 2.4833, lng: -76.5333 },
  "SUAREZ": { lat: 2.9500, lng: -76.6833 },
  "ALMAGUER": { lat: 1.9167, lng: -76.8500 },
  "BUENOS AIRES": { lat: 3.0167, lng: -76.6500 },
  "EL PAUJIL": { lat: 1.5000, lng: -76.4167 },
  "JAMBALO": { lat: 2.7833, lng: -76.3167 },
  "LOPEZ DE MICAY": { lat: 2.8833, lng: -76.6333 },
  "PADILLA": { lat: 2.4000, lng: -76.8000 },
  "PAEZ (BELALCAZAR)": { lat: 2.6500, lng: -76.0833 },
  "PUERTO TEJADA": { lat: 3.2333, lng: -76.4167 },
  "SAN SEBASTIAN": { lat: 1.8333, lng: -76.7667 },
  "SOTARA (PAISPAMBA)": { lat: 2.2500, lng: -76.6000 },
  "SUCRE": { lat: 2.0333, lng: -76.9167 },
  "TIMBIQUI": { lat: 2.7833, lng: -77.6667 },
};

// Normaliza acentos y diacríticos para búsqueda insensible
function normalize(name: string): string {
  return name
    .toUpperCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Mapa de búsqueda: clave normalizada + alias comunes → coordenadas
const lookup: Record<string, { lat: number; lng: number }> = {};

for (const [key, coords] of Object.entries(RAW)) {
  const nk = normalize(key);
  lookup[nk] = coords;
  const parenIdx = key.indexOf("(");
  if (parenIdx !== -1) {
    const sinParen = normalize(key.substring(0, parenIdx));
    lookup[sinParen] = coords;
    const m = key.match(/\(([^)]+)\)/);
    if (m) {
      lookup[normalize(m[1])] = coords;
    }
  }
}

export function getCoords(name: string): { lat: number; lng: number } | null {
  return lookup[normalize(name)] ?? null;
}

export const COORDINATES_CAUCA = RAW;
export const DEFAULT_CENTER: [number, number] = [2.4448, -76.6147];
export const DEFAULT_ZOOM = 10;
