import type { Ficha } from "../../types";
import { uniqueSorted } from "../shared/helpers";

export function getFilterOptionsEspecial(fichas: Ficha[]) {
  return {
    anios: [...new Set(fichas.map((f) => f.fechaTerminacionFicha?.split("/")[2]).filter(Boolean))].sort((a, b) => b.localeCompare(a)),
    centros: uniqueSorted(fichas, (f) => f.nombreCentro),
    niveles: uniqueSorted(fichas, (f) => f.nivelFormacion),
    programas: uniqueSorted(fichas, (f) => f.nombreProgramaFormacion),
    empresas: uniqueSorted(fichas.filter((f) => f.nombreEmpresa), (f) => f.nombreEmpresa),
  };
}
