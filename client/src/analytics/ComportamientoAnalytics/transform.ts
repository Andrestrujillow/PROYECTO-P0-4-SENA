import type { Ficha } from "../../types";

export function desercionPorSector(fichas: Ficha[]) {
  const map = new Map<string, { inscritos: number; activos: number }>();
  fichas.forEach((f) => {
    const s = f.nombreSectorPrograma || "Sin sector";
    const e = map.get(s) || { inscritos: 0, activos: 0 };
    e.inscritos += f.totalAprendices; e.activos += f.totalAprendicesActivos;
    map.set(s, e);
  });
  return Array.from(map.entries()).map(([label, d]) => ({
    label,
    value: d.inscritos ? Math.round(((d.inscritos - d.activos) / d.inscritos) * 100) : 0,
  })).sort((a, b) => b.value - a.value);
}

export function tendenciaMensual(fichas: Ficha[]) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    const parts = f.fechaInicioFicha?.split("/");
    if (parts?.length !== 3) return;
    const key = `${parts[2]}-${parts[1].padStart(2, "0")}`;
    map.set(key, (map.get(key) || 0) + f.totalAprendices);
  });
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([label, value]) => ({ label, value }));
}
