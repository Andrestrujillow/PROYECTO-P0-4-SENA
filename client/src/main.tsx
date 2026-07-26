import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./hooks/useTheme";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
