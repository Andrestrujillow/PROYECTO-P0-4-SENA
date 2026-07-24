import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export const CHART_COLORS = [
  "#00843D",
  "#4CAF50",
  "#FFD100",
  "#60A5FA",
  "#E74C3C",
  "#A855F7",
  "#F97316",
  "#06B6D4",
  "#84CC16",
  "#F43F5E",
  "#6366F1",
  "#EAB308",
  "#14B8A6",
  "#78716C",
  "#64748B",
];

export const CHART_COLORS_SOFT = CHART_COLORS.map((c) => c + "99");

export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 600,
    easing: "easeOutQuart" as const,
  },
  plugins: {
    legend: {
      labels: {
        color: "#7B8FA3",
        font: { size: 11, weight: "bold" as const },
        boxWidth: 10,
        boxHeight: 10,
        borderRadius: 3,
        useBorderRadius: true,
        padding: 14,
      },
    },
    tooltip: {
      backgroundColor: "rgba(17,29,46,0.95)",
      titleColor: "#F0F4F8",
      bodyColor: "#7B8FA3",
      titleFont: { size: 12, weight: "bold" as const },
      bodyFont: { size: 11 },
      borderColor: "rgba(28,45,66,0.6)",
      borderWidth: 1,
      padding: { top: 10, bottom: 10, left: 14, right: 14 },
      cornerRadius: 10,
      displayColors: true,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#7B8FA3",
        font: { size: 10, weight: "bold" as const },
        maxRotation: 45,
      },
      grid: { color: "rgba(28,45,66,0.3)", drawBorder: false },
      border: { display: false },
    },
    y: {
      ticks: {
        color: "#7B8FA3",
        font: { size: 10, weight: "bold" as const },
      },
      grid: { color: "rgba(28,45,66,0.3)", drawBorder: false },
      border: { display: false },
    },
  },
};
