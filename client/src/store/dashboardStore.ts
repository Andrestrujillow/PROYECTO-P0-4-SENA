import { create } from "zustand";
import type { Ficha, Filtros, Estadisticas, DatosGraficas, PuntoMapa } from "../types";
import { COORDINATES_CAUCA } from "../utils/coordinates";

const filtrosIniciales = (): Filtros => ({
  nombreCentro: "",
  modalidadFormacion: "",
  nivelFormacion: "",
  programaFormacion: "",
  empresa: "",
  municipio: "",
  programaEspecial: "",
  anioTerminacion: "",
  estadoCurso: "",
  etapaFicha: "",
  jornada: "",
  sectorPrograma: "",
});

const estadisticasIniciales: Estadisticas = {
  totalFichas: 0,
  totalAprendices: 0,
  totalCentros: 0,
  totalEmpresas: 0,
  totalInstructores: 0,
  promedioAprendicesPorFicha: 0,
};

const datosGraficasIniciales: DatosGraficas = {
  fichasPorNivel: [],
  aprendicesPorProgramaEspecial: [],
  aprendicesPorCentro: [],
  aprendicesPorModalidad: [],
  aprendicesPorMunicipio: [],
  fichasPorEstado: [],
};

interface DashboardState {
  fichas: Ficha[];
  fichasFiltradas: Ficha[];
  filtros: Filtros;
  estadisticas: Estadisticas;
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

function calcularEstadisticas(fichas: Ficha[]): Estadisticas {
  if (fichas.length === 0) return estadisticasIniciales;

  const centros = new Set(fichas.map((f) => f.codigoCentro));
  const empresas = new Set(fichas.filter((f) => f.nombreEmpresa).map((f) => f.nombreEmpresa));
  const instructores = new Set(fichas.map((f) => f.nombreResponsable));
  const totalAprendices = fichas.reduce((acc, f) => acc + f.totalAprendices, 0);

  return {
    totalFichas: fichas.length,
    totalAprendices,
    totalCentros: centros.size,
    totalEmpresas: empresas.size,
    totalInstructores: instructores.size,
    promedioAprendicesPorFicha: fichas.length > 0 ? Math.round(totalAprendices / fichas.length) : 0,
  };
}

function agruparPor<T>(items: T[], key: (item: T) => string): { label: string; value: number }[] {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const k = key(item);
    if (k) map.set(k, (map.get(k) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function agruparSuma<T>(items: T[], key: (item: T) => string, sum: (item: T) => number): { label: string; value: number }[] {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const k = key(item);
    if (k) map.set(k, (map.get(k) || 0) + sum(item));
  });
  return Array.from(map.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function calcularGraficas(fichas: Ficha[]): DatosGraficas {
  return {
    fichasPorNivel: agruparPor(fichas, (f) => f.nivelFormacion),
    aprendicesPorProgramaEspecial: agruparSuma(
      fichas.filter((f) => f.nombreProgramaEspecial),
      (f) => f.nombreProgramaEspecial,
      (f) => f.totalAprendices
    ),
    aprendicesPorCentro: agruparSuma(fichas, (f) => f.nombreCentro, (f) => f.totalAprendices),
    aprendicesPorModalidad: agruparSuma(fichas, (f) => f.modalidadFormacion, (f) => f.totalAprendices),
    aprendicesPorMunicipio: agruparSuma(fichas, (f) => f.nombreMunicipioCurso, (f) => f.totalAprendices),
    fichasPorEstado: agruparPor(fichas, (f) => f.estadoCurso),
  };
}

function calcularPuntosMapa(fichas: Ficha[]): PuntoMapa[] {
  const map = new Map<string, { cantidadFichas: number; totalAprendices: number }>();

  fichas.forEach((f) => {
    const key = f.nombreMunicipioCurso.toUpperCase().trim();
    if (!key) return;
    const entry = map.get(key) || { cantidadFichas: 0, totalAprendices: 0 };
    entry.cantidadFichas += 1;
    entry.totalAprendices += f.totalAprendices;
    map.set(key, entry);
  });

  const puntos: PuntoMapa[] = [];
  map.forEach((val, nombre) => {
    const coords = COORDINATES_CAUCA[nombre];
    if (coords) {
      puntos.push({
        lat: coords.lat,
        lng: coords.lng,
        nombre,
        cantidadFichas: val.cantidadFichas,
        cantidadAprendices: val.totalAprendices,
      });
    }
  });

  return puntos;
}

function filtrarFichas(fichas: Ficha[], filtros: Filtros): Ficha[] {
  return fichas.filter((f) => {
    if (filtros.nombreCentro && f.nombreCentro !== filtros.nombreCentro) return false;
    if (filtros.modalidadFormacion && f.modalidadFormacion !== filtros.modalidadFormacion) return false;
    if (filtros.nivelFormacion && f.nivelFormacion !== filtros.nivelFormacion) return false;
    if (filtros.programaFormacion && f.nombreProgramaFormacion !== filtros.programaFormacion) return false;
    if (filtros.empresa && f.nombreEmpresa !== filtros.empresa) return false;
    if (filtros.municipio && f.nombreMunicipioCurso !== filtros.municipio) return false;
    if (filtros.programaEspecial && f.nombreProgramaEspecial !== filtros.programaEspecial) return false;
    if (filtros.estadoCurso && f.estadoCurso !== filtros.estadoCurso) return false;
    if (filtros.etapaFicha && f.etapaFicha !== filtros.etapaFicha) return false;
    if (filtros.jornada && f.nombreJornada !== filtros.jornada) return false;
    if (filtros.sectorPrograma && f.nombreSectorPrograma !== filtros.sectorPrograma) return false;
    if (filtros.anioTerminacion) {
      const year = f.fechaTerminacionFicha.split("/")[2];
      if (year !== filtros.anioTerminacion) return false;
    }
    return true;
  });
}

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  fichas: [],
  fichasFiltradas: [],
  filtros: filtrosIniciales(),
  estadisticas: estadisticasIniciales,
  datosGraficas: datosGraficasIniciales,
  puntosMapa: [],
  isLoading: false,
  error: null,
  excelFileName: null,

  setFichas: (fichas) => {
    const stats = calcularEstadisticas(fichas);
    const graficas = calcularGraficas(fichas);
    set({
      fichas,
      fichasFiltradas: fichas,
      filtros: filtrosIniciales(),
      estadisticas: stats,
      datosGraficas: graficas,
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
      datosGraficas: calcularGraficas(filtered),
      puntosMapa: calcularPuntosMapa(filtered),
    });
  },
}));
