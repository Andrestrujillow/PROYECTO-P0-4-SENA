import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-gl";

/* ═══ Theme resolver ═══ */
function isDark(): boolean {
  return !document.documentElement.classList.contains("light");
}

function tc() {
  const d = isDark();
  return {
    text: d ? "#e8e8e8" : "#1a1a1a",
    textSec: d ? "#8a8a8a" : "#555555",
    muted: d ? "#555555" : "#888888",
    axis: d ? "#1e1e1e" : "#d4d4d4",
    grid: d ? "rgba(30,30,30,0.4)" : "rgba(212,212,212,0.45)",
    tipBg: d ? "rgba(20,20,20,0.96)" : "rgba(255,255,255,0.96)",
    tipBorder: d ? "rgba(30,30,30,0.6)" : "rgba(229,229,229,0.7)",
    tipText: d ? "#e8e8e8" : "#1a1a1a",
    donutGap: d ? "#0a0a0a" : "#f5f5f5",
    palette: [
      "#34D399", "#60A5FA", "#A78BFA", "#FB923C", "#F472B6",
      "#2DD4BF", "#FBBF24", "#818CF8", "#FB7185", "#4ADE80",
    ],
  };
}

/* ═══ Shared tooltip ═══ */
function tip() {
  const t = tc();
  return {
    backgroundColor: t.tipBg,
    borderColor: t.tipBorder,
    textStyle: { color: t.tipText, fontSize: 12, fontFamily: "Inter, system-ui" },
    extraCssText: "backdrop-filter:blur(8px);border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.12);max-width:260px;",
  };
}

/* ═══ Number formatter ═══ */
function fmt(v: number): string {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
  return v.toLocaleString("es-CO");
}

/* ═══ Smart label: wrap long names ═══ */
function wrapLabel(raw: string, maxLen = 18): string[] {
  if (raw.length <= maxLen) return [raw];
  const words = raw.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur.length + w.length + 1 > maxLen && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + " " + w : w;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3); // max 3 lines
}

function richLabel(raw: string, color: string, maxLen = 16) {
  const lines = wrapLabel(raw, maxLen);
  const rich: Record<string, { fontSize: number; color: string; lineHeight: number }> = {};
  const parts = lines.map((l, i) => {
    rich[`l${i}`] = { fontSize: 10, color, lineHeight: 14 };
    return `{l${i}|${l}}`;
  });
  return { rich, text: parts.join("\n") };
}

/* ═══ Gradient ═══ */
function grad(color: string, vertical = true) {
  return new echarts.graphic.LinearGradient(
    vertical ? 0 : 0, vertical ? 1 : 0,
    vertical ? 0 : 1, vertical ? 0 : 0,
    [
      { offset: 0, color: color + "FF" },
      { offset: 1, color: color + "44" },
    ]
  );
}

/* ═══ Wrapper ═══ */
interface EChartProps {
  option: Record<string, unknown>;
  height?: string | number;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  className?: string;
}

export default function EChart({ option, height = "100%", notMerge = false, lazyUpdate = false, className }: EChartProps) {
  const t = tc();
  const merged = useMemo(() => {
    const { tooltip: ut, ...rest } = option;
    return {
      backgroundColor: "transparent",
      textStyle: { color: t.textSec, fontFamily: "Inter, system-ui" },
      animationDuration: 450,
      animationEasing: "cubicOut",
      ...rest,
      tooltip: { ...tip(), ...(ut as Record<string, unknown> || {}) },
    };
  }, [option, t]);

  return (
    <ReactECharts
      echarts={echarts}
      option={merged}
      style={{ height, width: "100%" }}
      className={className}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      opts={{ renderer: "canvas" }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   BAR 2D — vertical, horizontal, stacked
   ══════════════════════════════════════════════════════════════ */
export function bar2DOption(
  categories: string[],
  values: number[],
  opts?: {
    horizontal?: boolean;
    barColor?: string;
    showLabels?: boolean;
    stacked?: boolean;
    series?: { name: string; data: number[]; color: string }[];
  }
) {
  const t = tc();
  const isH = opts?.horizontal;
  const baseColor = opts?.barColor || t.palette[0];

  /* ── Stacked ── */
  if (opts?.series) {
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tip() },
      legend: {
        top: 0, bottom: null as null,
        textStyle: { color: t.textSec, fontSize: 10 },
        itemWidth: 10, itemHeight: 10, itemGap: 14,
        type: "scroll",
      },
      grid: { left: 4, right: 12, top: 36, bottom: 4, containLabel: true },
      xAxis: {
        type: "category", data: categories,
        axisLabel: {
          color: t.muted, fontSize: 10,
          rotate: 0, interval: 0,
          overflow: "truncate", width: 60,
        },
        axisLine: { lineStyle: { color: t.axis } },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: t.muted, fontSize: 10 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: t.grid, type: "dashed" } },
      },
      series: opts.series.map((s) => ({
        name: s.name, type: "bar", stack: "total",
        data: s.data,
        itemStyle: { color: s.color, borderRadius: 0 },
        emphasis: { focus: "series" },
        barMaxWidth: 36, barGap: "8%",
      })),
    };
  }

  /* ── Horizontal ── */
  if (isH) {
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tip() },
      grid: { left: 4, right: 52, top: 6, bottom: 4, containLabel: true },
      xAxis: {
        type: "value",
        axisLabel: { color: t.muted, fontSize: 10 },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: t.grid, type: "dashed" } },
      },
      yAxis: {
        type: "category", data: categories, inverse: true,
        axisLabel: {
          color: t.textSec, fontSize: 11,
          width: 140, overflow: "truncate",
          ellipsis: "...",
        },
        axisLine: { lineStyle: { color: t.axis } },
        axisTick: { show: false },
      },
      series: [{
        type: "bar",
        data: values.map((v, i) => ({
          value: v,
          itemStyle: {
            color: grad(t.palette[i % t.palette.length], false),
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barMaxWidth: 20,
        label: opts?.showLabels ? {
          show: true, position: "right",
          color: t.textSec, fontSize: 11,
          formatter: (p: { value: number }) => fmt(p.value),
        } : undefined,
        emphasis: { itemStyle: { shadowBlur: 6, shadowColor: "rgba(0,0,0,0.1)" } },
      }],
    };
  }

  /* ── Vertical ── */
  return {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, ...tip() },
    grid: { left: 4, right: 8, top: 10, bottom: 4, containLabel: true },
    xAxis: {
      type: "category", data: categories,
      axisLabel: {
        color: t.muted, fontSize: 10,
        rotate: categories.some((c) => c.length > 14) ? 18 : 0,
        interval: 0,
        overflow: "truncate", width: 55,
      },
      axisLine: { lineStyle: { color: t.axis } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: t.muted, fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: t.grid, type: "dashed" } },
    },
    series: [{
      type: "bar",
      data: values.map((v) => ({
        value: v,
        itemStyle: { color: grad(baseColor), borderRadius: [4, 4, 0, 0] },
      })),
      barMaxWidth: 30,
      label: opts?.showLabels ? {
        show: true, position: "top",
        color: t.muted, fontSize: 10,
        formatter: (p: { value: number }) => fmt(p.value),
      } : undefined,
      emphasis: { itemStyle: { shadowBlur: 6, shadowColor: "rgba(0,0,0,0.1)" } },
    }],
  };
}

/* ══════════════════════════════════════════════════════════════
   DONUT 2D — with smart center total
   ══════════════════════════════════════════════════════════════ */
export function donut2DOption(
  data: { name: string; value: number; color: string }[],
  total?: number
) {
  const t = tc();
  const totalText = total != null ? fmt(total) : "";
  return {
    tooltip: {
      trigger: "item", ...tip(),
      formatter: (p: { name: string; value: number; percent: number }) =>
        `<b>${p.name}</b><br/>${p.value.toLocaleString("es-CO")} (${p.percent}%)`,
    },
    legend: {
      orient: "vertical", right: "2%", top: "middle",
      textStyle: { color: t.textSec, fontSize: 11 },
      itemWidth: 10, itemHeight: 10, itemGap: 8,
      formatter: (name: string) => name.length > 22 ? name.slice(0, 20) + "…" : name,
    },
      series: [{
      type: "pie",
      radius: ["36%", "72%"],
      center: ["34%", "50%"],
      avoidLabelOverlap: true,
      padAngle: 2,
      itemStyle: {
        borderRadius: 5,
        borderColor: t.donutGap,
        borderWidth: 3,
      },
      label: {
        show: !!total,
        position: "center",
        formatter: total != null ? [
          `{total|${totalText}}`,
          `{label|TOTAL}`,
        ].join("\n") : "",
        rich: {
          total: {
            fontSize: 20, fontWeight: 700,
            color: t.text,
            fontFamily: "Inter, system-ui",
            lineHeight: 28,
          },
          label: {
            fontSize: 9, fontWeight: 600,
            color: t.muted,
            fontFamily: "Inter, system-ui",
            lineHeight: 16,
          },
        },
      },
      emphasis: {
        label: { show: false },
        scaleSize: 5,
      },
      data: data.map((d) => ({
        name: d.name, value: d.value,
        itemStyle: { color: d.color },
      })),
    }],
  };
}

/* ══════════════════════════════════════════════════════════════
   LINE / AREA
   ══════════════════════════════════════════════════════════════ */
export function lineAreaOption(
  categories: string[],
  series: { name: string; data: number[]; color: string }[],
  stacked = false
) {
  const t = tc();
  return {
    tooltip: { trigger: "axis", ...tip() },
    legend: {
      top: 0,
      textStyle: { color: t.textSec, fontSize: 10 },
      itemWidth: 10, itemHeight: 10, itemGap: 14,
    },
    grid: { left: 4, right: 12, top: 36, bottom: 4, containLabel: true },
    xAxis: {
      type: "category", data: categories, boundaryGap: false,
      axisLabel: { color: t.muted, fontSize: 10 },
      axisLine: { lineStyle: { color: t.axis } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: t.muted, fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: t.grid, type: "dashed" } },
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
          { offset: 0, color: s.color + "30" },
          { offset: 1, color: s.color + "03" },
        ]),
      },
      emphasis: { focus: "series" },
      data: s.data,
    })),
  };
}

/* ══════════════════════════════════════════════════════════════
   3D BAR
   ══════════════════════════════════════════════════════════════ */
export function bar3DOption(categories: string[], values: number[], colors?: string[]) {
  const t = tc();
  return {
    tooltip: {},
    visualMap: { show: false, inRange: { color: colors || t.palette } },
    xAxis3D: {
      type: "category", data: categories,
      axisLabel: { color: t.textSec, fontSize: 9, interval: 0, rotate: 30 },
      axisLine: { lineStyle: { color: t.axis } },
    },
    yAxis3D: { type: "value", show: false },
    zAxis3D: { type: "value", axisLabel: { color: t.muted } },
    grid3D: {
      boxWidth: 120, boxDepth: 60, boxHeight: 80,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 6, distance: 200 },
      light: { main: { intensity: 1.2, shadow: true, shadowQuality: "medium", alpha: 40, beta: 40 } },
      environment: "transparent",
      axisLine: { lineStyle: { color: t.axis } },
      splitLine: { lineStyle: { color: t.grid } },
      splitArea: { show: false },
    },
    series: [{
      type: "bar3D",
      data: values.map((v, i) => [i, 0, v]),
      shading: "realistic",
      realisticMaterial: { roughness: 0.3, metalness: 0.1 },
      barSize: 18, label: { show: false },
      itemStyle: { opacity: 0.9 },
      emphasis: { itemStyle: { opacity: 1 }, label: { show: true, color: t.text, fontSize: 11, formatter: "{c}" } },
    }],
  };
}

export function bar3DHorizontalOption(categories: string[], values: number[], barColors?: string[]) {
  const t = tc();
  return {
    tooltip: {},
    xAxis3D: { type: "value", show: false },
    yAxis3D: {
      type: "category", data: categories,
      axisLabel: { color: t.textSec, fontSize: 10, interval: 0 },
      axisLine: { lineStyle: { color: t.axis } },
    },
    zAxis3D: { type: "value" },
    grid3D: {
      boxWidth: 60, boxDepth: 120, boxHeight: 80,
      viewControl: { projection: "perspective", autoRotate: true, autoRotateSpeed: 4, distance: 220 },
      light: { main: { intensity: 1.2, shadow: true, shadowQuality: "medium", alpha: 30, beta: 60 } },
      environment: "transparent",
      axisLine: { lineStyle: { color: t.axis } },
      splitLine: { lineStyle: { color: t.grid } },
      splitArea: { show: false },
    },
    visualMap: { show: false, inRange: { color: barColors || t.palette } },
    series: [{
      type: "bar3D",
      data: values.map((v, i) => [0, i, v]),
      shading: "realistic",
      realisticMaterial: { roughness: 0.3, metalness: 0.1 },
      barSize: 14, label: { show: false },
      itemStyle: { opacity: 0.9 },
      emphasis: { itemStyle: { opacity: 1 }, label: { show: true, color: t.text, fontSize: 11, formatter: "{c}" } },
    }],
  };
}

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

/* ═══ Exports ═══ */
export const CHART_COLORS = [
  "#34D399", "#60A5FA", "#A78BFA", "#FB923C", "#F472B6",
  "#2DD4BF", "#FBBF24", "#818CF8", "#FB7185", "#4ADE80",
];
export { grad, fmt, richLabel, wrapLabel, echarts };
