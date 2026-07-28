import type { Ficha } from "../../types";
import { groupSum, sortDesc } from "../shared/helpers";

export function aprendicesPorProgramaEspecial(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreProgramaEspecial || "Sin programa", (f) => f.totalAprendices));
}

export function horasPorProgramaEspecial(fichas: Ficha[], limit = 8) {
  return sortDesc(groupSum(fichas, (f) => f.nombreProgramaEspecial || "Sin programa", (f) => f.totalHoras), limit);
}

export function aprendicesPorCentroEspecial(fichas: Ficha[], limit = 8) {
  return sortDesc(groupSum(fichas, (f) => f.nombreCentro, (f) => f.totalAprendices), limit);
}

export function masMatriculados(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreProgramaEspecial || "Sin programa", (f) => f.totalAprendices));
}

export function masCertificados(fichas: Ficha[]) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    if (f.estadoCurso.toLowerCase().includes("terminad"))
      map.set(f.nombreProgramaEspecial || "Sin programa", (map.get(f.nombreProgramaEspecial || "Sin programa") || 0) + 1);
  });
  return sortDesc(map);
}

export function masActivosPorCentro(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreCentro, (f) => f.totalAprendicesActivos));
}

export function masOfertados(fichas: Ficha[]) {
  const map = new Map<string, number>();
  fichas.forEach((f) => map.set(f.nombreProgramaEspecial || "Sin programa", (map.get(f.nombreProgramaEspecial || "Sin programa") || 0) + 1));
  return sortDesc(map);
}
