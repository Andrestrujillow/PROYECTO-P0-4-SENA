# SENA PE-04 Dashboard - Especificación Técnica

## 1. Identificación del Proyecto

- **Nombre:** SENA PE-04 Dashboard
- **Propósito:** Sistema web de visualización y análisis del reporte PE-04 del SENA Regional Cauca
- **Fuente de datos:** Archivo Excel (.xlsx) con estructura fija de 49 columnas
- **Plataforma:** Aplicación web SPA con backend ligero para procesamiento de Excel

---

## 2. Stack Tecnológico

### Frontend

| Categoría | Tecnología | Versión | Propósito |
|---|---|---|---|
| **Framework** | React | 19.x | Librería UI con Server Components y Suspense |
| **Bundler** | Vite | 6.x | Dev server HMR + build optimizado con Rollup |
| **Lenguaje** | TypeScript | 5.7.x | Tipado estático estricto |
| **CSS** | Tailwind CSS | 4.x | Utility-first CSS con CSS-first config |
| **Rutas** | React Router | 7.x | Enrutamiento SPA con loaders y actions |
| **Estado** | Zustand | 5.x | Store ligero con selectores y middleware |
| **Gráficas** | Chart.js | 4.x | Gráficas canvas con react-chartjs-2 |
| **Mapas** | React Leaflet + Leaflet | 4.x / 1.9.x | Mapas interactivos con OpenStreetMap |
| **HTTP** | ky | 1.x | Wrapper moderno de fetch con retry automático |
| **Tablas** | TanStack Table | 8.x | Headless table con sorting, filtering, pagination |
| **Formularios** | React Hook Form | 7.x | Formularios performantes con zod validation |
| **Fechas** | date-fns | 4.x | Utilidades de fecha inmutables y tree-shakeable |
| **Iconos** | Lucide React | 0.4x | Iconos SVG consistentes y ligeros |
| **Clases** | clsx + tailwind-merge | 2.x | Clases condicionales sin conflictos de Tailwind |
| **Archivos** | react-dropzone | 14.x | Upload de archivos con drag & drop |
| **Meta** | react-helmet-async | 2.x | SEO y meta tags por página |

### Backend

| Categoría | Tecnología | Versión | Propósito |
|---|---|---|---|
| **Runtime** | Node.js | 22.x LTS | Runtime JavaScript con ESM nativo |
| **Framework** | Express | 5.x | HTTP framework con soporte async nativo |
| **Upload** | Multer | 2.x | Middleware multipart/form-data |
| **Excel** | xlsx (SheetJS) | 0.18.x | Lectura y parseo de archivos Excel |
| **Validación** | Zod | 3.x | Schema validation type-safe |
| **Seguridad** | Helmet | 8.x | Security headers HTTP |
| **Logging** | Morgan | 1.x | HTTP request logger |
| **CORS** | cors | 2.x | Cross-Origin Resource Sharing |
| **Env** | dotenv | 16.x | Variables de entorno desde .env |
| **TS Run** | tsx | 4.x | Ejecución TypeScript sin compilación previa |

### Herramientas de Desarrollo

| Categoría | Tecnología | Propósito |
|---|---|---|
| **Linter** | ESLint | 9.x con flat config para React + TypeScript |
| **Formatter** | Prettier | 3.x con integración Tailwind plugin |
| **Pre-commit** | Husky + lint-staged | Hooks git que ejecutan lint y format automático |
| **Testing** | Vitest | 2.x | Unit tests con API compatible con Jest |
| **E2E** | Playwright | 1.x | Tests end-to-end cross-browser |
| **Git** | Conventional Commits | 1.x | Mensajes de commit estandarizados |

### Base de datos
- **Ninguna.** Toda la data vive en memoria del servidor después de cargar el Excel.

---

## 3. Estructura del Proyecto

```
sena-pe04-dashboard/
├── client/                          # Frontend React + Vite
│   ├── public/
│   │   └── logo-sena.svg
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css                # Tailwind directives + custom styles
│   │   ├── types/
│   │   │   └── index.ts            # Interfaces TypeScript
│   │   ├── store/
│   │   │   └── dashboardStore.ts   # Zustand store
│   │   ├── services/
│   │   │   └── api.ts              # ky instance + endpoints
│   │   ├── hooks/
│   │   │   ├── useFilteredData.ts
│   │   │   └── useStats.ts
│   │   ├── utils/
│   │   │   ├── mapping.ts          # Mapeo de columnas Excel
│   │   │   ├── formatters.ts       # Formateo de datos
│   │   │   └── coordinates.ts      # Coordenadas municipios Cauca
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── cards/
│   │   │   │   └── StatCard.tsx
│   │   │   ├── charts/
│   │   │   │   ├── chartConfig.ts
│   │   │   │   ├── FichasPorNivel.tsx
│   │   │   │   ├── AprendicesPorProgramaEspecial.tsx
│   │   │   │   ├── AprendicesPorCentro.tsx
│   │   │   │   └── AprendicesPorModalidad.tsx
│   │   │   ├── filters/
│   │   │   │   └── FilterBar.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Layout.tsx
│   │   │   ├── map/
│   │   │   │   └── MapView.tsx
│   │   │   ├── table/
│   │   │   │   └── DataTable.tsx
│   │   │   └── ui/
│   │   │       ├── FileUpload.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   └── pages/
│   │       ├── Inicio/
│   │       │   └── WelcomePage.tsx
│   │       ├── Dashboard/
│   │       │   └── DashboardPage.tsx
│   │       ├── OfertasComparadas/
│   │       │   └── OfertasComparadasPage.tsx
│   │       ├── Comportamiento/
│   │       │   └── ComportamientoPage.tsx
│   │       ├── OfertaEspecial/
│   │       │   └── OfertaEspecialPage.tsx
│   │       └── EstrategiasInstitucionales/
│   │           └── EstrategiasPage.tsx
│   ├── index.html
│   ├── components.json              # shadcn/ui config (opcional)
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── .eslintrc.cjs
│   ├── .prettierrc
│   └── package.json
│
├── server/                          # Backend Express
│   ├── src/
│   │   ├── index.ts                 # Entry point Express
│   │   ├── routes/
│   │   │   └── excel.routes.ts
│   │   ├── controllers/
│   │   │   └── excel.controller.ts
│   │   ├── services/
│   │   │   └── excel.service.ts     # Lectura y parseo de Excel
│   │   ├── middleware/
│   │   │   └── errorHandler.ts      # Error handling middleware
│   │   └── types/
│   │       └── index.ts
│   ├── .env
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── Referencia del proyecto/
│   └── PE-04_1 junio.xlsx          # Archivo fuente
├── .gitignore
├── .editorconfig
├── AGENTS.md                        # Este archivo
└── README.md
```

---

## 4. Schema de Datos - Columnas del Excel

### 4.1 Encabezados reales (Fila 5 del Excel)

El archivo Excel tiene exactamente estas 49 columnas en este orden:

| Índice | Columna Excel | Tipo | Descripción |
|---|---|---|---|
| 0 | CODIGO_REGIONAL | number | Código numérico de regional (ej: 19) |
| 1 | NOMBRE_REGIONAL | string | Nombre de la regional (ej: "REGIONAL CAUCA") |
| 2 | CODIGO_CENTRO | number | Código del centro (ej: 9307) |
| 3 | NOMBRE_CENTRO | string | Nombre del centro (ej: "CENTRO DE COMERCIO Y SERVICIOS") |
| 4 | IDENTIFICADOR_FICHA | number | ID de la ficha |
| 5 | IDENTIFICADOR_UNICO_FICHA | number | ID único (prefijo 1 + IDENTIFICADOR_FICHA) |
| 6 | ESTADO_CURSO | string | "En ejecucion" \| "Terminada" \| "Terminada por fecha" \| "TERMINADO" |
| 7 | CODIGO_NIVEL_FORMACION | number | 1=Auxiliar, 2=Técnico, 6=Tecnólogo, 8=Curso Especial, 9=Evento |
| 8 | NIVEL_FORMACION | string | "AUXILIAR" \| "TÉCNICO" \| "TECNÓLOGO" \| "CURSO ESPECIAL" \| "EVENTO" |
| 9 | CODIGO_JORNADA | number | 1=Diurna, 4=Mixta |
| 10 | NOMBRE_JORNADA | string | "DIURNA" \| "MIXTA" |
| 11 | TIPO_DE_FORMACION | string | "A LA MEDIDA" \| "NO A LA MEDIDA" |
| 12 | FECHA_INICIO_FICHA | string | Formato "DD/MM/YYYY" |
| 13 | FECHA_TERMINACION_FICHA | string | Formato "DD/MM/YYYY" |
| 14 | ETAPA_FICHA | string | "LECTIVA" \| "PRACTICA" |
| 15 | MODALIDAD_FORMACION | string | "PRESENCIAL" \| "VIRTUAL" \| "A DISTANCIA" |
| 16 | NOMBRE_RESPONSABLE | string | Nombre del instructor/responsable |
| 17 | NUMERO_IDENTIFICACION_EMPRESA | string | NIT de la empresa |
| 18 | TIPO_IDENTIFICACION_EMPRESA | string | "NIT" \| vacío |
| 19 | NOMBRE_EMPRESA | string | Razón social de la empresa |
| 20 | CODIGO_SECTOR_PROGRAMA | number | Código del sector (1-6) |
| 21 | NOMBRE_SECTOR_PROGRAMA | string | "PRIMARIO Y EXTRACTIVO" \| "INDUSTRIA" \| "COMERCIO" \| "SERVICIOS" \| "TRANSVERSAL" \| "PENDIENTE POR DEFINIR" |
| 22 | CODIGO_OCUPACION | number | Código CNO |
| 23 | NOMBRE_OCUPACION | string | Nombre de la ocupación |
| 24 | CODIGO_PROGRAMA | number | Código del programa |
| 25 | VERSION_PROGRAMA | number | Versión del programa |
| 26 | NOMBRE_PROGRAMA_FORMACION | string | Nombre completo del programa |
| 27 | CODIGO_PAIS_CURSO | number | 57 = Colombia |
| 28 | NOMBRE_PAIS_CURSO | string | "COLOMBIA" |
| 29 | CODIGO_DEPARTAMENTO_CURSO | number | Código DANE del departamento |
| 30 | NOMBRE_DEPARTAMENTO_CURSO | string | "CAUCA" |
| 31 | CODIGO_MUNICIPIO_CURSO | number | Código DANE del municipio |
| 32 | NOMBRE_MUNICIPIO_CURSO | string | Nombre del municipio |
| 33 | CODIGO_CONVENIO | number | 0 = sin convenio |
| 34 | NOMBRE_CONVENIO | string | Nombre del convenio o vacío |
| 35 | AMPLIACION_COBERTURA | string | "N" \| vacío |
| 36 | CODIGO_PROGRAMA_ESPECIAL | number | Código del programa especial |
| 37 | NOMBRE_PROGRAMA_ESPECIAL | string | Ej: "TecnoAcademia - SENNOVA", "CAMPESENA", "ALIANZAS ESTRATEGICAS" |
| 38 | NUMERO_CURSOS | number | Cantidad de cursos en la ficha |
| 39 | TOTAL_APRENDICES_MASCULINOS | number | Aprendices hombres |
| 40 | TOTAL_APRENDICES_FEMENINOS | number | Aprendices mujeres |
| 41 | TOTAL_APRENDICES_NOBINARIO | number | Aprendices no binarios |
| 42 | TOTAL_APRENDICES | number | Total aprendices (suma de 39+40+41) |
| 43 | HORAS_PLANTA | number | Horas de personal de planta |
| 44 | HORAS_CONTRATISTAS | number | Horas de contratistas |
| 45 | HORAS_CONTRATISTAS_EXTERNOS | number | Horas contratistas externos |
| 46 | HORAS_MONITORES | number | Horas de monitores |
| 47 | HORAS_INST_EMPRESA | number | Horas de instrucción en empresa |
| 48 | TOTAL_HORAS | number | Suma total de horas |
| 49 | TOTAL_APRENDICES_ACTIVOS | number | Aprendices actualmente activos |
| 50 | DURACION_PROGRAMA | number | Duración en horas del programa |
| 51 | NOMBRE_NUEVO_SECTOR | string | Nombre del sector normalizado (puede estar vacío) |

### 4.2 Fila de encabezados

La fila de encabezados está en la **fila 5** (index 4 si se cuenta desde 0). Las filas 1-4 son metadata del reporte:
- Fila 1: Código del reporte ("PE-04_")
- Fila 2: Título ("PROGRAMACIÓN ESPECÍFICA DE CURSOS LARGOS, ESPECIALES Y EVENTOS POR REGIONAL Y CENTRO")
- Fila 3: Código del periodo ("202606")
- Fila 4: Separador

### 4.3 Interface TypeScript

```typescript
// client/src/types/index.ts

export interface Ficha {
  codigoRegional: number;
  nombreRegional: string;
  codigoCentro: number;
  nombreCentro: string;
  identificadorFicha: number;
  identificadorUnicoFicha: number;
  estadoCurso: "En ejecucion" | "Terminada" | "Terminada por fecha" | "TERMINADO";
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

export interface DashboardState {
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
  setFiltros: (filtros: Partial<Filtros>) => void;
  resetFiltros: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  aplicarFiltros: () => void;
}
```

### 4.4 Coordenadas de municipios del Cauca

El archivo Excel **NO** contiene coordenadas GPS. Para el mapa se requiere una tabla de referencia con coordenadas de los municipios del Cauca. Esta tabla se define en `utils/coordinates.ts`:

```typescript
// Valores aproximados conocidos para municipios del Cauca
export const COORDINATES_CAUCA: Record<string, { lat: number; lng: number }> = {
  "POPAYAN":        { lat: 2.4448, lng: -76.6147 },
  "SANTANDER DE QUILICHAO": { lat: 2.9594, lng: -76.6528 },
  "CALDONO":        { lat: 2.7969, lng: -76.4853 },
  "TORIBIO":        { lat: 2.9906, lng: -76.1358 },
  "SILVIA":         { lat: 2.6369, lng: -76.3800 },
  "MORALES":        { lat: 2.7608, lng: -76.6375 },
  "CORINTO":        { lat: 3.1733, lng: -76.2600 },
  "MIRANDA":        { lat: 3.2500, lng: -76.2392 },
  "EL TAMBO":       { lat: 2.4500, lng: -76.8100 },
  "GUAPI":          { lat: 2.5711, lng: -77.8894 },
  "PATIA (EL BORDO)": { lat: 2.1833, lng: -76.9833 },
  "FLORENCIA":      { lat: 2.9600, lng: -76.8167 },
  "BOLIVAR":        { lat: 2.4333, lng: -76.7833 },
  "LA SIERRA":      { lat: 2.4833, lng: -76.7667 },
  "PIENDAMO":       { lat: 2.6400, lng: -76.5300 },
  "CAJIBIO":        { lat: 2.6167, lng: -76.6000 },
  "LA VEGA":        { lat: 2.0167, lng: -76.7833 },
  "TIMBIO":         { lat: 2.3500, lng: -76.6833 },
  "PURACE (COCONUCO)": { lat: 2.4333, lng: -76.5000 },
  "SANTA ROSA":     { lat: 1.7833, lng: -76.7500 },
  "ARGELIA":        { lat: 2.5000, lng: -77.0833 },
  "PIAMONTE":       { lat: 2.1500, lng: -77.1000 },
  "INZA":           { lat: 2.5500, lng: -76.0667 },
  "MERCADERES":     { lat: 2.0333, lng: -77.1667 },
  "BALBOA":         { lat: 2.0500, lng: -77.2000 },
  "ROSAS":          { lat: 1.7500, lng: -76.7333 },
  "VILLA RICA":     { lat: 2.7167, lng: -76.4833 },
  "TOTORO":         { lat: 2.4833, lng: -76.5333 },
  "SUAREZ":         { lat: 2.9500, lng: -76.6833 },
};
```

---

## 5. Diseño UI - Paleta y Estilo

### 5.1 Colores

| Token | Valor Hex | Uso |
|---|---|---|
| `--sena-green` | `#00843D` | Botones, acentos principales |
| `--sena-green-light` | `#4CAF50` | Hover states |
| `--sena-yellow` | `#FFD100` | Advertencias, highlight |
| `--sena-blue-dark` | `#0D1B2A` | Fondo principal del dashboard |
| `--sena-blue-medium` | `#1B2838` | Fondo de sidebar/cards |
| `--sena-blue-light` | `#243447` | Fondo de tablas, inputs |
| `--sena-gray` | `#8899AA` | Texto secundario |
| `--sena-white` | `#FFFFFF` | Texto principal |
| `--sena-red` | `#E74C3C` | Errores, indicadores negativos |

### 5.2 Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sena: {
          green: "#00843D",
          "green-light": "#4CAF50",
          yellow: "#FFD100",
          "blue-dark": "#0D1B2A",
          "blue-medium": "#1B2838",
          "blue-light": "#243447",
          gray: "#8899AA",
          white: "#FFFFFF",
          red: "#E74C3C",
        },
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.3)",
        glow: "0 0 15px rgba(0, 132, 61, 0.4)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
```

### 5.3 Estilo general

- **Fondo:** `bg-sena-blue-dark` en toda la app
- **Cards:** `bg-sena-blue-medium rounded-card shadow-card border border-sena-blue-light/30`
- **Estadísticas:** Cards con ícono, número grande y label pequeño
- **Tablas:** Encabezados `bg-sena-blue-light`, filas alternas `bg-sena-blue-dark/50`
- **Filtros:** Selects con fondo oscuro, borde verde al focus
- **Tipografía:** Inter o sistema de fuentes, pesos 400/600/700
- **Animaciones:** Transiciones suaves de 200ms en hover y cambios de estado
- **Responsivo:** Grid de 1 columna en mobile, 2 en tablet, 3-4 en desktop

---

## 6. Páginas

### 6.1 WelcomePage (`/`)

- Fondo oscuro con gradiente radial y grid sutil
- Logo SENA centrado (BarChart3 icon, alto ~96px)
- Título grande: "Reporte Ofertas de Formación"
- Subtítulo: "2020 – {año_actual}" + "SENA Regional Cauca"
- Fecha de actualización automática
- Descripción breve del sistema
- 3 features: Carga Excel, Gráficas en Vivo, Datos Seguros
- Botón "Ingresar al Dashboard" con fondo `sena-green`
- Animaciones de entrada (fadeInDown, fadeInUp)
- Sin sidebar ni header

### 6.2 Dashboard Principal (`/dashboard`)

Layout principal. Se divide en:

**Zona superior:**
- Fila de **StatCards**: Fichas | Aprendices | Centros | Empresas | Instructores
- Debajo: **FilterBar** con los 12 filtros

**Zona media:**
- **FileUpload** para reemplazar datos

**Zona inferior (grid 2x2):**
- **FichasPorNivel** (doughnut chart)
- **AprendicesPorProgramaEspecial** (bar chart)
- **AprendicesPorCentro** (bar chart horizontal)
- **AprendicesPorModalidad** (pie chart)

**Mapa:**
- **MapView** (Leaflet) con distribución geográfica

**Tabla:**
- **DataTable** con búsqueda, sorting y paginación

### 6.3 Ofertas Comparadas (`/ofertas-comparadas`)

- Placeholder: comparación de ofertas entre periodos, centros y programas

### 6.4 Comportamiento (`/comportamiento`)

- Placeholder: análisis de tendencias y comportamiento temporal

### 6.5 Oferta Especial (`/oferta-especial`)

- Placeholder: programas especiales, TecnoAcademias, CAMPESENA

### 6.6 Estrategias Institucionales (`/estrategias`)

- Placeholder: estrategias de formación, convenios, programas transversales

---

## 7. Componentes Clave

### 7.1 FilterBar

Filtros dinámicos generados desde los datos únicos del Excel:

| Filtro | Campo Excel | Tipo UI |
|---|---|---|
| Centro | `NOMBRE_CENTRO` | Select con búsqueda |
| Modalidad | `MODALIDAD_FORMACION` | Select |
| Nivel Formación | `NIVEL_FORMACION` | Select |
| Programa | `NOMBRE_PROGRAMA_FORMACION` | Select con búsqueda |
| Empresa | `NOMBRE_EMPRESA` | Select con búsqueda |
| Municipio | `NOMBRE_MUNICIPIO_CURSO` | Select con búsqueda |
| Programa Especial | `NOMBRE_PROGRAMA_ESPECIAL` | Select |
| Año Terminación | Derivado de `FECHA_TERMINACION_FICHA` | Select (YYYY) |
| Estado | `ESTADO_CURSO` | Select |
| Etapa | `ETAPA_FICHA` | Select |
| Jornada | `NOMBRE_JORNADA` | Select |
| Sector | `NOMBRE_SECTOR_PROGRAMA` | Select |

Cada select se genera extrayendo valores únicos del campo correspondiente. Al cambiar cualquier filtro, se recalculan todos los datos (fichasFiltradas, estadísticas, gráficas, mapa).

### 7.2 DataTable

- Columnas visibles: `IDENTIFICADOR_FICHA`, `NOMBRE_CENTRO`, `NOMBRE_PROGRAMA_FORMACION`, `ETAPA_FICHA`, `NOMBRE_EMPRESA`, `NOMBRE_MUNICIPIO_CURSO`, `TOTAL_APRENDICES`, `MODALIDAD_FORMACION`
- Paginación de 20 filas
- Búsqueda global por texto
- Ordenamiento por columna (click en header)
- Scroll horizontal en mobile

### 7.3 MapView

- Centro inicial: Popayán (`[2.4448, -76.6147]`), zoom 10
- Marcadores agrupados por municipio
- Cada marcador muestra tooltip con: nombre del municipio, cantidad de fichas, total de aprendices
- Tile layer: OpenStreetMap
- Fondo oscuro del mapa (usar filtro CSS `brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)` o similar)

### 7.4 StatCard

Props: `{ title: string, value: number | string, icon: ReactNode, color?: string }`

---

## 8. Backend API

### 8.1 Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/excel/upload` | Recibe archivo .xlsx via multipart/form-data. Retorna JSON con todas las fichas parseadas. |
| `GET` | `/api/excel/health` | Health check |

### 8.2 Flujo de carga

1. Frontend envía archivo via `POST /api/excel/upload` (multipart, campo `file`)
2. Backend con Multer recibe el archivo en memoria
3. `excel.service.ts` lee con xlsx (SheetJS):
   - Abre el workbook
   - Toma la primera hoja (índice 0, nombre "Reporte")
   - Salta las primeras 4 filas (metadata)
   - Fila 5 = encabezados (se mapean a los campos camelCase)
   - Filas 6+ = datos (se parsean a array de `Ficha`)
4. Responde con `{ fichas: Ficha[], total: number }`
5. Frontend almacena en Zustand store y aplica filtros iniciales

### 8.3 Servidor

- Puerto: `3001` (configurable via `PORT` env)
- Frontend se sirve en puerto `5173` (Vite dev)
- CORS habilitado para `localhost:5173`
- Helmet para security headers
- Morgan para logging de requests
- Zod para validación de schemas
- Error handling middleware centralizado

### 8.4 Seguridad

```typescript
// Middleware de seguridad
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));
```

### 8.5 Validación con Zod

```typescript
import { z } from "zod";

const FichaSchema = z.object({
  codigoRegional: z.number(),
  nombreRegional: z.string(),
  codigoCentro: z.number(),
  nombreCentro: z.string(),
  identificadorFicha: z.number(),
  // ... todas las 49 columnas
});

type Ficha = z.infer<typeof FichaSchema>;
```

---

## 9. Store Zustand - Estado Global

```typescript
// Estado inicial
{
  fichas: [],              // Todos los datos crudos del Excel
  fichasFiltradas: [],     // Después de aplicar filtros
  filtros: {
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
  },
  estadisticas: {
    totalFichas: 0,
    totalAprendices: 0,
    totalCentros: 0,
    totalEmpresas: 0,
    totalInstructores: 0,
    promedioAprendicesPorFicha: 0,
  },
  datosGraficas: {
    fichasPorNivel: [],
    aprendicesPorProgramaEspecial: [],
    aprendicesPorCentro: [],
    aprendicesPorModalidad: [],
    aprendicesPorMunicipio: [],
    fichasPorEstado: [],
  },
  puntosMapa: [],
  isLoading: false,
  error: null,
  excelFileName: null,
}
```

### Implementación con Zustand 5.x

```typescript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useDashboardStore = create<DashboardState>()(
  immer((set, get) => ({
    // Estado inicial
    fichas: [],
    fichasFiltradas: [],
    filtros: { ... },
    estadisticas: { ... },
    datosGraficas: { ... },
    puntosMapa: [],
    isLoading: false,
    error: null,
    excelFileName: null,

    // Acciones
    setFichas: (fichas) => set((state) => {
      state.fichas = fichas;
      state.fichasFiltradas = fichas;
      state.estadisticas = calcularEstadisticas(fichas);
      state.datosGraficas = calcularGraficas(fichas);
      state.puntosMapa = calcularPuntosMapa(fichas);
    }),

    setFiltros: (partial) => set((state) => {
      Object.assign(state.filtros, partial);
      state.fichasFiltradas = filtrarFichas(state.fichas, state.filtros);
      state.estadisticas = calcularEstadisticas(state.fichasFiltradas);
      state.datosGraficas = calcularGraficas(state.fichasFiltradas);
      state.puntosMapa = calcularPuntosMapa(state.fichasFiltradas);
    }),

    resetFiltros: () => set((state) => {
      state.filtros = filtrosIniciales();
      state.fichasFiltradas = state.fichas;
      state.estadisticas = calcularEstadisticas(state.fichas);
      state.datosGraficas = calcularGraficas(state.fichas);
      state.puntosMapa = calcularPuntosMapa(state.fichas);
    }),

    setLoading: (loading) => set((state) => {
      state.isLoading = loading;
    }),

    setError: (error) => set((state) => {
      state.error = error;
    }),
  }))
);
```

### Acciones

- `setFichas(fichas)` - Almacena datos crudos, calcula stats iniciales, calcula gráficas, genera puntos de mapa
- `setFiltros(partial)` - Actualiza un filtro específico, luego recalcula todo
- `resetFiltros()` - Limpia todos los filtros, recalcula con todas las fichas
- `aplicarFiltros()` - Filtra `fichas` según todos los filtros activos, recalcula estadísticas, gráficas y mapa
- `setLoading(bool)` - Estado de carga
- `setError(msg)` - Mensaje de error

---

## 10. Etapas de Desarrollo

Cada etapa se entrega de forma independiente. El usuario confirma con "CONTINUAR" para avanzar.

| Etapa | Descripción | Archivos |
|---|---|---|
| **1** | Inicializar proyecto React+Vite y Express | Comandos de creación |
| **2** | Instalar dependencias frontend y backend | `package.json` ambos |
| **3** | Crear estructura de carpetas | Directorios vacíos |
| **4** | Implementar WelcomePage | `WelcomePage.tsx`, `App.tsx`, routing |
| **5** | Implementar layout y DashboardPage (estructura) | `Header`, `Sidebar`, `Footer`, `DashboardPage` |
| **6** | Crear Backend Express + endpoint upload | Server completo |
| **7** | Crear servicio de lectura Excel | `excel.service.ts`, `excel.controller.ts` |
| **8** | Crear Zustand store + types | `dashboardStore.ts`, `types/index.ts` |
| **9** | Implementar filtros dinámicos | `FilterBar.tsx`, `useFilteredData.ts` |
| **10** | Implementar gráficas | 4 componentes Chart.js |
| **11** | Implementar mapa | `MapView.tsx`, `coordinates.ts` |
| **12** | Integrar carga de Excel end-to-end | Conexión frontend-backend |
| **13** | Optimizar rendimiento | Memoización, lazy loading |
| **14** | Build de producción | Configuración build + instrucciones |

---

## 11. Comandos de Inicialización (PowerShell)

```powershell
# Etapa 1: Crear proyecto
cd C:\Users\Brandon\Desktop\Proyect

# Frontend - React + Vite + TypeScript
npm create vite@latest client -- --template react-ts
cd client
npm install

# Dependencias frontend
npm install zustand @tanstack/react-table react-hook-form zod @hookform/resolvers
npm install chart.js react-chartjs-2
npm install react-leaflet leaflet
npm install react-router-dom ky date-fns clsx tailwind-merge lucide-react
npm install react-dropzone react-helmet-async

# Dev dependencies frontend
npm install -D @types/leaflet
npm install -D tailwindcss @tailwindcss/vite
npm install -D eslint prettier
npm install -D eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

cd ..

# Backend
mkdir server
cd server
npm init -y

# Dependencias backend
npm install express multer xlsx cors helmet morgan zod dotenv
npm install -D @types/express @types/multer @types/cors @types/morgan @types/node
npm install -D typescript tsx
npm install -D nodemon

cd ..
```

## 12. Scripts package.json

### Frontend (client/package.json)

```json
{
  "name": "sena-pe04-client",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  }
}
```

### Backend (server/package.json)

```json
{
  "name": "sena-pe04-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc",
    "lint": "eslint src --ext .ts"
  }
}
```

---

## 13. Reglas de Desarrollo

1. **Una etapa a la vez.** Esperar confirmación "CONTINUAR" antes de avanzar.
2. **Código completo** en cada etapa. No omitir archivos ni usar placeholders.
3. **TypeScript estricto** en frontend. `any` solo si es absolutamente necesario.
4. **PowerShell** para todos los comandos (Windows).
5. **Rutas relativas** al directorio raíz del proyecto.
6. **Sin comentarios innecesarios** en el código. Solo JSDoc en interfaces públicas.
7. **Modularidad**: un componente por archivo. No más de 200 líneas por archivo.
8. **Responsive**: todos los componentes deben funcionar en mobile (360px) y desktop (1920px).
9. **Manejo de errores**: todos los componentes deben manejar estados vacíos y errores.
10. **Consistencia**: seguir la paleta de colores y naming conventions definidas.
