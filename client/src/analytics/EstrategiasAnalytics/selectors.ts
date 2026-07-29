import type { Ficha } from "../../types";
import { calcularEstadisticasEstrategias } from "./estadisticas";
import { conveniosPorParticipacion, horasPorConvenio, aprendicesPorNivel, centrosConConvenios, topConvenios, topEmpresas, topProgramas, conveniosPorMunicipio } from "./charts";

export function useEstrategiasAnalytics(fichas: Ficha[]) {
  return {
    estadisticas: calcularEstadisticasEstrategias(fichas),
    conveniosPorParticipacion: conveniosPorParticipacion(fichas),
    horasPorConvenio: horasPorConvenio(fichas),
    aprendicesPorNivel: aprendicesPorNivel(fichas),
    centrosConConvenios: centrosConConvenios(fichas),
    topConvenios: topConvenios(fichas),
    topEmpresas: topEmpresas(fichas),
    topProgramas: topProgramas(fichas),
    conveniosPorMunicipio: conveniosPorMunicipio(fichas),
  };
}
