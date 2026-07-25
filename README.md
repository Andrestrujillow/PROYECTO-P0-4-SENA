# SENA PE-04 Dashboard

Single-page application for visualization and analysis of the PE-04 report (Programacion Especifica de Cursos Largos, Especiales y Eventos) from SENA Regional Cauca.

## Overview

The application parses Excel files (.xlsx) containing PE-04 report data and renders interactive dashboards with charts, maps, filterable tables, and KPIs. All processing is client-side -- no backend server.

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | TypeScript | 6.x |
| Framework | React | 19.x |
| Bundler | Vite | 8.x |
| CSS | Tailwind CSS | 4.x |
| State | Zustand | 5.x |
| Charts | Chart.js + react-chartjs-2 | 4.x / 5.x |
| Maps | Leaflet + react-leaflet | 1.9.x / 5.x |
| Tables | TanStack Table | 8.x |
| Animations | GSAP | 3.x |
| Excel parsing | xlsx (SheetJS) | 0.18.x |
| Icons | Lucide React | 1.x |
| Forms | React Hook Form + Zod | 7.x / 4.x |
| Routing | React Router | 7.x |
| Deploy | Vercel | -- |

## Project Structure

```
PROYECTO-P0-4-SENA/
├── client/
│   ├── public/
│   │   └── logoSena.svg
│   ├── src/
│   │   ├── main.tsx                 # Entry point
│   │   ├── App.tsx                  # Router + Layout
│   │   ├── index.css                # Design system + Tailwind
│   │   ├── types/index.ts           # TypeScript interfaces
│   │   ├── store/dashboardStore.ts  # Zustand global state
│   │   ├── lib/cn.ts               # clsx + tailwind-merge
│   │   ├── hooks/                   # useGSAP, useFilteredData, useStats
│   │   ├── services/                # api.ts (ky instance)
│   │   ├── utils/                   # mapping, formatters, coordinates
│   │   ├── components/
│   │   │   ├── layout/              # Header, Sidebar, Footer, Layout
│   │   │   ├── cards/               # StatCard (KPI cards)
│   │   │   ├── charts/              # chartConfig + 4 chart components
│   │   │   ├── filters/             # FilterBar (12 dynamic filters)
│   │   │   ├── icons/               # Animated icon components (6)
│   │   │   ├── map/                 # MapView (Leaflet, tier colors)
│   │   │   ├── table/               # DataTable (TanStack, responsive)
│   │   │   └── ui/                  # FileUpload, LoadingSpinner
│   │   └── pages/
│   │       ├── Inicio/              # WelcomePage (landing)
│   │       ├── Dashboard/           # Main dashboard
│   │       ├── OfertasComparadas/   # Comparative offers analysis
│   │       ├── Comportamiento/      # Behavior/trends analysis
│   │       ├── OfertaEspecial/      # Special programs analysis
│   │       └── EstrategiasInstitucionales/  # Institutional strategies
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vercel.json
│   └── package.json
├── Referencia del proyecto/
│   └── PE-04_1 junio.xlsx          # Source Excel file
├── AGENTS.md                        # Agent instructions
├── package.json                     # Root scripts (dev, build)
└── README.md
```

## Data Schema

The application reads Excel files with 53 columns starting at row 5. Key fields:

| Field | Type | Description |
|---|---|---|
| `identificadorFicha` | number | Unique record ID |
| `nombreCentro` | string | Training center name |
| `nombreProgramaFormacion` | string | Training program |
| `nivelFormacion` | string | AUXILIAR / TECNICO / TECNOLOGO / CURSO ESPECIAL / EVENTO |
| `estadoCurso` | string | En ejecucion / Terminada / TERMINADO |
| `modalidadFormacion` | string | PRESENCIAL / VIRTUAL / A DISTANCIA |
| `etapaFicha` | string | LECTIVA / PRACTICA |
| `nombreEmpresa` | string | Company name |
| `nombreMunicipioCurso` | string | Municipality |
| `nombreSectorPrograma` | string | Sector (PRIMARIO, INDUSTRIA, COMERCIO, SERVICIOS, etc.) |
| `totalAprendices` | number | Total learners |
| `totalAprendicesActivos` | number | Active learners |
| `fechaInicioFicha` | string | Start date (DD/MM/YYYY) |
| `fechaTerminacionFicha` | string | End date (DD/MM/YYYY) |

Full schema with 53 fields is defined in `client/src/types/index.ts`.

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | WelcomePage | Landing page with file upload entry |
| `/dashboard` | DashboardPage | Main dashboard: KPIs, filters, charts, map, data table |
| `/ofertas-comparadas` | OfertasComparadasPage | Comparative offers with gender breakdown |
| `/comportamiento` | ComportamientoPage | Behavior analysis: desertion, trends by year/sector |
| `/oferta-especial` | OfertaEspecialPage | Special programs (TecnoAcademia, CAMPESENA, etc.) |
| `/estrategias` | EstrategiasPage | Institutional strategies with geographic distribution |

## Design System

Custom tokens defined in `index.css`:

- **Cards**: `section-card` -- consistent white card with rounded corners and border
- **KPIs**: `stat-card`, `stat-card-icon`, `stat-card-value`, `stat-card-label`, `stat-card-accent` with color variants (blue, green, purple, orange, teal)
- **Charts**: `chart-card`, `chart-card-header`, `chart-card-body`, `chart-card-icon`, `chart-card-title`
- **Filters**: `filter-chip` with per-type color variants
- **Animations**: `scaleIn`, `fadeInUp`, `fadeInDown`, `pulse-soft`, `animate-scale-in`
- **Navigation**: Floating glassmorphism pill (desktop: left sidebar, mobile: bottom bar)

Color palette uses CSS custom properties for SENA brand colors and a semantic layer for text, borders, and backgrounds.

## Charts

Unified lime green palette (`#7CB342` family) with Chart.js:

- **FichasPorNivel** -- Doughnut chart of records by training level
- **AprendicesPorModalidad** -- Pie chart of learners by modality
- **AprendicesPorProgramaEspecial** -- Bar chart of learners by special program
- **AprendicesPorCentro** -- Horizontal bar chart of learners by center

Module-specific charts use the same palette via `chartConfig.ts`.

## Map

Leaflet-based geographic visualization:

- Centered on Popayan (2.4448, -76.6147), zoom 10
- Tier-based marker colors: green (100+ records), violet (20-99), amber (<20)
- FitBounds auto-zoom to marker extent
- Dark map tiles with CSS filter
- Styled popups showing municipality, record count, and total learners
- Coordinate reference table for 30+ Cauca municipalities in `utils/coordinates.ts`

## Getting Started

### Prerequisites

- Node.js 22.x LTS
- npm 10.x

### Installation

```bash
cd client
npm install
```

### Development

```bash
npm run dev
```

Vite dev server starts at `http://localhost:5173`.

### Build

```bash
npm run build
```

Outputs optimized static files to `client/dist/`.

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## Deployment

Configured for Vercel. The `client/vercel.json` handles SPA rewrites:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Vercel auto-detects the `client/` directory as the build root.

## State Management

Zustand store (`dashboardStore.ts`) manages:

- `fichas` -- raw Excel data
- `fichasFiltradas` -- filtered subset
- `filtros` -- active filter values (12 filter types)
- `estadisticas` -- computed KPIs
- `datosGraficas` -- computed chart data
- `puntosMapa` -- computed map markers

All derived state recomputes on filter changes via `setFiltros()`.

## Filters

12 dynamic filters generated from unique Excel values:

| Filter | Source Field |
|---|---|
| Centro | `nombreCentro` |
| Modalidad | `modalidadFormacion` |
| Nivel Formacion | `nivelFormacion` |
| Programa | `nombreProgramaFormacion` |
| Empresa | `nombreEmpresa` |
| Municipio | `nombreMunicipioCurso` |
| Programa Especial | `nombreProgramaEspecial` |
| Ano Terminacion | Derived from `fechaTerminacionFicha` |
| Estado | `estadoCurso` |
| Etapa | `etapaFicha` |
| Jornada | `nombreJornada` |
| Sector | `nombreSectorPrograma` |

## License

Private project. SENA Regional Cauca.
