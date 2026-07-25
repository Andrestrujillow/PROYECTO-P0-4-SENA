import { useMemo } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Target, Layers, MapPin } from "lucide-react";
import type { Ficha } from "../../types";
import { CHART_COLORS, defaultOptions } from "../../components/charts/chartConfig";

interface Props {
  fichas: Ficha[];
}

function agruparSuma(fichas: Ficha[], extractor: (f: Ficha) => string, sum: (f: Ficha) => number) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    const k = extractor(f);
    if (k) map.set(k, (map.get(k) || 0) + sum(f));
  });
  return Array.from(map.entries()).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function agruparPor(fichas: Ficha[], extractor: (f: Ficha) => string) {
  const map = new Map<string, number>();
  fichas.forEach((f) => {
    const k = extractor(f);
    if (k) map.set(k, (map.get(k) || 0) + 1);
  });
  return Array.from(map.entries()).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function AprendicesPorEstrategia({ fichas }: Props) {
  const data = useMemo(() => agruparSuma(
    fichas.filter((f) => f.nombreProgramaEspecial),
    (f) => f.nombreProgramaEspecial,
    (f) => f.totalAprendices
  ), [fichas]);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [{
      label: "Aprendices",
      data: data.map((d) => d.value),
      backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  return (
    <div className="card chart-card chart-accent-purple">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-purple-400/10 border border-purple-400/10">
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="chart-card-title">Aprendices por Estrategia Institucional</h3>
        </div>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <Bar data={chartData} options={defaultOptions} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Target className="w-12 h-12 text-text-muted" />
            <span className="text-sm text-text-muted">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AprendicesPorNivel({ fichas }: Props) {
  const data = useMemo(() => agruparSuma(fichas, (f) => f.nivelFormacion, (f) => f.totalAprendices), [fichas]);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card chart-card chart-accent-green">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-green/10 border border-sena-green/10">
            <Layers className="w-5 h-5 text-sena-green" />
          </div>
          <h3 className="chart-card-title">Aprendices por Nivel de Formación</h3>
        </div>
        <span className="badge badge-green">{total.toLocaleString("es-CO")} total</span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <>
            <Doughnut
              data={{
                labels: data.map((d) => d.label),
                datasets: [{
                  data: data.map((d) => d.value),
                  backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
                  borderColor: "#ffffff",
                  borderWidth: 3,
                  hoverOffset: 8,
                }],
              }}
              options={{
                ...defaultOptions,
                cutout: "62%",
                plugins: {
                  ...defaultOptions.plugins,
                  legend: { ...defaultOptions.plugins.legend, position: "right" as const },
                },
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginRight: "25%" }}>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-text-primary">{total.toLocaleString("es-CO")}</p>
                <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">Aprendices</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Layers className="w-12 h-12 text-text-muted" />
            <span className="text-sm text-text-muted">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MunicipiosPorSubregion({ fichas }: Props) {
  const data = useMemo(() => {
    const all = agruparPor(fichas, (f) => f.nombreMunicipioCurso);
    const top10 = all.slice(0, 10);
    const restCount = all.slice(10).reduce((s, d) => s + d.value, 0);
    if (restCount > 0) top10.push({ label: "Otros", value: restCount });
    return top10;
  }, [fichas]);
  const total = fichas.length;

  return (
    <div className="card chart-card chart-accent-yellow">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-yellow/10 border border-sena-yellow/10">
            <MapPin className="w-5 h-5 text-sena-yellow" />
          </div>
          <h3 className="chart-card-title">Municipios por Subregión</h3>
        </div>
        <span className="badge badge-yellow">{total.toLocaleString("es-CO")} total</span>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <>
            <Doughnut
              data={{
                labels: data.map((d) => d.label),
                datasets: [{
                  data: data.map((d) => d.value),
                  backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
                  borderColor: "#ffffff",
                  borderWidth: 3,
                  hoverOffset: 8,
                }],
              }}
              options={{
                ...defaultOptions,
                cutout: "62%",
                plugins: {
                  ...defaultOptions.plugins,
                  legend: { ...defaultOptions.plugins.legend, position: "right" as const },
                },
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginRight: "25%" }}>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-text-primary">{total.toLocaleString("es-CO")}</p>
                <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">Municipios</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <MapPin className="w-12 h-12 text-text-muted" />
            <span className="text-sm text-text-muted">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StrategiesCharts({ fichas }: Props) {
  return (
    <>
      <div className="chart-grid-2">
        <AprendicesPorEstrategia fichas={fichas} />
        <AprendicesPorNivel fichas={fichas} />
      </div>
      <MunicipiosPorSubregion fichas={fichas} />
    </>
  );
}
