import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl";

/* ═══ Theme-aware color resolver ═══ */
function getIsDark(): boolean {
  return !document.documentElement.classList.contains("light");
}

function themeColors() {
  const dark = getIsDark();
  return {
    textPrimary: dark ? "#F1F5F9" : "#0F172A",
    textSecondary: dark ? "#94A3B8" : "#475569",
    textMuted: dark ? "#64748B" : "#94A3B8",
    axisLine: dark ? "#1E293B" : "#CBD5E1",
    gridLine: dark ? "rgba(30,41,59,0.4)" : "rgba(203,213,225,0.5)",
    tooltipBg: dark ? "rgba(15,21,32,0.95)" : "rgba(255,255,255,0.96)",
    tooltipBorder: dark ? "rgba(30,41,59,0.6)" : "rgba(226,232,240,0.8)",
    tooltipText: dark ? "#F1F5F9" : "#0F172A",
    donutBorder: dark ? "#0f1520" : "#F8FAFC",
    legendInactive: dark ? "#334155" : "#CBD5E1",
    barPalette: [
      "#34D399", "#60A5FA", "#A78BFA", "#FB923C", "#F472B6",
      "#2DD4BF", "#FBBF24", "#818CF8", "#FB7185", "#4ADE80",
    ],
  };
}

/* ═══ Gradient helper ═══ */
function makeGradient(color: string, vertical = true) {
  return new echarts.graphic.LinearGradient(
    vertical ? 0 : 0, vertical ? 1 : 0,
    vertical ? 0 : 1, vertical ? 0 : 0,
    [
      { offset: 0, color: color + "FF" },
      { offset: 1, color: color + "44" },
    ]
  );
}

/* ═══ Shared tooltip config ═══ */
function tooltipConfig() {
  const t = themeColors();
  return {
    backgroundColor: t.tooltipBg,
    borderColor: t.tooltipBorder,
    textStyle: { color: t.tooltipText, fontSize: 12, fontFamily: "Inter, system-ui, sans-serif" },
    extraCssText: "backdrop-filter: blur(8px); border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.15);",
  };
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
  const t = themeColors();

  const mergedOption = useMemo(() => {
    const { tooltip: userTooltip, ...rest } = option;
    return {
      backgroundColor: "transparent",
      textStyle: { color: t.textSecondary, fontFamily: "Inter, system-ui, sans-serif" },
      animationDuration: 500,
      animationEasing: "cubicOut",
      ...rest,
      tooltip: {
        ...tooltipConfig(),
        ...(userTooltip as Record<string, unknown> || {}),
      },
    };
  }, [option, t]);

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

/* ═══ 2D Bar chart ═══ */
export function bar2DOption(
  categories: string[],
  values: number[],
  opts?: { horizontal?: boolean; barColor?: string; showLabels?: boolean; stacked?: boolean; series?: { name: string; data: number[]; color: string }[] }
) {
  const t = themeColors();
  const isH = opts?.horizontal;
  const singleColor = opts?.barColor || t.barPalette[0];

  if (opts?.series) {
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tooltipConfig() },
      legend: {
        top: 0, textStyle: { color: t.textSecondary, fontSize: 10 },
        itemWidth: 10, itemHeight: 10, itemGap: 16,
      },
      grid: { left: 8, right: 16, top: 36, bottom: 4, containLabel: true },
      xAxis: {
        type: "category", data: categories,
        axisLabel: { color: t.textMuted, fontSize: 10, rotate: isH ? 0 : 12, interval: 0 },
        axisLine: { lineStyle: { color: t.axisLine } },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: t.textMuted, fontSize: 10 },
        splitLine: { lineStyle: { color: t.gridLine, type: "dashed" } },
      },
      series: opts.series.map((s) => ({
        name: s.name, type: "bar", stack: "total",
        data: s.data,
        itemStyle: { color: s.color, borderRadius: [0, 0, 0, 0] },
        emphasis: { focus: "series" },
        barMaxWidth: 32, barGap: "10%",
      })),
    };
  }

  if (isH) {
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tooltipConfig() },
      grid: { left: 8, right: 48, top: 8, bottom: 4, containLabel: true },
      xAxis: {
        type: "value",
        axisLabel: { color: t.textMuted, fontSize: 10 },
        splitLine: { lineStyle: { color: t.gridLine, type: "dashed" } },
      },
      yAxis: {
        type: "category", data: categories, inverse: true,
        axisLabel: { color: t.textSecondary, fontSize: 11 },
        axisLine: { lineStyle: { color: t.axisLine } },
      },
      series: [{
        type: "bar",
        data: values.map((v, i) => ({
          value: v,
          itemStyle: {
            color: makeGradient(t.barPalette[i % t.barPalette.length], false),
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barMaxWidth: 20,
        label: opts?.showLabels ? {
          show: true, position: "right", color: t.textSecondary, fontSize: 11,
          formatter: (p: { value: number }) => fmtNum(p.value),
        } : undefined,
        emphasis: { itemStyle: { shadowBlur: 8, shadowColor: "rgba(0,0,0,0.12)" } },
      }],
    };
  }

  // Vertical bar
  return {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tooltipConfig() },
    grid: { left: 8, right: 12, top: 12, bottom: 8, containLabel: true },
    xAxis: {
      type: "category", data: categories,
      axisLabel: { color: t.textMuted, fontSize: 10, rotate: 15, interval: 0 },
      axisLine: { lineStyle: { color: t.axisLine } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: t.textMuted, fontSize: 10 },
      splitLine: { lineStyle: { color: t.gridLine, type: "dashed" } },
    },
    series: [{
      type: "bar",
      data: values.map((v) => ({
        value: v,
        itemStyle: { color: makeGradient(singleColor), borderRadius: [4, 4, 0, 0] },
      })),
      barMaxWidth: 28,
      label: opts?.showLabels ? {
        show: true, position: "top", color: t.textMuted, fontSize: 10,
        formatter: (p: { value: number }) => fmtNum(p.value),
      } : undefined,
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: "rgba(0,0,0,0.12)" } },
    }],
  };
}

/* ═══ Donut 2D ═══ */
export function donut2DOption(
  data: { name: string; value: number; color: string }[],
  total?: number
) {
  const t = themeColors();
  return {
    tooltip: {
      trigger: "item",
      ...tooltipConfig(),
      formatter: (p: { name: string; value: number; percent: number }) =>
        `${p.name}: ${p.value.toLocaleString("es-CO")} (${p.percent}%)`,
    },
    legend: {
      orient: "vertical", right: "4%", top: "center",
      textStyle: { color: t.textSecondary, fontSize: 11 },
      itemWidth: 10, itemHeight: 10, itemGap: 10,
    },
    series: [{
      type: "pie",
      radius: ["46%", "70%"],
      center: ["35%", "50%"],
      avoidLabelOverlap: false,
      padAngle: 2,
      itemStyle: {
        borderRadius: 6,
        borderColor: t.donutBorder,
        borderWidth: 3,
      },
      label: { show: false },
      emphasis: {
        label: { show: true, color: t.textPrimary, fontSize: 13, fontWeight: 700, formatter: "{b}\n{d}%" },
        scaleSize: 6,
      },
      data: data.map((d) => ({
        name: d.name, value: d.value,
        itemStyle: { color: d.color },
      })),
    }],
    ...(total != null ? {
      graphic: [{
        type: "group", left: "28%", top: "center",
        children: [
          {
            type: "text", left: "center", top: -12,
            style: {
              text: fmtNum(total),
              textAlign: "center", fill: t.textPrimary, fontSize: 22, fontWeight: 700,
              fontFamily: "Inter, system-ui",
            },
          },
          {
            type: "text", left: "center", top: 14,
            style: {
              text: "TOTAL", textAlign: "center", fill: t.textMuted, fontSize: 10,
              fontWeight: 600, fontFamily: "Inter, system-ui",
            },
          },
        ],
      }],
    } : {}),
  };
}

/* ═══ Line/Area ═══ */
export function lineAreaOption(
  categories: string[],
  series: { name: string; data: number[]; color: string }[],
  stacked = false
) {
  const t = themeColors();
  return {
    tooltip: { trigger: "axis", ...tooltipConfig() },
    legend: {
      top: 0, textStyle: { color: t.textSecondary, fontSize: 10 },
      itemWidth: 10, itemHeight: 10, itemGap: 16,
    },
    grid: { left: 8, right: 14, top: 36, bottom: 4, containLabel: true },
    xAxis: {
      type: "category", data: categories, boundaryGap: false,
      axisLabel: { color: t.textMuted, fontSize: 10 },
      axisLine: { lineStyle: { color: t.axisLine } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: t.textMuted, fontSize: 10 },
      splitLine: { lineStyle: { color: t.gridLine, type: "dashed" } },
    },
    series: series.map((s) => ({
      name: s.name, type: "line",
      stack: stacked ? "total" : undefined,
      smooth: 0.3,
      symbol: "circle", symbolSize: 4,
      lineStyle: { width: 2, color: s.color },
      itemStyle: { color: s.color },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: s.color + "33" },
          { offset: 1, color: s.color + "05" },
        ]),
      },
      emphasis: { focus: "series" },
      data: s.data,
    })),
  };
}

/* ═══ 3D Bar ═══ */
export function bar3DOption(categories: string[], values: number[], colors?: string[]) {
  const t = themeColors();
  const data = values.map((v, i) => [i, 0, v]);
  return {
    tooltip: {},
    visualMap: { show: false, inRange: { color: colors || t.barPalette } },
    xAxis3D: {
      type: "category", data: categories,
      axisLabel: { color: t.textSecondary, fontSize: 9, interval: 0, rotate: 30 },
      axisLine: { lineStyle: { color: t.axisLine } },
    },
    yAxis3D: { type: "value", show: false },
    zAxis3D: { type: "value", axisLabel: { color: t.textMuted } },
    grid3D: {
      boxWidth: 120, boxDepth: 60, boxHeight: 80,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 6, distance: 200 },
      light: { main: { intensity: 1.2, shadow: true, shadowQuality: "medium", alpha: 40, beta: 40 } },
      environment: "transparent",
      axisLine: { lineStyle: { color: t.axisLine } },
      axisPointer: { lineStyle: { color: t.textMuted } },
      splitLine: { lineStyle: { color: t.gridLine } },
      splitArea: { show: false },
    },
    series: [{
      type: "bar3D", data,
      shading: "realistic",
      realisticMaterial: { roughness: 0.3, metalness: 0.1 },
      barSize: 18, label: { show: false },
      itemStyle: { opacity: 0.9 },
      emphasis: { itemStyle: { opacity: 1 }, label: { show: true, color: t.textPrimary, fontSize: 11, formatter: "{c}" } },
    }],
  };
}

/* ═══ 3D Bar Horizontal ═══ */
export function bar3DHorizontalOption(categories: string[], values: number[], barColors?: string[]) {
  const t = themeColors();
  const data = values.map((v, i) => [0, i, v]);
  return {
    tooltip: {},
    xAxis3D: { type: "value", show: false },
    yAxis3D: {
      type: "category", data: categories,
      axisLabel: { color: t.textSecondary, fontSize: 10, interval: 0 },
      axisLine: { lineStyle: { color: t.axisLine } },
    },
    zAxis3D: { type: "value" },
    grid3D: {
      boxWidth: 60, boxDepth: 120, boxHeight: 80,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 4, distance: 220 },
      light: { main: { intensity: 1.2, shadow: true, shadowQuality: "medium", alpha: 30, beta: 60 } },
      environment: "transparent",
      axisLine: { lineStyle: { color: t.axisLine } },
      splitLine: { lineStyle: { color: t.gridLine } },
      splitArea: { show: false },
    },
    visualMap: { show: false, inRange: { color: barColors || t.barPalette } },
    series: [{
      type: "bar3D", data,
      shading: "realistic",
      realisticMaterial: { roughness: 0.3, metalness: 0.1 },
      barSize: 14, label: { show: false },
      itemStyle: { opacity: 0.9 },
      emphasis: { itemStyle: { opacity: 1 }, label: { show: true, color: t.textPrimary, fontSize: 11, formatter: "{c}" } },
    }],
  };
}

/* ═══ 3D Pie ═══ */
export function pie3DOption(data: { name: string; value: number; color: string }[], radius = 0.65) {
  return {
    tooltip: {
      formatter: (p: { name: string; value: number; percent: number }) =>
        `${p.name}: ${p.value.toLocaleString("es-CO")} (${p.percent}%)`,
    },
    xAxis3D: { type: "value", show: false },
    yAxis3D: { type: "value", show: false },
    zAxis3D: { type: "value", show: false },
    grid3D: {
      boxWidth: 120, boxDepth: 120, boxHeight: 60,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 8, distance: 180 },
      light: { main: { intensity: 1.5, shadow: true, shadowQuality: "medium", alpha: 30, beta: 50 } },
      environment: "transparent",
      axisLine: { show: false }, axisPointer: { show: false },
      axisTick: { show: false }, splitLine: { show: false }, splitArea: { show: false },
    },
    series: [{
      type: "pie3D",
      radius: [0, radius * 80],
      center: ["50%", "50%"],
      data: data.map((d) => ({ name: d.name, value: d.value, itemStyle: { color: d.color } })),
      label: { show: false },
      emphasis: {
        label: { show: true, color: "#F1F5F9", fontSize: 12, fontWeight: 600 },
        itemStyle: { shadowBlur: 16, shadowColor: "rgba(0,0,0,0.3)" },
      },
      animationDurationUpdate: 600,
    }],
  };
}

/* ═══ Number formatter ═══ */
function fmtNum(v: number): string {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
  return v.toLocaleString("es-CO");
}

export const CHART_COLORS = [
  "#34D399", "#60A5FA", "#A78BFA", "#FB923C", "#F472B6",
  "#2DD4BF", "#FBBF24", "#818CF8", "#FB7185", "#4ADE80",
];

export { makeGradient, echarts };
