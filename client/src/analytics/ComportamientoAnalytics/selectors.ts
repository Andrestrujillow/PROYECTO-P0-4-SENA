import type { Ficha } from "../../types";
import { calcularEstadisticasComportamiento } from "./estadisticas";
import { calcularCrecimiento, calcularProgramasCriticos, calcularCrecimientoProgramas, calcularCentrosDestacados } from "./charts";

export function useComportamientoAnalytics(fichas: Ficha[]) {
  return {
    estadisticas: calcularEstadisticasComportamiento(fichas),
    crecimiento: calcularCrecimiento(fichas),
    programasCriticos: calcularProgramasCriticos(fichas),
    crecimientoProgramas: calcularCrecimientoProgramas(fichas),
    centrosDestacados: calcularCentrosDestacados(fichas),
  };
}
