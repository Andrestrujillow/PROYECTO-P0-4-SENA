import type { Ficha } from "../../types";
import { calcularEstadisticas, calcularEstadisticasDetalladas, calcularIndicadores } from "./estadisticas";
import { calcularTendencias, calcularRankingProgramas, calcularRankingCentros, calcularRankingEmpresas, calcularRankingSectores } from "./charts";
import { fichasPorNivel, aprendicesPorModalidad, aprendicesPorCentro, fichasPorEstado, equidadGenero, horasPorTipo, aprendicesPorGenero, aprendicesPorProgramaEspecial } from "./transform";

export function useDashboardAnalytics(fichas: Ficha[]) {
  return {
    estadisticas: calcularEstadisticas(fichas),
    estadisticasDetalladas: calcularEstadisticasDetalladas(fichas),
    indicadores: calcularIndicadores(fichas),
    tendencias: calcularTendencias(fichas),
    rankingProgramas: calcularRankingProgramas(fichas),
    rankingCentros: calcularRankingCentros(fichas),
    rankingEmpresas: calcularRankingEmpresas(fichas),
    rankingSectores: calcularRankingSectores(fichas),
    transform: {
      fichasPorNivel: fichasPorNivel(fichas),
      aprendicesPorModalidad: aprendicesPorModalidad(fichas),
      aprendicesPorCentro: aprendicesPorCentro(fichas),
      fichasPorEstado: fichasPorEstado(fichas),
      equidadGenero: equidadGenero(fichas),
      horasPorTipo: horasPorTipo(fichas),
      aprendicesPorGenero: aprendicesPorGenero(fichas),
      aprendicesPorProgramaEspecial: aprendicesPorProgramaEspecial(fichas),
    },
  };
}
