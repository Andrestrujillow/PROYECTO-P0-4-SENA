export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-transparent border-t-sena-green animate-spin" />
      </div>
      <p className="text-sm text-gray-400 font-medium">Cargando datos...</p>
    </div>
  );
}
