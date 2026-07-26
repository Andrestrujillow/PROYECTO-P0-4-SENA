export function agruparPor<T>(items: T[], key: (item: T) => string): { label: string; value: number }[] {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const k = key(item);
    if (k) map.set(k, (map.get(k) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export function agruparSuma<T>(
  items: T[],
  key: (item: T) => string,
  sum: (item: T) => number
): { label: string; value: number }[] {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const k = key(item);
    if (k) map.set(k, (map.get(k) || 0) + sum(item));
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export function uniqueSortedByCount<T>(
  items: T[],
  extractor: (item: T) => string
): string[] {
  const countMap = new Map<string, number>();
  items.forEach((item) => {
    const val = extractor(item);
    if (val) countMap.set(val, (countMap.get(val) || 0) + 1);
  });
  return Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([val]) => val);
}
