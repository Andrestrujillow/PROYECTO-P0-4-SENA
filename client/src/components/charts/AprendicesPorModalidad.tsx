import { Bar } from "react-chartjs-2";
import { useDashboardStore } from "../../store/dashboardStore";
import { CHART_COLORS, barOptions } from "./chartConfig";

export default function AprendicesPorModalidad() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorModalidad);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <h3 className="text-xs font-semibold text-gray-600 mb-3">Aprendices por Modalidad</h3>
      {data.length > 0 ? (
        <div style={{ height: 100 }}>
          <Bar
            data={{
              labels: data.map((d) => d.label),
              datasets: [{
                data: data.map((d) => d.value),
                backgroundColor: data.map((_, i) => CHART_COLORS[i % CHART_COLORS.length] + "B0"),
                borderRadius: 3,
              }],
            }}
            options={barOptions}
          />
        </div>
      ) : (
        <div style={{ height: 100 }} className="flex items-center justify-center">
          <span className="text-[10px] text-gray-300">Sin datos</span>
        </div>
      )}
    </div>
  );
}
