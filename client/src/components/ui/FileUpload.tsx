import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, CheckCircle2, RefreshCw, FileUp } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { api } from "../../services/api";

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
      const formData = new FormData();
      formData.append("file", file);
      const data = await api.uploadExcel(formData);
      setFichas(data.fichas);
      useDashboardStore.setState({ excelFileName: data.fileName });
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
      <div className="flex items-center gap-3 px-4 py-2.5 bg-sena-green/5 border border-sena-green/10 rounded-xl">
        <CheckCircle2 className="w-4 h-4 text-sena-green shrink-0" />
        <span className="text-[11px] text-sena-green/70 font-medium truncate flex-1">
          {excelFileName}
        </span>
        <span className="text-[10px] text-sena-gray/30 shrink-0 font-medium">
          {fichasCount.toLocaleString("es-CO")} fichas
        </span>
        <div
          {...getRootProps()}
          className="p-1.5 rounded-lg hover:bg-sena-blue-light/30 transition-colors cursor-pointer"
        >
          <input {...getInputProps()} />
          <RefreshCw className="w-3 h-3 text-sena-gray/30 hover:text-sena-white transition-colors" />
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        group relative flex flex-col items-center gap-3 px-6 py-8
        border-2 border-dashed rounded-2xl cursor-pointer
        transition-all duration-300
        ${isDragActive
          ? "border-sena-green/50 bg-sena-green/5 scale-[1.01]"
          : status === "loading"
          ? "border-sena-green/20 bg-sena-green/3"
          : "border-sena-blue-light/30 hover:border-sena-green/30 hover:bg-sena-blue-light/10"
        }
      `}
    >
      <input {...getInputProps()} />
      <div
        className={`
          w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
          ${isDragActive
            ? "bg-sena-green/15 scale-110"
            : status === "loading"
            ? "bg-sena-green/10"
            : "bg-sena-blue-light/25 group-hover:bg-sena-green/10"
          }
        `}
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 text-sena-green animate-spin" />
        ) : isDragActive ? (
          <FileUp className="w-5 h-5 text-sena-green" />
        ) : (
          <Upload className="w-5 h-5 text-sena-gray/40 group-hover:text-sena-green transition-colors" />
        )}
      </div>
      <div className="text-center">
        <p className="text-[12px] text-sena-white/60 font-medium">
          {status === "loading"
            ? "Procesando archivo..."
            : isDragActive
            ? "Suelta el archivo aquí"
            : "Arrastra un archivo .xlsx o haz clic"}
        </p>
        <p className="text-[10px] text-sena-gray/25 mt-1">
          Reporte PE-04 del SENA
        </p>
      </div>
    </div>
  );
}
