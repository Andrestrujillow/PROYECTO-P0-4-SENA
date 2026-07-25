export interface Ficha {
  codigoRegional: number;
  nombreRegional: string;
  codigoCentro: number;
  nombreCentro: string;
  identificadorFicha: number;
  identificadorUnicoFicha: number;
  estadoCurso: string;
  codigoNivelFormacion: number;
  nivelFormacion: string;
  codigoJornada: number;
  nombreJornada: string;
  tipoFormacion: string;
  fechaInicioFicha: string;
  fechaTerminacionFicha: string;
  etapaFicha: string;
  modalidadFormacion: string;
  nombreResponsable: string;
  numeroIdentificacionEmpresa: string;
  tipoIdentificacionEmpresa: string;
  nombreEmpresa: string;
  codigoSectorPrograma: number;
  nombreSectorPrograma: string;
  codigoOcupacion: number;
  nombreOcupacion: string;
  codigoPrograma: number;
  versionPrograma: number;
  nombreProgramaFormacion: string;
  codigoPaisCurso: number;
  nombrePaisCurso: string;
  codigoDepartamentoCurso: number;
  nombreDepartamentoCurso: string;
  codigoMunicipioCurso: number;
  nombreMunicipioCurso: string;
  codigoConvenio: number;
  nombreConvenio: string;
  ampliacionCobertura: string;
  codigoProgramaEspecial: number;
  nombreProgramaEspecial: string;
  numeroCursos: number;
  totalAprendicesMasculinos: number;
  totalAprendicesFemeninos: number;
  totalAprendicesNoBinario: number;
  totalAprendices: number;
  horasPlanta: number;
  horasContratistas: number;
  horasContratistasExternos: number;
  horasMonitores: number;
  horasInstEmpresa: number;
  totalHoras: number;
  totalAprendicesActivos: number;
  duracionPrograma: number;
  nombreNuevoSector: string;
}

export interface Filtros {
  nombreCentro: string;
  modalidadFormacion: string;
  nivelFormacion: string;
  programaFormacion: string;
  empresa: string;
  municipio: string;
  programaEspecial: string;
  anioTerminacion: string;
  estadoCurso: string;
  etapaFicha: string;
  jornada: string;
  sectorPrograma: string;
  instructor: string;
}

export interface Estadisticas {
  totalFichas: number;
  totalAprendices: number;
  totalCentros: number;
  totalEmpresas: number;
  totalInstructores: number;
  promedioAprendicesPorFicha: number;
}

export interface DatosGraficas {
  fichasPorNivel: { label: string; value: number }[];
  aprendicesPorProgramaEspecial: { label: string; value: number }[];
  aprendicesPorCentro: { label: string; value: number }[];
  aprendicesPorModalidad: { label: string; value: number }[];
  aprendicesPorMunicipio: { label: string; value: number }[];
  fichasPorEstado: { label: string; value: number }[];
}

export interface PuntoMapa {
  lat: number;
  lng: number;
  nombre: string;
  cantidadFichas: number;
  cantidadAprendices: number;
}
