import type { Ficha } from "../../types";
import { sumBy, uniqueCount } from "../shared/helpers";

export function calcularEstadisticasComparativo(fichas: Ficha[]) {
  return {
    totalFichas: fichas.length,
    totalAprendices: sumBy(fichas, (f) => f.totalAprendices),
    totalEmpresas: uniqueCount(fichas, (f) => f.nombreEmpresa),
    totalHoras: sumBy(fichas, (f) => f.totalHoras),
  };
}
