import { useMemo } from "react";
import EChart, { CHART_COLORS } from "./EChart";

function isDark(): boolean {
  return !document.documentElement.classList.contains("light");
}

interface TimeSeriesItem {
  name: string;
  data: number[];
  color?: string;
}

interface TimeSeriesChartProps {
  categories: string[];
  series: TimeSeriesItem[];
  height?: number;
}

export default function TimeSeriesChart({ categories, series, height = 280 }: TimeSeriesChartProps) {
  const option = useMemo(() => {
    const d = isDark();
    return {
      tooltip: { trigger: "axis", backgroundColor: d ? "rgba(20,20,20,0.96)" : "rgba(255,255,255,0.96)", borderColor: d ? "rgba(30,30,30,0.6)" : "rgba(229,229,229,0.7)", borderWidth: 1, textStyle: { color: d ? "#e8e8e8" : "#1a1a1a", fontSize: 11 } },
      legend: { data: series.map(s => s.name), bottom: 0, textStyle: { color: d ? "#8a8a8a" : "#555555", fontSize: 10 }, icon: "circle", itemWidth: 6, itemHeight: 6 },
      grid: { top: 10, right: 10, bottom: 40, left: 45 },
      xAxis: { type: "category", data: categories, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: d ? "#555555" : "#888888", fontSize: 10 } },
      yAxis: { type: "value", splitLine: { lineStyle: { color: d ? "rgba(30,30,30,0.3)" : "rgba(212,212,212,0.3)", type: "dashed" } }, axisLabel: { color: d ? "#555555" : "#888888", fontSize: 10 } },
      series: series.map((s, i) => ({
        type: "line",
        smooth: true,
        name: s.name,
        data: s.data,
        symbol: "circle",
        symbolSize: 4,
        lineStyle: { width: 2, color: s.color || CHART_COLORS[i] },
        areaStyle: { color: s.color || CHART_COLORS[i], opacity: 0.08 },
        itemStyle: { color: s.color || CHART_COLORS[i] },
      })),
    };
  }, [categories, series]);

  return <EChart option={option} height={height} />;
}
