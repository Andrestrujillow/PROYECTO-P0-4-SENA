import * as XLSX from "xlsx";
import type { Ficha } from "../types";

const HEADER_ROW_INDEX = 4;

function toNumber(val: unknown): number {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

function toString(val: unknown): string {
  if (val == null) return "";
  return String(val).trim();
}

function mapRowToHeaders(
  row: unknown[],
  headers: string[]
): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  headers.forEach((h, i) => {
    obj[h] = row[i] ?? "";
  });
  return obj;
}

function buildFicha(raw: Record<string, unknown>): Ficha | null {
  const identificador = toNumber(raw["IDENTIFICADOR_FICHA"]);
  if (!identificador) return null;

  const id1 = toNumber(raw["IDENTIFICADOR_UNICO_FICHA"]);

  return {
    codigoRegional: toNumber(raw["CODIGO_REGIONAL"]),
    nombreRegional: toString(raw["NOMBRE_REGIONAL"]),
    codigoCentro: toNumber(raw["CODIGO_CENTRO"]),
    nombreCentro: toString(raw["NOMBRE_CENTRO"]),
    identificadorFicha: identificador,
    identificadorUnicoFicha: id1,
    estadoCurso: toString(raw["ESTADO_CURSO"]),
    codigoNivelFormacion: toNumber(raw["CODIGO_NIVEL_FORMACION"]),
    nivelFormacion: toString(raw["NIVEL_FORMACION"]),
    codigoJornada: toNumber(raw["CODIGO_JORNADA"]),
    nombreJornada: toString(raw["NOMBRE_JORNADA"]),
    tipoFormacion: toString(raw["TIPO_DE_FORMACION"]),
    fechaInicioFicha: toString(raw["FECHA_INICIO_FICHA"]),
    fechaTerminacionFicha: toString(raw["FECHA_TERMINACION_FICHA"]),
    etapaFicha: toString(raw["ETAPA_FICHA"]),
    modalidadFormacion: toString(raw["MODALIDAD_FORMACION"]),
    nombreResponsable: toString(raw["NOMBRE_RESPONSABLE"]),
    numeroIdentificacionEmpresa: toString(raw["NUMERO_IDENTIFICACION_EMPRESA"]),
    tipoIdentificacionEmpresa: toString(raw["TIPO_IDENTIFICACION_EMPRESA"]),
    nombreEmpresa: toString(raw["NOMBRE_EMPRESA"]),
    codigoSectorPrograma: toNumber(raw["CODIGO_SECTOR_PROGRAMA"]),
    nombreSectorPrograma: toString(raw["NOMBRE_SECTOR_PROGRAMA"]),
    codigoOcupacion: toNumber(raw["CODIGO_OCUPACION"]),
    nombreOcupacion: toString(raw["NOMBRE_OCUPACION"]),
    codigoPrograma: toNumber(raw["CODIGO_PROGRAMA"]),
    versionPrograma: toNumber(raw["VERSION_PROGRAMA"]),
    nombreProgramaFormacion: toString(raw["NOMBRE_PROGRAMA_FORMACION"]),
    codigoPaisCurso: toNumber(raw["CODIGO_PAIS_CURSO"]),
    nombrePaisCurso: toString(raw["NOMBRE_PAIS_CURSO"]),
    codigoDepartamentoCurso: toNumber(raw["CODIGO_DEPARTAMENTO_CURSO"]),
    nombreDepartamentoCurso: toString(raw["NOMBRE_DEPARTAMENTO_CURSO"]),
    codigoMunicipioCurso: toNumber(raw["CODIGO_MUNICIPIO_CURSO"]),
    nombreMunicipioCurso: toString(raw["NOMBRE_MUNICIPIO_CURSO"]),
    codigoConvenio: toNumber(raw["CODIGO_CONVENIO"]),
    nombreConvenio: toString(raw["NOMBRE_CONVENIO"]),
    ampliacionCobertura: toString(raw["AMPLIACION_COBERTURA"]),
    codigoProgramaEspecial: toNumber(raw["CODIGO_PROGRAMA_ESPECIAL"]),
    nombreProgramaEspecial: toString(raw["NOMBRE_PROGRAMA_ESPECIAL"]),
    numeroCursos: toNumber(raw["NUMERO_CURSOS"]),
    totalAprendicesMasculinos: toNumber(raw["TOTAL_APRENDICES_MASCULINOS"]),
    totalAprendicesFemeninos: toNumber(raw["TOTAL_APRENDICES_FEMENINOS"]),
    totalAprendicesNoBinario: toNumber(raw["TOTAL_APRENDICES_NOBINARIO"]),
    totalAprendices: toNumber(raw["TOTAL_APRENDICES"]),
    horasPlanta: toNumber(raw["HORAS_PLANTA"]),
    horasContratistas: toNumber(raw["HORAS_CONTRATISTAS"]),
    horasContratistasExternos: toNumber(raw["HORAS_CONTRATISTAS_EXTERNOS"]),
    horasMonitores: toNumber(raw["HORAS_MONITORES"]),
    horasInstEmpresa: toNumber(raw["HORAS_INST_EMPRESA"]),
    totalHoras: toNumber(raw["TOTAL_HORAS"]),
    totalAprendicesActivos: toNumber(raw["TOTAL_APRENDICES_ACTIVOS"]),
    duracionPrograma: toNumber(raw["DURACION_PROGRAMA"]),
    nombreNuevoSector: toString(raw["NOMBRE_NUEVO_SECTOR"]),
  };
}

export function parseExcelFile(buffer: ArrayBuffer): Ficha[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("El archivo Excel no contiene hojas");
  }

  const sheet = workbook.Sheets[sheetName];
  const ref = sheet["!ref"];
  if (!ref) {
    throw new Error("El archivo Excel no contiene datos");
  }
  const range = XLSX.utils.decode_range(ref);

  const headerRow: XLSX.CellObject[] = [];
  for (let c = range.s.c; c <= range.e.c; c++) {
    const cell = sheet[XLSX.utils.encode_cell({ r: HEADER_ROW_INDEX, c })];
    headerRow.push(cell);
  }

  const headers = headerRow.map((cell) => {
    const val = cell?.w ?? cell?.v ?? "";
    return toString(val).toUpperCase().replace(/\s+/g, "_");
  });

  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
    defval: "",
  });

  const dataRows = rows.slice(HEADER_ROW_INDEX + 1);

  const fichas: Ficha[] = [];
  for (const row of dataRows) {
    const raw = mapRowToHeaders(row, headers);
    const ficha = buildFicha(raw);
    if (ficha) {
      fichas.push(ficha);
    }
  }

  return fichas;
}
