import type { Ficha } from "../../types";
import { calcularEstadisticasEspecial } from "./estadisticas";
import { aprendicesPorProgramaEspecial, horasPorProgramaEspecial, aprendicesPorCentroEspecial, masMatriculados, masCertificados, masActivosPorCentro, masOfertados } from "./charts";

export function useEspecialAnalytics(fichas: Ficha[]) {
  return {
    estadisticas: calcularEstadisticasEspecial(fichas),
    aprendicesPorPrograma: aprendicesPorProgramaEspecial(fichas),
    horasPorPrograma: horasPorProgramaEspecial(fichas),
    aprendicesPorCentro: aprendicesPorCentroEspecial(fichas),
    masMatriculados: masMatriculados(fichas),
    masCertificados: masCertificados(fichas),
    masActivosPorCentro: masActivosPorCentro(fichas),
    masOfertados: masOfertados(fichas),
  };
}
