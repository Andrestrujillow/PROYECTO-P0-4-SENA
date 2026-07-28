import type { Ficha } from "../../types";
import { uniqueSorted } from "../shared/helpers";

export function getFilterOptionsEstrategias(fichas: Ficha[]) {
  return {
    centros: uniqueSorted(fichas, (f) => f.nombreCentro),
    programas: uniqueSorted(fichas, (f) => f.nombreProgramaFormacion),
    programasEspeciales: uniqueSorted(fichas, (f) => f.nombreProgramaEspecial),
    municipios: uniqueSorted(fichas, (f) => f.nombreMunicipioCurso),
  };
}
