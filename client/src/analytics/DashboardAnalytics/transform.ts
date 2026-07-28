import type { Ficha } from "../../types";
import type { GrupoItem } from "../shared/types";
import { groupSum, sortDesc, groupBy } from "../shared/helpers";

export function fichasPorNivel(fichas: Ficha[]): GrupoItem[] {
  const map = new Map<string, number>();
  fichas.forEach((f) => map.set(f.nivelFormacion, (map.get(f.nivelFormacion) || 0) + 1));
  return sortDesc(map);
}

export function aprendicesPorModalidad(fichas: Ficha[]): GrupoItem[] {
  return sortDesc(groupSum(fichas, (f) => f.modalidadFormacion, (f) => f.totalAprendices));
}

export function aprendicesPorCentro(fichas: Ficha[]): GrupoItem[] {
  return sortDesc(groupSum(fichas, (f) => f.nombreCentro, (f) => f.totalAprendices));
}

export function fichasPorEstado(fichas: Ficha[]): GrupoItem[] {
  const map = new Map<string, number>();
  fichas.forEach((f) => map.set(f.estadoCurso, (map.get(f.estadoCurso) || 0) + 1));
  return sortDesc(map);
}

export function equidadGenero(fichas: Ficha[]) {
  const masc = fichas.reduce((s, f) => s + f.totalAprendicesMasculinos, 0);
  const fem = fichas.reduce((s, f) => s + f.totalAprendicesFemeninos, 0);
  const nb = fichas.reduce((s, f) => s + f.totalAprendicesNoBinario, 0);
  return [
    { label: "Masculino", value: masc },
    { label: "Femenino", value: fem },
    { label: "No binario", value: nb },
  ];
}

export function horasPorTipo(fichas: Ficha[]) {
  return [
    { label: "Planta", value: fichas.reduce((s, f) => s + f.horasPlanta, 0) },
    { label: "Contratistas", value: fichas.reduce((s, f) => s + f.horasContratistas, 0) },
    { label: "Contratistas Externos", value: fichas.reduce((s, f) => s + f.horasContratistasExternos, 0) },
    { label: "Monitores", value: fichas.reduce((s, f) => s + f.horasMonitores, 0) },
    { label: "Inst. Empresa", value: fichas.reduce((s, f) => s + f.horasInstEmpresa, 0) },
  ];
}

export function aprendicesPorMunicipio(fichas: Ficha[]): GrupoItem[] {
  return sortDesc(groupSum(fichas, (f) => f.nombreMunicipioCurso, (f) => f.totalAprendices));
}

export function aprendicesPorGenero(fichas: Ficha[]): GrupoItem[] {
  return [
    { label: "Masculino", value: fichas.reduce((s, f) => s + f.totalAprendicesMasculinos, 0) },
    { label: "Femenino", value: fichas.reduce((s, f) => s + f.totalAprendicesFemeninos, 0) },
    { label: "No binario", value: fichas.reduce((s, f) => s + f.totalAprendicesNoBinario, 0) },
  ];
}

export function aprendicesPorProgramaEspecial(fichas: Ficha[]): GrupoItem[] {
  return sortDesc(
    groupSum(fichas.filter((f) => f.nombreProgramaEspecial), (f) => f.nombreProgramaEspecial, (f) => f.totalAprendices)
  );
}
