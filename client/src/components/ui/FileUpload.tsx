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
      <div className="flex items-center gap-3 px-4 py-2.5 bg-sena-green-light/5 border border-sena-green/10 rounded-xl">
        <CheckCircle2 className="w-5 h-5 text-sena-green shrink-0" />
        <span className="text-sm text-sena-green/70 font-medium truncate flex-1">
          {excelFileName}
        </span>
        <span className="text-xs text-gray-400 shrink-0 font-medium">
          {fichasCount.toLocaleString("es-CO")} fichas
        </span>
        <div
          {...getRootProps()}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <input {...getInputProps()} />
          <RefreshCw className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative flex flex-col items-center gap-3 px-6 py-8",
        "border-2 border-dashed rounded-2xl cursor-pointer",
        "transition-all duration-300",
        isDragActive
          ? "border-sena-green/50 bg-sena-green/5 scale-[1.01]"
          : status === "loading"
          ? "border-sena-green/20 bg-sena-green/3"
          : "border-gray-300 hover:border-sena-green/30 hover:bg-gray-50"
      )}
    >
      <input {...getInputProps()} />
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
          isDragActive
            ? "bg-sena-green/15 scale-110"
            : status === "loading"
            ? "bg-sena-green/10"
            : "bg-gray-100 group-hover:bg-sena-green/10"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 text-sena-green animate-spin" />
        ) : isDragActive ? (
          <FileUp className="w-5 h-5 text-sena-green" />
        ) : (
          <Upload className="w-5 h-5 text-gray-400 group-hover:text-sena-green transition-colors" />
        )}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 font-medium">
          {status === "loading"
            ? "Procesando archivo..."
            : isDragActive
            ? "Suelta el archivo aqui"
            : "Arrastra un archivo .xlsx o haz clic"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Reporte PE-04 del SENA
        </p>
      </div>
    </div>
  );
}
