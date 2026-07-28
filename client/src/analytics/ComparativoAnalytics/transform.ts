import type { Ficha } from "../../types";

export function calcularEstadoColors(): Record<string, string> {
  return {
    "En ejecucion": "#34D399",
    "TERMINADO": "#60A5FA",
    "Terminada": "#A78BFA",
    "Terminada por fecha": "#FB923C",
  };
}
