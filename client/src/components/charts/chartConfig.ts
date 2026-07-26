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

/* ═══ Chart palette — vibrant on dark ═══ */
export const CHART_COLORS = [
  "#34D399", // emerald-400
  "#60A5FA", // blue-400
  "#A78BFA", // violet-400
  "#FB923C", // orange-400
  "#F472B6", // pink-400
  "#2DD4BF", // teal-400
  "#FBBF24", // amber-400
  "#818CF8", // indigo-400
  "#FB7185", // rose-400
  "#4ADE80", // green-400
];

/* ═══ Tooltip — dark theme ═══ */
export const glassTooltip = {
  backgroundColor: "rgba(15, 21, 32, 0.95)",
  titleColor: "#F1F5F9",
  bodyColor: "#94A3B8",
  titleFont: { size: 12, weight: "600" as const, family: "Inter, system-ui, sans-serif" },
  bodyFont: { size: 11, family: "Inter, system-ui, sans-serif" },
  borderColor: "rgba(30, 41, 59, 0.6)",
  borderWidth: 1,
  padding: 10,
  cornerRadius: 8,
  boxPadding: 4,
};

/* ═══ Bar options (vertical) ═══ */
export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400, easing: "easeOutQuart" as const },
  layout: {
    padding: { top: 4, bottom: 0 },
  },
  plugins: {
    legend: { display: false },
    tooltip: glassTooltip,
  },
  scales: {
    x: {
      ticks: {
        color: "#64748B",
        font: { size: 10, family: "Inter, system-ui, sans-serif" },
        maxRotation: 0,
      },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      ticks: {
        color: "#64748B",
        font: { size: 10, family: "Inter, system-ui, sans-serif" },
      },
      grid: { color: "rgba(30, 41, 59, 0.5)", drawBorder: false },
      border: { display: false },
    },
  },
  barThickness: 18,
  maxBarThickness: 24,
};

/** @deprecated Use barOptions directly */
export const defaultOptions = barOptions;

/* ═══ Horizontal bar options ═══ */
export const barHorizontalOptions = {
  ...barOptions,
  indexAxis: "y" as const,
  layout: {
    padding: { top: 4, bottom: 4, left: 4 },
  },
  scales: {
    x: {
      ticks: {
        color: "#64748B",
        font: { size: 10, family: "Inter, system-ui, sans-serif" },
      },
      grid: { color: "rgba(30, 41, 59, 0.5)", drawBorder: false },
      border: { display: false },
    },
    y: {
      ticks: {
        color: "#94A3B8",
        font: { size: 11, family: "Inter, system-ui, sans-serif" },
      },
      grid: { display: false },
      border: { display: false },
    },
  },
  barThickness: 14,
  maxBarThickness: 18,
};

/* ═══ Doughnut options ═══ */
export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 500, easing: "easeOutQuart" as const },
  cutout: "68%",
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 14,
        usePointStyle: true,
        pointStyleWidth: 8,
        font: { size: 11, family: "Inter, system-ui, sans-serif" },
        color: "#94A3B8",
      },
    },
    tooltip: glassTooltip,
  },
};
