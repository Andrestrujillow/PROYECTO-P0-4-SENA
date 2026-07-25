import { useMemo } from "react";
import type { Ficha } from "../types";

function uniqueSortedByCount(
  fichas: Ficha[],
  extractor: (f: Ficha) => string
): { value: string; count: number }[] {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    const val = extractor(f);
    if (val) map.set(val, (map.get(val) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

export function useFilteredData(fichas: Ficha[]) {
  return useMemo(() => {
    const centros = uniqueSortedByCount(fichas, (f) => f.nombreCentro);
    const modalidades = uniqueSortedByCount(fichas, (f) => f.modalidadFormacion);
    const niveles = uniqueSortedByCount(fichas, (f) => f.nivelFormacion);
    const programas = uniqueSortedByCount(fichas, (f) => f.nombreProgramaFormacion);
    const empresas = uniqueSortedByCount(fichas, (f) => f.nombreEmpresa);
    const municipios = uniqueSortedByCount(fichas, (f) => f.nombreMunicipioCurso);
    const programasEspeciales = uniqueSortedByCount(fichas, (f) => f.nombreProgramaEspecial);
    const estados = uniqueSortedByCount(fichas, (f) => f.estadoCurso);
    const etapas = uniqueSortedByCount(fichas, (f) => f.etapaFicha);
    const jornadas = uniqueSortedByCount(fichas, (f) => f.nombreJornada);
    const sectores = uniqueSortedByCount(fichas, (f) => f.nombreSectorPrograma);
    const instructores = uniqueSortedByCount(fichas, (f) => f.nombreResponsable);

    const anios = [
      ...new Set(
        fichas
          .map((f) => f.fechaTerminacionFicha.split("/")[2])
          .filter(Boolean)
      ),
    ].sort((a, b) => b.localeCompare(a));

    return {
      centros,
      modalidades,
      niveles,
      programas,
      empresas,
      municipios,
      programasEspeciales,
      estados,
      etapas,
      jornadas,
      sectores,
      instructores,
      anios,
    };
  }, [fichas]);
}
