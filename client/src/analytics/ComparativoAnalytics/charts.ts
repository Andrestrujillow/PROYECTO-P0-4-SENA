import type { Ficha } from "../../types";
import { groupSum, sortDesc, sortAsc } from "../shared/helpers";

export function horasPorEstado(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.estadoCurso, (f) => f.totalHoras));
}

export function horasPorSector(fichas: Ficha[]) {
  const map = new Map<string, Map<string, number>>();
  fichas.forEach((f) => {
    const sector = f.nombreSectorPrograma || "Sin sector";
    if (!map.has(sector)) map.set(sector, new Map());
    const inner = map.get(sector)!;
    inner.set(f.estadoCurso, (inner.get(f.estadoCurso) || 0) + f.totalHoras);
  });
  const sectores = Array.from(map.keys()).sort();
  const estados = [...new Set(fichas.map((f) => f.estadoCurso))].sort();
  return { sectores, estados, map };
}

export function horasPorPrograma(fichas: Ficha[], limit = 8) {
  return sortDesc(groupSum(fichas, (f) => f.nombreProgramaFormacion, (f) => f.totalHoras), limit);
}

export function masOfertados(fichas: Ficha[], limit = 10) {
  const map = new Map<string, number>();
  fichas.forEach((f) => map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + 1));
  return sortDesc(map, limit);
}

export function menosOfertados(fichas: Ficha[], limit = 10) {
  const map = new Map<string, number>();
  fichas.forEach((f) => map.set(f.nombreProgramaFormacion, (map.get(f.nombreProgramaFormacion) || 0) + 1));
  return sortAsc(map, limit);
}

export function masCuposPorSector(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreSectorPrograma || "Sin sector", (f) => f.totalAprendices));
}

export function masInscritosPorCentro(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreCentro, (f) => f.totalAprendices));
}
