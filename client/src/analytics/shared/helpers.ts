import type { Ficha } from "../../types";

export function sumBy<T>(items: T[], fn: (item: T) => number): number {
  return items.reduce((acc, item) => acc + fn(item), 0);
}

export function uniqueCount<T>(items: T[], fn: (item: T) => string): number {
  return new Set(items.map(fn).filter(Boolean)).size;
}

export function groupBy<T>(items: T[], keyFn: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  items.forEach((item) => {
    const key = keyFn(item);
    if (!key) return;
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
  });
  return map;
}

export function groupSum<T>(items: T[], keyFn: (item: T) => string, valFn: (item: T) => number): Map<string, number> {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const key = keyFn(item);
    if (!key) return;
    map.set(key, (map.get(key) || 0) + valFn(item));
  });
  return map;
}

export function sortDesc(map: Map<string, number>, limit?: number): { label: string; value: number }[] {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit ?? map.size)
    .map(([label, value]) => ({ label, value }));
}

export function sortAsc(map: Map<string, number>, limit?: number): { label: string; value: number }[] {
  return Array.from(map.entries())
    .sort((a, b) => a[1] - b[1])
    .slice(0, limit ?? map.size)
    .map(([label, value]) => ({ label, value }));
}

export function extractYear(fecha: string): string {
  const parts = fecha?.split("/");
  return parts?.length === 3 ? parts[2] : "";
}

export function uniqueSorted(fichas: Ficha[], fn: (f: Ficha) => string): string[] {
  return [...new Set(fichas.map(fn).filter(Boolean))].sort();
}
