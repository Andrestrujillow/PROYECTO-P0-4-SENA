import type { Ficha } from "../../types";

export function estadosPorProgramaEspecial(fichas: Ficha[]) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    const key = f.estadoCurso || "Sin dato";
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
}
