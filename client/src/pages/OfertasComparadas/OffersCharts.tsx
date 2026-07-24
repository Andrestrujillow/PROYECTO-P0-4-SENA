import { useMemo } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Layers, BarChart3, PieChart } from "lucide-react";
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

function FichasTerminadas({ fichas }: Props) {
  const data = useMemo(() => {
    const terminadas = fichas.filter((f) => f.estadoCurso?.toLowerCase().includes("terminad")).length;
    const otras = fichas.length - terminadas;
    return { terminadas, otras };
  }, [fichas]);

  const total = data.terminadas + data.otras;

  return (
    <div className="card chart-card chart-accent-green">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-green/10 border border-sena-green/10">
            <Layers className="w-4 h-4 text-sena-green" />
          </div>
          <h3 className="chart-card-title">Fichas Terminadas</h3>
        </div>
        <span className="badge badge-green">{total.toLocaleString("es-CO")} total</span>
      </div>
      <div className="chart-card-body">
        {total > 0 ? (
          <>
            <Doughnut
              data={{
                labels: ["Terminadas", "Otras"],
                datasets: [{
                  data: [data.terminadas, data.otras],
                  backgroundColor: ["#00843D", "#1C2D42"],
                  borderColor: "#111D2E",
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
                <p className="text-2xl font-bold text-sena-white">{total.toLocaleString("es-CO")}</p>
                <p className="text-[9px] text-sena-gray/40 font-semibold uppercase tracking-wider">Total</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Layers className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparacionEstado({ fichas }: Props) {
  const data = useMemo(() => agruparSuma(fichas, (f) => f.estadoCurso || "Sin dato", (f) => f.totalAprendices), [fichas]);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [{
      label: "Aprendices",
      data: data.map((d) => d.value),
      backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  return (
    <div className="card chart-card chart-accent-blue">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-blue-400/10 border border-blue-400/10">
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="chart-card-title">Comparación Estado de Aprendices</h3>
        </div>
      </div>
      <div className="chart-card-body">
        {data.length > 0 ? (
          <Bar data={chartData} options={defaultOptions} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <BarChart3 className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TotalFichasChart({ fichas }: Props) {
  const data = useMemo(() => agruparPor(fichas, (f) => f.nivelFormacion), [fichas]);
  const total = fichas.length;

  return (
    <div className="card chart-card chart-accent-yellow">
      <div className="chart-card-header">
        <div className="chart-card-title-group">
          <div className="chart-card-icon bg-sena-yellow/10 border border-sena-yellow/10">
            <PieChart className="w-4 h-4 text-sena-yellow" />
          </div>
          <h3 className="chart-card-title">Total de Fichas</h3>
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
                  borderColor: "#111D2E",
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
                <p className="text-2xl font-bold text-sena-white">{total.toLocaleString("es-CO")}</p>
                <p className="text-[9px] text-sena-gray/40 font-semibold uppercase tracking-wider">Fichas</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <PieChart className="w-8 h-8 text-sena-gray/15" />
            <span className="text-[11px] text-sena-gray/25">Sin datos</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OffersCharts({ fichas }: Props) {
  return (
    <>
      <div className="chart-grid-2">
        <FichasTerminadas fichas={fichas} />
        <ComparacionEstado fichas={fichas} />
      </div>
      <TotalFichasChart fichas={fichas} />
    </>
  );
}
