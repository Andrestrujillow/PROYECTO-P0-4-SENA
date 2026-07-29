export * from "./shared/types";
export * from "./shared/helpers";
export * from "./shared/filters";

export { useDashboardAnalytics } from "./DashboardAnalytics/selectors";
export { useComparativoAnalytics } from "./ComparativoAnalytics/selectors";
export { useComportamientoAnalytics } from "./ComportamientoAnalytics/selectors";
export { useEspecialAnalytics } from "./EspecialAnalytics/selectors";
export { useEstrategiasAnalytics } from "./EstrategiasAnalytics/selectors";

export { calcularEstadisticas, calcularEstadisticasDetalladas, calcularIndicadores } from "./DashboardAnalytics/estadisticas";
export { calcularTendencias, calcularRankingProgramas, calcularRankingCentros, calcularRankingEmpresas } from "./DashboardAnalytics/charts";
export { fichasPorNivel, aprendicesPorModalidad, aprendicesPorCentro, fichasPorEstado, equidadGenero, horasPorTipo } from "./DashboardAnalytics/transform";
