import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl";

/* ═══ Shared dark theme config ═══ */
const DARK_THEME = {
  color: [
    "#34D399", "#60A5FA", "#A78BFA", "#FB923C", "#F472B6",
    "#2DD4BF", "#FBBF24", "#818CF8", "#FB7185", "#4ADE80",
  ],
  backgroundColor: "transparent",
  textStyle: { color: "#94A3B8", fontFamily: "Inter, system-ui, sans-serif" },
  title: { textStyle: { color: "#F1F5F9", fontWeight: 700, fontSize: 14 } },
  legend: {
    textStyle: { color: "#94A3B8", fontSize: 11 },
    pageTextStyle: { color: "#94A3B8" },
    inactiveColor: "#334155",
  },
  tooltip: {
    backgroundColor: "rgba(15, 21, 32, 0.95)",
    borderColor: "rgba(30, 41, 59, 0.6)",
    textStyle: { color: "#F1F5F9", fontSize: 12 },
    extraCssText: "backdrop-filter: blur(8px); border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);",
  },
  xAxis: {
    axisLine: { lineStyle: { color: "#1E293B" } },
    axisTick: { lineStyle: { color: "#1E293B" } },
    axisLabel: { color: "#64748B", fontSize: 10 },
    splitLine: { lineStyle: { color: "rgba(30, 41, 59, 0.5)", type: "dashed" } },
  },
  yAxis: {
    axisLine: { lineStyle: { color: "#1E293B" } },
    axisTick: { lineStyle: { color: "#1E293B" } },
    axisLabel: { color: "#64748B", fontSize: 10 },
    splitLine: { lineStyle: { color: "rgba(30, 41, 59, 0.5)", type: "dashed" } },
  },
};

/* ═══ Gradient helpers ═══ */
function makeGradient(color: string, vertical = true) {
  return new echarts.graphic.LinearGradient(
    vertical ? 0 : 0, vertical ? 1 : 0,
    vertical ? 0 : 1, vertical ? 0 : 0,
    [
      { offset: 0, color: color + "FF" },
      { offset: 1, color: color + "33" },
    ]
  );
}

/* ═══ Wrapper component ═══ */
interface EChartProps {
  option: Record<string, unknown>;
  height?: string | number;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  className?: string;
}

export default function EChart({ option, height = "100%", notMerge = false, lazyUpdate = false, className }: EChartProps) {
  const mergedOption = {
    ...DARK_THEME,
    ...option,
    tooltip: {
      ...DARK_THEME.tooltip,
      ...(option.tooltip as Record<string, unknown> || {}),
    },
    animationDuration: 600,
    animationEasing: "cubicOut",
  };

  return (
    <ReactECharts
      echarts={echarts}
      option={mergedOption}
      style={{ height, width: "100%" }}
      className={className}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      opts={{ renderer: "canvas" }}
    />
  );
}

/* ═══ Reusable chart option builders ═══ */

export function bar3DOption(
  categories: string[],
  values: number[],
  colors?: string[]
) {
  const data = values.map((v, i) => [i, 0, v]);
  return {
    tooltip: {},
    visualMap: { show: false, inRange: { color: colors || DARK_THEME.color } },
    xAxis3D: {
      type: "category",
      data: categories,
      axisLabel: { color: "#94A3B8", fontSize: 9, interval: 0, rotate: 30 },
      axisLine: { lineStyle: { color: "#334155" } },
    },
    yAxis3D: { type: "value", show: false },
    zAxis3D: { type: "value", axisLabel: { color: "#64748B" } },
    grid3D: {
      boxWidth: 120,
      boxDepth: 60,
      boxHeight: 80,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 6, distance: 200 },
      light: { main: { intensity: 1.2, shadow: true, shadowQuality: "medium", alpha: 40, beta: 40 } },
      environment: "transparent",
      axisLine: { lineStyle: { color: "#334155" } },
      axisPointer: { lineStyle: { color: "#475569" } },
      axisTick: { lineStyle: { color: "#334155" } },
      splitLine: { lineStyle: { color: "#1E293B" } },
      splitArea: { show: false },
    },
    series: [{
      type: "bar3D",
      data,
      shading: "realistic",
      realisticMaterial: { roughness: 0.3, metalness: 0.1 },
      barSize: 18,
      label: { show: false },
      itemStyle: { opacity: 0.92 },
      emphasis: { itemStyle: { opacity: 1 }, label: { show: true, color: "#F1F5F9", fontSize: 11, formatter: "{c}" } },
    }],
  };
}

export function bar3DHorizontalOption(
  categories: string[],
  values: number[],
  barColors?: string[]
) {
  const data = values.map((v, i) => [0, i, v]);
  return {
    tooltip: {},
    xAxis3D: { type: "value", show: false },
    yAxis3D: {
      type: "category",
      data: categories,
      axisLabel: { color: "#94A3B8", fontSize: 10, interval: 0 },
      axisLine: { lineStyle: { color: "#334155" } },
    },
    zAxis3D: { type: "value" },
    grid3D: {
      boxWidth: 60,
      boxDepth: 120,
      boxHeight: 80,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 4, distance: 220 },
      light: { main: { intensity: 1.2, shadow: true, shadowQuality: "medium", alpha: 30, beta: 60 } },
      environment: "transparent",
      axisLine: { lineStyle: { color: "#334155" } },
      splitLine: { lineStyle: { color: "#1E293B" } },
      splitArea: { show: false },
    },
    visualMap: { show: false, inRange: { color: barColors || DARK_THEME.color } },
    series: [{
      type: "bar3D",
      data,
      shading: "realistic",
      realisticMaterial: { roughness: 0.3, metalness: 0.1 },
      barSize: 14,
      label: { show: false },
      itemStyle: { opacity: 0.92 },
      emphasis: { itemStyle: { opacity: 1 }, label: { show: true, color: "#F1F5F9", fontSize: 11, formatter: "{c}" } },
    }],
  };
}

export function pie3DOption(
  data: { name: string; value: number; color: string }[],
  radius = 0.65
) {
  return {
    tooltip: {
      formatter: (p: { name: string; value: number; percent: number }) =>
        `${p.name}: ${p.value.toLocaleString("es-CO")} (${p.percent}%)`,
    },
    xAxis3D: { type: "value", show: false },
    yAxis3D: { type: "value", show: false },
    zAxis3D: { type: "value", show: false },
    grid3D: {
      boxWidth: 120,
      boxDepth: 120,
      boxHeight: 60,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 8, distance: 180 },
      light: { main: { intensity: 1.5, shadow: true, shadowQuality: "medium", alpha: 30, beta: 50 } },
      environment: "transparent",
      axisLine: { show: false },
      axisPointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      splitArea: { show: false },
    },
    series: [{
      type: "pie3D",
      radius: [0, radius * 80],
      center: ["50%", "50%"],
      data: data.map((d) => ({
        name: d.name,
        value: d.value,
        itemStyle: { color: d.color },
      })),
      label: { show: false },
      emphasis: {
        label: { show: true, color: "#F1F5F9", fontSize: 12, fontWeight: 600 },
        itemStyle: { shadowBlur: 20, shadowColor: "rgba(0,0,0,0.5)" },
      },
      animationDurationUpdate: 800,
    }],
  };
}

export function donut2DOption(
  data: { name: string; value: number; color: string }[],
  total?: number
) {
  return {
    tooltip: {
      trigger: "item",
      formatter: (p: { name: string; value: number; percent: number }) =>
        `${p.name}: ${p.value.toLocaleString("es-CO")} (${p.percent}%)`,
    },
    legend: {
      orient: "vertical",
      right: "5%",
      top: "center",
      textStyle: { color: "#94A3B8", fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 12,
    },
    series: [{
      type: "pie",
      radius: ["48%", "72%"],
      center: ["35%", "50%"],
      avoidLabelOverlap: false,
      padAngle: 2,
      itemStyle: {
        borderRadius: 6,
        borderColor: "#0f1520",
        borderWidth: 3,
      },
      label: { show: false },
      emphasis: {
        label: { show: true, color: "#F1F5F9", fontSize: 13, fontWeight: 700, formatter: "{b}\n{d}%" },
        scaleSize: 8,
      },
      data: data.map((d) => ({
        name: d.name,
        value: d.value,
        itemStyle: { color: d.color },
      })),
    }],
    ...(total != null ? {
      graphic: [{
        type: "group",
        left: "28%",
        top: "center",
        children: [
          { type: "text", style: { text: total.toLocaleString("es-CO"), textAlign: "center", fill: "#F1F5F9", fontSize: 22, fontWeight: 700, fontFamily: "Inter, system-ui" }, left: "center", top: -12 },
          { type: "text", style: { text: "TOTAL", textAlign: "center", fill: "#64748B", fontSize: 10, fontWeight: 600, fontFamily: "Inter, system-ui", letterSpacing: 1 }, left: "center", top: 14 },
        ],
      }],
    } : {}),
  };
}

export function bar2DOption(
  categories: string[],
  values: number[],
  opts?: { horizontal?: boolean; barColor?: string; showLabels?: boolean; stacked?: boolean; series?: { name: string; data: number[]; color: string }[] }
) {
  const isH = opts?.horizontal;
  const singleColor = opts?.barColor || DARK_THEME.color[0];

  if (opts?.series) {
    // Stacked bar
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: {
        top: 0,
        textStyle: { color: "#94A3B8", fontSize: 10 },
        itemWidth: 10, itemHeight: 10,
      },
      grid: { left: 8, right: 14, top: 30, bottom: 4, containLabel: true },
      xAxis: { type: "category", data: categories, axisLabel: { color: "#64748B", fontSize: 9, rotate: isH ? 0 : 20 }, axisLine: { lineStyle: { color: "#1E293B" } }, splitLine: { show: false } },
      yAxis: { type: "value", axisLabel: { color: "#64748B", fontSize: 9 }, splitLine: { lineStyle: { color: "rgba(30,41,59,0.5)", type: "dashed" } } },
      series: opts.series.map((s) => ({
        name: s.name,
        type: "bar",
        stack: "total",
        data: s.data,
        itemStyle: { color: s.color, borderRadius: [0, 0, 0, 0] },
        emphasis: { focus: "series" },
        barMaxWidth: 32,
      })),
    };
  }

  if (isH) {
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      grid: { left: 8, right: 30, top: 8, bottom: 4, containLabel: true },
      xAxis: { type: "value", axisLabel: { color: "#64748B", fontSize: 9 }, splitLine: { lineStyle: { color: "rgba(30,41,59,0.5)", type: "dashed" } } },
      yAxis: { type: "category", data: categories, inverse: true, axisLabel: { color: "#94A3B8", fontSize: 10, width: 120, overflow: "truncate" }, axisLine: { lineStyle: { color: "#1E293B" } } },
      series: [{
        type: "bar",
        data: values.map((v, i) => ({
          value: v,
          itemStyle: {
            color: makeGradient(DARK_THEME.color[i % DARK_THEME.color.length], false),
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barMaxWidth: 18,
        label: opts?.showLabels ? { show: true, position: "right", color: "#94A3B8", fontSize: 10, formatter: "{c}" } : undefined,
        emphasis: { itemStyle: { shadowBlur: 12, shadowColor: "rgba(0,0,0,0.3)" } },
      }],
    };
  }

  return {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: 8, right: 14, top: 8, bottom: 4, containLabel: true },
    xAxis: { type: "category", data: categories, axisLabel: { color: "#64748B", fontSize: 9, rotate: 25, interval: 0 }, axisLine: { lineStyle: { color: "#1E293B" } } },
    yAxis: { type: "value", axisLabel: { color: "#64748B", fontSize: 9 }, splitLine: { lineStyle: { color: "rgba(30,41,59,0.5)", type: "dashed" } } },
    series: [{
      type: "bar",
      data: values.map((v) => ({
        value: v,
        itemStyle: {
          color: makeGradient(singleColor),
          borderRadius: [4, 4, 0, 0],
        },
      })),
      barMaxWidth: 28,
      label: opts?.showLabels ? { show: true, position: "top", color: "#94A3B8", fontSize: 10, formatter: "{c}" } : undefined,
      emphasis: { itemStyle: { shadowBlur: 12, shadowColor: "rgba(0,0,0,0.3)" } },
    }],
  };
}

export function lineAreaOption(
  categories: string[],
  series: { name: string; data: number[]; color: string }[],
  stacked = false
) {
  return {
    tooltip: { trigger: "axis" },
    legend: {
      top: 0,
      textStyle: { color: "#94A3B8", fontSize: 10 },
      itemWidth: 10, itemHeight: 10,
    },
    grid: { left: 8, right: 14, top: 30, bottom: 4, containLabel: true },
    xAxis: { type: "category", data: categories, boundaryGap: false, axisLabel: { color: "#64748B", fontSize: 9 }, axisLine: { lineStyle: { color: "#1E293B" } } },
    yAxis: { type: "value", axisLabel: { color: "#64748B", fontSize: 9 }, splitLine: { lineStyle: { color: "rgba(30,41,59,0.5)", type: "dashed" } } },
    series: series.map((s) => ({
      name: s.name,
      type: "line",
      stack: stacked ? "total" : undefined,
      smooth: 0.4,
      symbol: "circle",
      symbolSize: 5,
      lineStyle: { width: 2.5, color: s.color },
      itemStyle: { color: s.color },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: s.color + "44" },
          { offset: 1, color: s.color + "05" },
        ]),
      },
      emphasis: { focus: "series" },
      data: s.data,
    })),
  };
}

export { DARK_THEME, makeGradient, echarts };
