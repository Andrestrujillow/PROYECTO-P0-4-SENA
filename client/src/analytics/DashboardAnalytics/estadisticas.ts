import type { Ficha } from "../../types";
import type { IndicadorItem } from "../shared/types";
import { sumBy, uniqueCount } from "../shared/helpers";

export function calcularEstadisticas(fichas: Ficha[]) {
  return {
    totalFichas: fichas.length,
    totalAprendices: sumBy(fichas, (f) => f.totalAprendices),
    totalCentros: uniqueCount(fichas, (f) => f.nombreCentro),
    totalEmpresas: uniqueCount(fichas, (f) => f.nombreEmpresa),
    totalInstructores: uniqueCount(fichas, (f) => f.nombreResponsable),
    promedioAprendicesPorFicha: fichas.length ? Math.round(sumBy(fichas, (f) => f.totalAprendices) / fichas.length) : 0,
  };
}

export function calcularEstadisticasDetalladas(fichas: Ficha[]) {
  const activos = sumBy(fichas, (f) => f.totalAprendicesActivos);
  const terminadas = fichas.filter((f) => f.estadoCurso.toLowerCase().includes("terminad"));
  return {
    totalProgramas: uniqueCount(fichas, (f) => f.nombreProgramaFormacion),
    totalMunicipios: uniqueCount(fichas, (f) => f.nombreMunicipioCurso),
    totalHoras: sumBy(fichas, (f) => f.totalHoras),
    totalActivos: activos,
    totalCertificados: terminadas.length,
    totalInstructores: uniqueCount(fichas, (f) => f.nombreResponsable),
    crecimientoAnual: 0,
  };
}

export function calcularIndicadores(fichas: Ficha[]): IndicadorItem[] {
  const total = sumBy(fichas, (f) => f.totalAprendices);
  const activos = sumBy(fichas, (f) => f.totalAprendicesActivos);
  const terminadas = fichas.filter((f) => f.estadoCurso.toLowerCase().includes("terminad"));
  const ocupacion = total ? Math.round((activos / total) * 100) : 0;
  const desercion = total ? Math.round(((total - activos) / total) * 100) : 0;
  const certificacion = fichas.length ? Math.round((terminadas.length / fichas.length) * 100) : 0;
  return [
    { nombre: "Ocupacion", valor: ocupacion, unidad: "%", descripcion: "Tasa de ocupacion de aprendices", color: "blue" },
    { nombre: "Certificacion", valor: certificacion, unidad: "%", descripcion: "Fichas terminadas vs total", color: "green" },
    { nombre: "Desercion", valor: desercion, unidad: "%", descripcion: "Tasa de desercion de aprendices", color: "rose" },
    { nombre: "Cumplimiento", valor: Math.round((ocupacion + certificacion) / 2), unidad: "%", descripcion: "Indice de cumplimiento general", color: "purple" },
  ];
}
