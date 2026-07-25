import { Bar } from "react-chartjs-2";
import { useDashboardStore } from "../../store/dashboardStore";
import { CHART_COLORS, barOptions } from "./chartConfig";

export default function AprendicesPorCentro() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorCentro);
  const top6 = data.slice(0, 6);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <h3 className="text-xs font-semibold text-gray-600 mb-3">Aprendices por Centro</h3>
      {top6.length > 0 ? (
        <div style={{ height: 130 }}>
          <Bar
            data={{
              labels: top6.map((d) =>
                d.label.length > 22 ? d.label.slice(0, 20) + "…" : d.label
              ),
              datasets: [{
                data: top6.map((d) => d.value),
                backgroundColor: CHART_COLORS[0] + "B0",
                borderRadius: 3,
              }],
            }}
            options={barOptions}
          />
        </div>
      ) : (
        <div style={{ height: 130 }} className="flex items-center justify-center">
          <span className="text-[10px] text-gray-300">Sin datos</span>
        </div>
      )}
    </div>
  );
}
