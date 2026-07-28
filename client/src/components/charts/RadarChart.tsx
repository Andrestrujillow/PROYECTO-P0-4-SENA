import { useMemo } from "react";
import EChart, { CHART_COLORS } from "./EChart";

function isDark(): boolean {
  return !document.documentElement.classList.contains("light");
}

interface RadarSeries {
  name: string;
  data: number[];
  color?: string;
}

interface RadarChartProps {
  indicators: string[];
  series: RadarSeries[];
  height?: number;
}

export default function RadarChart({ indicators, series, height = 280 }: RadarChartProps) {
  const option = useMemo(() => {
    const d = isDark();
    return {
      radar: {
        indicator: indicators.map((name) => ({ name, max: 100 })),
        radius: "65%",
        axisName: { color: d ? "#8a8a8a" : "#555555", fontSize: 10, fontWeight: 600 },
        splitArea: { areaStyle: { color: ["rgba(0,132,61,0.02)", "rgba(0,132,61,0.06)"] } },
        axisLine: { lineStyle: { color: d ? "rgba(30,30,30,0.5)" : "rgba(212,212,212,0.5)" } },
        splitLine: { lineStyle: { color: d ? "rgba(30,30,30,0.3)" : "rgba(212,212,212,0.3)" } },
      },
      series: series.map((s, i) => ({
        type: "radar",
        data: [{ value: s.data }],
        name: s.name,
        symbol: "none",
        lineStyle: { width: 2, color: s.color || CHART_COLORS[i] },
        areaStyle: { color: s.color || CHART_COLORS[i], opacity: 0.12 },
        itemStyle: { color: s.color || CHART_COLORS[i] },
      })),
      tooltip: { trigger: "item", backgroundColor: d ? "rgba(20,20,20,0.96)" : "rgba(255,255,255,0.96)", borderColor: d ? "rgba(30,30,30,0.6)" : "rgba(229,229,229,0.7)", borderWidth: 1, textStyle: { color: d ? "#e8e8e8" : "#1a1a1a", fontSize: 11 } },
    };
  }, [indicators, series]);

  return <EChart option={option} height={height} />;
}
