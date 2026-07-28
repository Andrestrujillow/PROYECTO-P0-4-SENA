import { create } from "zustand";
import type { Ficha, Filtros, Estadisticas, DatosGraficas, PuntoMapa } from "../types";
import { filtrarFichas } from "../analytics/shared/filters";
import { calcularEstadisticas, calcularEstadisticasDetalladas, calcularIndicadores } from "../analytics/DashboardAnalytics/estadisticas";
import { fichasPorNivel, aprendicesPorModalidad, aprendicesPorCentro, fichasPorEstado, aprendicesPorProgramaEspecial, aprendicesPorMunicipio } from "../analytics/DashboardAnalytics/transform";
import { calcularPuntosMapa } from "../utils/mapUtils";

const filtrosIniciales = (): Filtros => ({
  nombreCentro: "", modalidadFormacion: "", nivelFormacion: "", programaFormacion: "",
  empresa: "", municipio: "", programaEspecial: "", anioTerminacion: "",
  estadoCurso: "", etapaFicha: "", jornada: "", sectorPrograma: "",
  instructor: "", convenio: "", tipoFormacion: "",
});

const estadisticasIniciales: Estadisticas = {
  totalFichas: 0, totalAprendices: 0, totalCentros: 0, totalEmpresas: 0,
  totalInstructores: 0, promedioAprendicesPorFicha: 0,
};

const datosGraficasIniciales: DatosGraficas = {
  fichasPorNivel: [], aprendicesPorProgramaEspecial: [], aprendicesPorCentro: [],
  aprendicesPorModalidad: [], aprendicesPorMunicipio: [], fichasPorEstado: [],
};

interface DashboardState {
  fichas: Ficha[];
  fichasFiltradas: Ficha[];
  filtros: Filtros;
  estadisticas: Estadisticas;
  estadisticasDetalladas: { totalProgramas: number; totalMunicipios: number; totalHoras: number; totalActivos: number; totalCertificados: number; totalInstructores: number; crecimientoAnual: number };
  indicadores: { nombre: string; valor: number; unidad: string; descripcion: string; color?: string }[];
  datosGraficas: DatosGraficas;
  puntosMapa: PuntoMapa[];
  isLoading: boolean;
  error: string | null;
  excelFileName: string | null;
  setFichas: (fichas: Ficha[]) => void;
  setFiltros: (partial: Partial<Filtros>) => void;
  resetFiltros: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  aplicarFiltros: () => void;
}

function calcularGraficas(fichas: Ficha[]): DatosGraficas {
  return {
    fichasPorNivel: fichasPorNivel(fichas),
    aprendicesPorProgramaEspecial: aprendicesPorProgramaEspecial(fichas),
    aprendicesPorCentro: aprendicesPorCentro(fichas),
    aprendicesPorModalidad: aprendicesPorModalidad(fichas),
    aprendicesPorMunicipio: aprendicesPorMunicipio(fichas),
    fichasPorEstado: fichasPorEstado(fichas),
  };
}

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  fichas: [],
  fichasFiltradas: [],
  filtros: filtrosIniciales(),
  estadisticas: estadisticasIniciales,
  estadisticasDetalladas: { totalProgramas: 0, totalMunicipios: 0, totalHoras: 0, totalActivos: 0, totalCertificados: 0, totalInstructores: 0, crecimientoAnual: 0 },
  indicadores: [],
  datosGraficas: datosGraficasIniciales,
  puntosMapa: [],
  isLoading: false,
  error: null,
  excelFileName: null,

  setFichas: (fichas) => {
    set({
      fichas,
      fichasFiltradas: fichas,
      filtros: filtrosIniciales(),
      estadisticas: calcularEstadisticas(fichas),
      estadisticasDetalladas: calcularEstadisticasDetalladas(fichas),
      indicadores: calcularIndicadores(fichas),
      datosGraficas: calcularGraficas(fichas),
      puntosMapa: calcularPuntosMapa(fichas),
      excelFileName: "PE-04 cargado",
    });
  },

  setFiltros: (partial) => {
    const state = get();
    const newFiltros = { ...state.filtros, ...partial };
    const filtered = filtrarFichas(state.fichas, newFiltros);
    set({
      filtros: newFiltros,
      fichasFiltradas: filtered,
      estadisticas: calcularEstadisticas(filtered),
      estadisticasDetalladas: calcularEstadisticasDetalladas(filtered),
      indicadores: calcularIndicadores(filtered),
      datosGraficas: calcularGraficas(filtered),
      puntosMapa: calcularPuntosMapa(filtered),
    });
  },

  resetFiltros: () => {
    const state = get();
    set({
      filtros: filtrosIniciales(),
      fichasFiltradas: state.fichas,
      estadisticas: calcularEstadisticas(state.fichas),
      estadisticasDetalladas: calcularEstadisticasDetalladas(state.fichas),
      indicadores: calcularIndicadores(state.fichas),
      datosGraficas: calcularGraficas(state.fichas),
      puntosMapa: calcularPuntosMapa(state.fichas),
    });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  aplicarFiltros: () => {
    const state = get();
    const filtered = filtrarFichas(state.fichas, state.filtros);
    set({
      fichasFiltradas: filtered,
      estadisticas: calcularEstadisticas(filtered),
      estadisticasDetalladas: calcularEstadisticasDetalladas(filtered),
      indicadores: calcularIndicadores(filtered),
      datosGraficas: calcularGraficas(filtered),
      puntosMapa: calcularPuntosMapa(filtered),
    });
  },
}));
