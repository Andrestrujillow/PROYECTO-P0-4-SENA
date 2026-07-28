import type { Ficha } from "../../types";

export function filtrarFichasComparativo(fichas: Ficha[], filtros: Record<string, string | undefined>): Ficha[] {
  return fichas.filter((f) => {
    if (filtros.anioTerminacion) { const y = f.fechaTerminacionFicha?.split("/")[2]; if (y !== filtros.anioTerminacion) return false; }
    if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
    if (filtros.nivelFormacion && f.nivelFormacion !== filtros.nivelFormacion) return false;
    if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
    if (filtros.sectorPrograma && f.nombreSectorPrograma !== filtros.sectorPrograma) return false;
    if (filtros.municipio && f.nombreMunicipioCurso !== filtros.municipio) return false;
    return true;
  });
}
