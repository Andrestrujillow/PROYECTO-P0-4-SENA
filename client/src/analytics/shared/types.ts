export interface GrupoItem {
  label: string;
  value: number;
}

export interface IndicadorItem {
  nombre: string;
  valor: number;
  unidad: string;
  descripcion: string;
  color?: string;
}

export interface TendenciaItem {
  etiqueta: string;
  inscritos: number;
  matriculados: number;
  activos: number;
  desertados: number;
  certificados: number;
  porCertificar: number;
}

export interface CrecimientoItem {
  label: string;
  value: number;
}

export interface CriticoItem {
  prog: string;
  desercion: number;
}

export interface KpiData {
  title: string;
  value: number;
  subtitle?: string;
}
