import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

/* ═══ Unified lime palette — one color family, varied lightness ═══ */
export const CHART_COLORS = [
  "#7CB342", // lime-600 (base)
  "#689F38", // lime-700 (darker)
  "#9CCC65", // lime-400 (lighter)
  "#558B2F", // lime-800 (deep)
  "#AED581", // lime-300 (pale)
  "#7CB342CC", // lime-80%
  "#689F38CC", // dark lime 80%
  "#9CCC65CC", // light lime 80%
  "#7CB34299", // lime 60%
  "#689F3899", // dark lime 60%
];

/* soft 12% opacity version for fills */
export const CHART_FILLS = [
  "rgba(124,179,66,0.12)",
  "rgba(104,159,56,0.12)",
  "rgba(156,204,101,0.12)",
  "rgba(85,139,47,0.12)",
  "rgba(174,213,129,0.12)",
  "rgba(124,179,66,0.08)",
  "rgba(104,159,56,0.08)",
  "rgba(156,204,101,0.08)",
  "rgba(124,179,66,0.06)",
  "rgba(104,159,56,0.06)",
];

/* ═══ Shared tooltip — glass style ═══ */
const glassTooltip = {
  backgroundColor: "rgba(255,255,255,0.92)",
  titleColor: "#1A1D23",
  bodyColor: "#6B7280",
  titleFont: { size: 13, weight: "bold" as const, family: "Inter, system-ui, sans-serif" },
  bodyFont: { size: 12, family: "Inter, system-ui, sans-serif" },
  borderColor: "rgba(229,231,235,0.6)",
  borderWidth: 1,
  padding: 12,
  cornerRadius: 12,
  boxPadding: 4,
  backdropFilter: "blur(12px)" as unknown,
  shadowColor: "rgba(0,0,0,0.06)",
  shadowBlur: 16,
  shadowOffsetY: 4,
};

/* ═══ Bar options (vertical) ═══ */
export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 500, easing: "easeOutQuart" as const },
  layout: {
    padding: { top: 8, bottom: 4 },
  },
  plugins: {
    legend: { display: false },
    tooltip: glassTooltip,
  },
  scales: {
    x: {
      ticks: {
        color: "#9CA3AF",
        font: { size: 11, family: "Inter, system-ui, sans-serif" },
        maxRotation: 0,
      },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      ticks: {
        color: "#9CA3AF",
        font: { size: 11, family: "Inter, system-ui, sans-serif" },
      },
      grid: { color: "rgba(229,231,235,0.3)", drawBorder: false },
      border: { display: false },
    },
  },
  barThickness: 20,
  maxBarThickness: 26,
};

export const defaultOptions = barOptions;

/* ═══ Horizontal bar options ═══ */
export const barHorizontalOptions = {
  ...barOptions,
  indexAxis: "y" as const,
  layout: {
    padding: { top: 4, bottom: 4, left: 8 },
  },
  scales: {
    x: {
      ticks: {
        color: "#9CA3AF",
        font: { size: 11, family: "Inter, system-ui, sans-serif" },
      },
      grid: { color: "rgba(229,231,235,0.3)", drawBorder: false },
      border: { display: false },
    },
    y: {
      ticks: {
        color: "#6B7280",
        font: { size: 12, family: "Inter, system-ui, sans-serif" },
      },
      grid: { display: false },
      border: { display: false },
    },
  },
  barThickness: 16,
  maxBarThickness: 20,
};

/* ═══ Doughnut options ═══ */
export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600, easing: "easeOutQuart" as const },
  cutout: "65%",
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 10,
        font: { size: 12, family: "Inter, system-ui, sans-serif" },
        color: "#6B7280",
      },
    },
    tooltip: glassTooltip,
  },
};
