import type { Ficha } from "../../types";

export function filtrarFichasEstrategias(fichas: Ficha[], filtros: Record<string, string | undefined>): Ficha[] {
  return fichas.filter((f) => {
    if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
    if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
    if (filtros.programaEspecial && f.nombreProgramaEspecial !== filtros.programaEspecial) return false;
    if (filtros.municipio && f.nombreMunicipioCurso !== filtros.municipio) return false;
    return true;
  });
}
