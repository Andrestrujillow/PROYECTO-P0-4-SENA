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

export const CHART_COLORS = [
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
  "#14B8A6",
  "#64748B",
  "#0EA5E9",
  "#A855F7",
  "#F43F5E",
];

const FONT = "'Plus Jakarta Sans', sans-serif";

export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 300 },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#1F2937",
      bodyColor: "#6B7280",
      titleFont: { size: 10, weight: "bold" as const, family: FONT },
      bodyFont: { size: 9, family: FONT },
      borderColor: "#E5E7EB",
      borderWidth: 1,
      padding: 5,
      cornerRadius: 4,
    },
  },
  scales: {
    x: {
      ticks: { color: "#9CA3AF", font: { size: 9, family: FONT }, maxRotation: 0 },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      ticks: { color: "#9CA3AF", font: { size: 9, family: FONT } },
      grid: { color: "rgba(229,231,235,0.4)" },
      border: { display: false },
    },
  },
  barThickness: 18,
  maxBarThickness: 22,
};

/* Alias for pages that still import defaultOptions */
export const defaultOptions = barOptions;

export const barHorizontalOptions = {
  ...barOptions,
  indexAxis: "y" as const,
  scales: {
    x: {
      ticks: { color: "#9CA3AF", font: { size: 9, family: FONT } },
      grid: { color: "rgba(229,231,235,0.4)" },
      border: { display: false },
    },
    y: {
      ticks: { color: "#6B7280", font: { size: 10, family: FONT } },
      grid: { display: false },
      border: { display: false },
    },
  },
  barThickness: 14,
  maxBarThickness: 18,
};
