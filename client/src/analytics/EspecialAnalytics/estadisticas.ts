import type { Ficha } from "../../types";
import { sumBy, uniqueCount } from "../shared/helpers";

export function calcularEstadisticasEspecial(fichas: Ficha[]) {
  return {
    fichasEspeciales: fichas.length,
    totalAprendices: sumBy(fichas, (f) => f.totalAprendices),
    totalCentros: uniqueCount(fichas, (f) => f.nombreCentro),
    totalEmpresas: uniqueCount(fichas, (f) => f.nombreEmpresa),
    totalMunicipios: uniqueCount(fichas, (f) => f.nombreMunicipioCurso),
    totalHoras: sumBy(fichas, (f) => f.totalHoras),
  };
}
