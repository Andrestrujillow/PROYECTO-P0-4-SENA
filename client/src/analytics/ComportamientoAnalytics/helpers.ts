import type { Ficha } from "../../types";
import { extractYear } from "../shared/helpers";

export function filtrarFichasComportamiento(fichas: Ficha[], filtros: Record<string, string | undefined>): Ficha[] {
  return fichas.filter((f) => {
    if (filtros.sectorPrograma && f.nombreSectorPrograma !== filtros.sectorPrograma) return false;
    if (filtros.modalidadFormacion && f.modalidadFormacion !== filtros.modalidadFormacion) return false;
    if (filtros.nivelFormacion && f.nivelFormacion !== filtros.nivelFormacion) return false;
    if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
    if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
    if (filtros.programaEspecial && f.nombreProgramaEspecial !== filtros.programaEspecial) return false;
    if (filtros.anioTerminacion && extractYear(f.fechaTerminacionFicha) !== filtros.anioTerminacion) return false;
    return true;
  });
}
