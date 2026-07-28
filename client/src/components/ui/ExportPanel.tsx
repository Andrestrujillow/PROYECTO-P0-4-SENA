import { useState } from "react";
import { Download, FileSpreadsheet, FileJson, FileImage, Printer } from "lucide-react";

interface ExportPanelProps {
  elementId?: string;
  fileName?: string;
}

export default function ExportPanel({ elementId = "page-content", fileName = "PE-04_Report" }: ExportPanelProps) {
  const [open, setOpen] = useState(false);

  const exportCSV = () => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText;
    const blob = new Blob([text], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${fileName}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText;
    const blob = new Blob([JSON.stringify({ data: text }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${fileName}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const print = () => window.print();

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="btn-ghost text-xs">
        <Download className="w-3.5 h-3.5" /> Exportar
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-44 card py-1 shadow-xl">
          <button onClick={() => { exportCSV(); setOpen(false); }} className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-text-secondary hover:bg-surface-hover transition-colors">
            <FileSpreadsheet className="w-3.5 h-3.5 text-sena-green" /> Exportar CSV
          </button>
          <button onClick={() => { exportJSON(); setOpen(false); }} className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-text-secondary hover:bg-surface-hover transition-colors">
            <FileJson className="w-3.5 h-3.5 text-blue-400" /> Exportar JSON
          </button>
          <button onClick={() => { print(); setOpen(false); }} className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-text-secondary hover:bg-surface-hover transition-colors">
            <Printer className="w-3.5 h-3.5 text-purple-400" /> Imprimir
          </button>
        </div>
      )}
    </div>
  );
}
