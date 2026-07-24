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

export type FichaKey = keyof Ficha;

export const FICHA_COLUMNS: FichaKey[] = [
  "codigoRegional",
  "nombreRegional",
  "codigoCentro",
  "nombreCentro",
  "identificadorFicha",
  "identificadorUnicoFicha",
  "estadoCurso",
  "codigoNivelFormacion",
  "nivelFormacion",
  "codigoJornada",
  "nombreJornada",
  "tipoFormacion",
  "fechaInicioFicha",
  "fechaTerminacionFicha",
  "etapaFicha",
  "modalidadFormacion",
  "nombreResponsable",
  "numeroIdentificacionEmpresa",
  "tipoIdentificacionEmpresa",
  "nombreEmpresa",
  "codigoSectorPrograma",
  "nombreSectorPrograma",
  "codigoOcupacion",
  "nombreOcupacion",
  "codigoPrograma",
  "versionPrograma",
  "nombreProgramaFormacion",
  "codigoPaisCurso",
  "nombrePaisCurso",
  "codigoDepartamentoCurso",
  "nombreDepartamentoCurso",
  "codigoMunicipioCurso",
  "nombreMunicipioCurso",
  "codigoConvenio",
  "nombreConvenio",
  "ampliacionCobertura",
  "codigoProgramaEspecial",
  "nombreProgramaEspecial",
  "numeroCursos",
  "totalAprendicesMasculinos",
  "totalAprendicesFemeninos",
  "totalAprendicesNoBinario",
  "totalAprendices",
  "horasPlanta",
  "horasContratistas",
  "horasContratistasExternos",
  "horasMonitores",
  "horasInstEmpresa",
  "totalHoras",
  "totalAprendicesActivos",
  "duracionPrograma",
  "nombreNuevoSector",
];
