import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, CheckCircle2, RefreshCw, FileUp } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { parseExcelFile } from "../../services/excelParser";
import { cn } from "../../lib/cn";

export default function FileUpload() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const setFichas = useDashboardStore((s) => s.setFichas);
  const setError = useDashboardStore((s) => s.setError);
  const setLoading = useDashboardStore((s) => s.setLoading);
  const excelFileName = useDashboardStore((s) => s.excelFileName);
  const fichasCount = useDashboardStore((s) => s.fichas.length);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setStatus("loading");
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const fichas = parseExcelFile(buffer);
      setFichas(fichas);
      useDashboardStore.setState({ excelFileName: file.name });
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al cargar archivo";
      setError(msg);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, [setFichas, setError, setLoading]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxFiles: 1,
    multiple: false,
  });

  if (excelFileName && fichasCount > 0) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-sena-green-light/50 border border-sena-green/20 rounded-xl">
        <CheckCircle2 className="w-5 h-5 text-sena-green shrink-0" />
        <span className="text-sm text-sena-green font-medium truncate flex-1">
          {excelFileName}
        </span>
        <span className="text-xs text-text-muted shrink-0 font-medium">
          {fichasCount.toLocaleString("es-CO")} fichas
        </span>
        <div
          {...getRootProps()}
          className="p-1.5 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
        >
          <input {...getInputProps()} />
          <RefreshCw className="w-4 h-4 text-text-muted hover:text-text-secondary transition-colors" />
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      aria-label="Subir archivo Excel"
      className={cn(
        "group relative flex flex-col items-center gap-3 px-6 py-8 w-full",
        "border-2 border-dashed rounded-2xl cursor-pointer",
        "transition-all duration-200",
        isDragActive
          ? "border-sena-green/50 bg-sena-green-light/50 scale-[1.01]"
          : status === "loading"
          ? "border-sena-green/20 bg-sena-green-light/30"
          : "border-border hover:border-sena-green/30 hover:bg-gray-50"
      )}
    >
      <input {...getInputProps()} />
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200",
          isDragActive
            ? "bg-sena-green/15 scale-110"
            : status === "loading"
            ? "bg-sena-green-light"
            : "bg-gray-100 group-hover:bg-sena-green-light"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 text-sena-green animate-spin" />
        ) : isDragActive ? (
          <FileUp className="w-5 h-5 text-sena-green" />
        ) : (
          <Upload className="w-5 h-5 text-text-muted group-hover:text-sena-green transition-colors" />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm text-text-primary font-medium">
          {status === "loading"
            ? "Procesando archivo..."
            : isDragActive
            ? "Suelta el archivo aqui"
            : "Arrastra un archivo .xlsx o haz clic"}
        </p>
        <p className="text-xs text-text-muted mt-1">
          Reporte PE-04 del SENA
        </p>
      </div>
    </div>
  );
}
