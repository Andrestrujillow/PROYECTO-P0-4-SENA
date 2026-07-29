import type { Ficha } from "../../types";
import { uniqueSorted } from "../shared/helpers";

export function getFilterOptionsComportamiento(fichas: Ficha[]) {
  return {
    centros: uniqueSorted(fichas, (f) => f.nombreCentro),
    niveles: uniqueSorted(fichas, (f) => f.nivelFormacion),
    programas: uniqueSorted(fichas, (f) => f.nombreProgramaFormacion),
    sectores: uniqueSorted(fichas, (f) => f.nombreSectorPrograma),
    programasEspeciales: uniqueSorted(fichas, (f) => f.nombreProgramaEspecial),
    anios: [...new Set(fichas.map((f) => extractYear(f.fechaTerminacionFicha)).filter(Boolean))].sort((a, b) => b.localeCompare(a)),
    modalidades: uniqueSorted(fichas, (f) => f.modalidadFormacion),
  };
}

function extractYear(date: string): string {
  const parts = date?.split("/");
  return parts?.length === 3 ? parts[2] : "";
}
