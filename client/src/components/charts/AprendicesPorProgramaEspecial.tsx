import { Bar } from "react-chartjs-2";
import { useDashboardStore } from "../../store/dashboardStore";
import { CHART_COLORS, barOptions } from "./chartConfig";

export default function AprendicesPorProgramaEspecial() {
  const data = useDashboardStore((s) => s.datosGraficas.aprendicesPorProgramaEspecial);
  const top6 = data.slice(0, 6);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <h3 className="text-xs font-semibold text-gray-600 mb-3">Programas Especiales</h3>
      {top6.length > 0 ? (
        <div style={{ height: 130 }}>
          <Bar
            data={{
              labels: top6.map((d) =>
                d.label.length > 16 ? d.label.slice(0, 14) + "…" : d.label
              ),
              datasets: [{
                data: top6.map((d) => d.value),
                backgroundColor: top6.map((_, i) => CHART_COLORS[i % CHART_COLORS.length] + "B0"),
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
