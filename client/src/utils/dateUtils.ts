export function extractYear(fecha: string): string {
  return fecha.split("/")[2] || "";
}
