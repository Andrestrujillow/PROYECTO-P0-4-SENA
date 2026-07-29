import type { Ficha, Filtros } from "../../types";
import { extractYear } from "./helpers";

export function filtrarFichas(fichas: Ficha[], filtros: Filtros): Ficha[] {
  return fichas.filter((f) => {
    if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
    if (filtros.modalidadFormacion && f.modalidadFormacion !== filtros.modalidadFormacion) return false;
    if (filtros.nivelFormacion && f.nivelFormacion !== filtros.nivelFormacion) return false;
    if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
    if (filtros.empresa && f.nombreEmpresa !== filtros.empresa) return false;
    if (filtros.municipio && f.nombreMunicipioCurso !== filtros.municipio) return false;
    if (filtros.programaEspecial && f.nombreProgramaEspecial !== filtros.programaEspecial) return false;
    if (filtros.estadoCurso && f.estadoCurso !== filtros.estadoCurso) return false;
    if (filtros.etapaFicha && f.etapaFicha !== filtros.etapaFicha) return false;
    if (filtros.jornada && f.nombreJornada !== filtros.jornada) return false;
    if (filtros.sectorPrograma && f.nombreSectorPrograma !== filtros.sectorPrograma) return false;
    if (filtros.instructor && f.nombreResponsable !== filtros.instructor) return false;
    if (filtros.convenio && f.nombreConvenio !== filtros.convenio) return false;
    if (filtros.tipoFormacion && f.tipoFormacion !== filtros.tipoFormacion) return false;
    if (filtros.anioTerminacion && extractYear(f.fechaTerminacionFicha) !== filtros.anioTerminacion) return false;
    return true;
  });
}

export function getFiltrosActivos(filtros: Filtros): number {
  return Object.values(filtros).filter(Boolean).length;
}
