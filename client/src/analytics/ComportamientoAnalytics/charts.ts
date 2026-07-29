import type { Ficha } from "../../types";
import { groupSum, sortDesc, extractYear } from "../shared/helpers";

export function calcularCrecimiento(fichas: Ficha[]): { prev: number; curr: number; pct: number } | null {
  const map = new Map<string, number>();
  fichas.forEach((f) => { const y = extractYear(f.fechaTerminacionFicha); if (y) map.set(y, (map.get(y) || 0) + f.totalAprendices); });
  const sorted = Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  if (sorted.length < 2) return null;
  const prev = sorted[sorted.length - 2][1], curr = sorted[sorted.length - 1][1];
  return prev ? { prev, curr, pct: Math.round(((curr - prev) / prev) * 100) } : null;
}

export function calcularProgramasCriticos(fichas: Ficha[]) {
  const map = new Map<string, { inscritos: number; activos: number }>();
  fichas.forEach((f) => {
    const e = map.get(f.nombreProgramaFormacion) || { inscritos: 0, activos: 0 };
    e.inscritos += f.totalAprendices; e.activos += f.totalAprendicesActivos;
    map.set(f.nombreProgramaFormacion, e);
  });
  return Array.from(map.entries()).map(([prog, d]) => ({ prog, desercion: d.inscritos ? Math.round(((d.inscritos - d.activos) / d.inscritos) * 100) : 0 }))
    .sort((a, b) => b.desercion - a.desercion).slice(0, 10);
}

export function calcularCrecimientoProgramas(fichas: Ficha[]) {
  const map = new Map<string, Map<string, number>>();
  fichas.forEach((f) => {
    const y = extractYear(f.fechaTerminacionFicha); if (!y) return;
    if (!map.has(f.nombreProgramaFormacion)) map.set(f.nombreProgramaFormacion, new Map());
    const inner = map.get(f.nombreProgramaFormacion)!;
    inner.set(y, (inner.get(y) || 0) + f.totalAprendices);
  });
  const result: { label: string; value: number }[] = [];
  map.forEach((val, prog) => {
    const sorted = Array.from(val.entries()).sort(([a], [b]) => a.localeCompare(b));
    if (sorted.length < 2) return;
    const prev = sorted[sorted.length - 2][1], curr = sorted[sorted.length - 1][1];
    if (prev) result.push({ label: prog, value: Math.round(((curr - prev) / prev) * 100) });
  });
  return result.sort((a, b) => b.value - a.value).slice(0, 10);
}

export function calcularCentrosDestacados(fichas: Ficha[]) {
  return sortDesc(groupSum(fichas, (f) => f.nombreCentro, (f) => f.totalAprendicesActivos));
}
