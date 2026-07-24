export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-sena-blue-light/30" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-sena-green animate-spin" />
      </div>
      <p className="text-[11px] text-sena-gray/40 font-medium">Cargando datos...</p>
    </div>
  );
}
