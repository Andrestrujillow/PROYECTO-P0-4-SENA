import type { Ficha } from "../../types";
import { groupSum, sortDesc } from "../shared/helpers";

export function conveniosPorParticipacion(fichas: Ficha[]) {
  return sortDesc(
    groupSum(fichas.filter((f) => f.nombreConvenio?.trim()), (f) => f.nombreConvenio, (f) => f.totalAprendices)
  );
}

export function horasPorConvenio(fichas: Ficha[], limit = 8) {
  return sortDesc(
    groupSum(fichas.filter((f) => f.nombreConvenio?.trim()), (f) => f.nombreConvenio, (f) => f.totalHoras),
    limit
  );
}

export function aprendicesPorNivel(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nivelFormacion, (f) => f.totalAprendices));
}

export function centrosConConvenios(fichas: Ficha[]) {
  return sortDesc(
    groupSum(fichas.filter((f) => f.nombreConvenio?.trim()), (f) => f.nombreCentro, (f) => f.totalAprendices)
  );
}

export function topConvenios(fichas: Ficha[], limit = 10) {
  return sortDesc(
    groupSum(fichas.filter((f) => f.nombreConvenio?.trim()), (f) => f.nombreConvenio, (f) => f.totalAprendices),
    limit
  );
}

export function topEmpresas(fichas: Ficha[], limit = 10) {
  return sortDesc(
    groupSum(fichas.filter((f) => f.nombreEmpresa), (f) => f.nombreEmpresa, (f) => f.totalAprendices),
    limit
  );
}

export function topProgramas(fichas: Ficha[], limit = 10) {
  return sortDesc(
    groupSum(fichas, (f) => f.nombreProgramaFormacion, (f) => f.totalAprendices),
    limit
  );
}

export function conveniosPorMunicipio(fichas: Ficha[]) {
  const map = new Map<string, Map<string, number>>();
  const allConvenios = new Set<string>();
  fichas.forEach((f) => {
    const conv = f.nombreConvenio || "Sin convenio";
    const muni = f.nombreMunicipioCurso || "Sin municipio";
    allConvenios.add(conv);
    if (!map.has(muni)) map.set(muni, new Map());
    const inner = map.get(muni)!;
    inner.set(conv, (inner.get(conv) || 0) + f.totalAprendices);
  });
  return {
    municipalities: Array.from(map.keys()).slice(0, 10).sort(),
    allConvenios: Array.from(allConvenios).sort(),
    map,
  };
}
