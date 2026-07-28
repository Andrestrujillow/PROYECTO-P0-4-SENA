import type { Ficha } from "../../types";
import { sumBy, uniqueCount, groupSum, sortDesc, extractYear } from "../shared/helpers";

export function calcularEstadisticasComportamiento(fichas: Ficha[]) {
  return {
    totalFichas: fichas.length,
    totalAprendices: sumBy(fichas, (f) => f.totalAprendices),
    totalActivos: sumBy(fichas, (f) => f.totalAprendicesActivos),
    desercion: sumBy(fichas, (f) => f.totalAprendices) ? Math.round(((sumBy(fichas, (f) => f.totalAprendices) - sumBy(fichas, (f) => f.totalAprendicesActivos)) / sumBy(fichas, (f) => f.totalAprendices)) * 100) : 0,
    totalCentros: uniqueCount(fichas, (f) => f.nombreCentro),
    totalProgramas: uniqueCount(fichas, (f) => f.nombreProgramaFormacion),
  };
}
