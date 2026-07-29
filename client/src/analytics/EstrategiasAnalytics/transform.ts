import type { Ficha } from "../../types";

export function participacionPorConvenio(fichas: Ficha[]) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    if (f.nombreConvenio?.trim()) map.set(f.nombreConvenio, (map.get(f.nombreConvenio) || 0) + f.totalAprendices);
  });
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }));
}

export function participacionPorMunicipio(fichas: Ficha[]) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    if (f.nombreConvenio?.trim()) map.set(f.nombreMunicipioCurso, (map.get(f.nombreMunicipioCurso) || 0) + f.totalAprendices);
  });
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).map(([label, value]) => ({ label, value }));
}
