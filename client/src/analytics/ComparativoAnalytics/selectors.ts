import type { Ficha } from "../../types";
import { calcularEstadisticasComparativo } from "./estadisticas";
import { horasPorEstado, horasPorSector, horasPorPrograma, masOfertados, menosOfertados, masCuposPorSector, masInscritosPorCentro } from "./charts";

export function useComparativoAnalytics(fichas: Ficha[]) {
  return {
    estadisticas: calcularEstadisticasComparativo(fichas),
    horasPorEstado: horasPorEstado(fichas),
    horasPorSector: horasPorSector(fichas),
    horasPorPrograma: horasPorPrograma(fichas),
    masOfertados: masOfertados(fichas),
    menosOfertados: menosOfertados(fichas),
    masCuposPorSector: masCuposPorSector(fichas),
    masInscritosPorCentro: masInscritosPorCentro(fichas),
  };
}
