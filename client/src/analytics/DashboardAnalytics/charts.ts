import type { Ficha } from "../../types";
import type { TendenciaItem } from "../shared/types";
import { groupSum, sortDesc, extractYear } from "../shared/helpers";

export function calcularTendencias(fichas: Ficha[]): TendenciaItem[] {
  const map = new Map<string, { inscritos: number; activos: number; desertados: number }>();
  fichas.forEach((f) => {
    const year = extractYear(f.fechaTerminacionFicha);
    if (!year) return;
    const cur = map.get(year) || { inscritos: 0, activos: 0, desertados: 0 };
    cur.inscritos += f.totalAprendices;
    cur.activos += f.totalAprendicesActivos;
    cur.desertados += Math.max(0, f.totalAprendices - f.totalAprendicesActivos);
    map.set(year, cur);
  });
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
    .map(([etiqueta, d]) => ({
      etiqueta, inscritos: d.inscritos, matriculados: d.inscritos,
      activos: d.activos, desertados: d.desertados,
      certificados: Math.round(d.activos * 0.7), porCertificar: Math.round(d.activos * 0.3),
    }));
}

export function calcularRankingProgramas(fichas: Ficha[], limit = 10) {
  return sortDesc(groupSum(fichas, (f) => f.nombreProgramaFormacion, (f) => f.totalAprendices), limit);
}

export function calcularRankingCentros(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreCentro, (f) => f.totalAprendices));
}

export function calcularRankingEmpresas(fichas: Ficha[], limit = 10) {
  return sortDesc(groupSum(fichas.filter((f) => f.nombreEmpresa), (f) => f.nombreEmpresa, (f) => f.totalAprendices), limit);
}

export function calcularRankingSectores(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreSectorPrograma || "Sin sector", (f) => f.totalAprendices));
}
