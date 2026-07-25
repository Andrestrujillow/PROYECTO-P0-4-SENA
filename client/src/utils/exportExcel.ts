import * as XLSX from "xlsx";
import type { Ficha } from "../types";

const COLUMNAS_EXCEL: (keyof Ficha)[] = [
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

const ENCABEZADOS: Record<keyof Ficha, string> = {
  codigoRegional: "Codigo Regional",
  nombreRegional: "Nombre Regional",
  codigoCentro: "Codigo Centro",
  nombreCentro: "Nombre Centro",
  identificadorFicha: "ID Ficha",
  identificadorUnicoFicha: "ID Unico Ficha",
  estadoCurso: "Estado Curso",
  codigoNivelFormacion: "Codigo Nivel",
  nivelFormacion: "Nivel Formacion",
  codigoJornada: "Codigo Jornada",
  nombreJornada: "Jornada",
  tipoFormacion: "Tipo Formacion",
  fechaInicioFicha: "Fecha Inicio",
  fechaTerminacionFicha: "Fecha Terminacion",
  etapaFicha: "Etapa",
  modalidadFormacion: "Modalidad",
  nombreResponsable: "Instructor",
  numeroIdentificacionEmpresa: "NIT Empresa",
  tipoIdentificacionEmpresa: "Tipo ID Empresa",
  nombreEmpresa: "Empresa",
  codigoSectorPrograma: "Codigo Sector",
  nombreSectorPrograma: "Sector Programa",
  codigoOcupacion: "Codigo Ocupacion",
  nombreOcupacion: "Ocupacion",
  codigoPrograma: "Codigo Programa",
  versionPrograma: "Version Programa",
  nombreProgramaFormacion: "Programa Formacion",
  codigoPaisCurso: "Codigo Pais",
  nombrePaisCurso: "Pais",
  codigoDepartamentoCurso: "Codigo Departamento",
  nombreDepartamentoCurso: "Departamento",
  codigoMunicipioCurso: "Codigo Municipio",
  nombreMunicipioCurso: "Municipio",
  codigoConvenio: "Codigo Convenio",
  nombreConvenio: "Convenio",
  ampliacionCobertura: "Ampliacion Cobertura",
  codigoProgramaEspecial: "Codigo Programa Especial",
  nombreProgramaEspecial: "Programa Especial",
  numeroCursos: "Numero Cursos",
  totalAprendicesMasculinos: "Aprendices Masculinos",
  totalAprendicesFemeninos: "Aprendices Femeninos",
  totalAprendicesNoBinario: "Aprendices No Binario",
  totalAprendices: "Total Aprendices",
  horasPlanta: "Horas Planta",
  horasContratistas: "Horas Contratistas",
  horasContratistasExternos: "Horas Contratistas Externos",
  horasMonitores: "Horas Monitores",
  horasInstEmpresa: "Horas Instruccion Empresa",
  totalHoras: "Total Horas",
  totalAprendicesActivos: "Aprendices Activos",
  duracionPrograma: "Duracion Programa (h)",
  nombreNuevoSector: "Nuevo Sector",
};

export function exportarAExcel(fichas: Ficha[], nombreArchivo: string) {
  const data = fichas.map((ficha) => {
    const fila: Record<string, string | number> = {};
    COLUMNAS_EXCEL.forEach((col) => {
      fila[ENCABEZADOS[col]] = ficha[col];
    });
    return fila;
  });

  const ws = XLSX.utils.json_to_sheet(data);

  const anchos = COLUMNAS_EXCEL.map((col) => {
    const maxLen = Math.max(
      ENCABEZADOS[col].length,
      ...data.map((fila) => String(fila[ENCABEZADOS[col]] ?? "").length)
    );
    return { wch: Math.min(maxLen + 2, 40) };
  });
  ws["!cols"] = anchos;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "PE-04 Filtrado");

  XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
}
