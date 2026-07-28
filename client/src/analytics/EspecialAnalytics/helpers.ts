import type { Ficha } from "../../types";
import { extractYear } from "../shared/helpers";

export function filtrarFichasEspecial(fichas: Ficha[], filtros: Record<string, string | undefined>): Ficha[] {
  const base = fichas.filter((f) => f.nombreProgramaEspecial && f.nombreProgramaEspecial.trim() !== "");
  return base.filter((f) => {
    if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
    if (filtros.anioTerminacion && extractYear(f.fechaTerminacionFicha) !== filtros.anioTerminacion) return false;
    if (filtros.nivelFormacion && f.nivelFormacion !== filtros.nivelFormacion) return false;
    if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
    if (filtros.empresa && f.nombreEmpresa !== filtros.empresa) return false;
    return true;
  });
}
