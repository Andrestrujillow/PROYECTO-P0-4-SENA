import type { Ficha } from "../../types";
import { sumBy, uniqueCount } from "../shared/helpers";

export function calcularEstadisticasEstrategias(fichas: Ficha[]) {
  return {
    totalFichas: fichas.length,
    totalAprendices: sumBy(fichas, (f) => f.totalAprendices),
    totalConvenios: uniqueCount(fichas.filter((f) => f.nombreConvenio?.trim()), (f) => f.nombreConvenio),
    totalCentros: uniqueCount(fichas, (f) => f.nombreCentro),
    totalMunicipios: uniqueCount(fichas, (f) => f.nombreMunicipioCurso),
    totalEmpresas: uniqueCount(fichas, (f) => f.nombreEmpresa),
  };
}
