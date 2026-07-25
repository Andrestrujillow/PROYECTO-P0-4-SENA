export default function Footer() {
  return (
    <footer className="h-12 bg-white border-t border-gray-100 flex items-center justify-between px-6 shrink-0">
      <span className="text-xs text-gray-400">
        &copy; {new Date().getFullYear()} SENA Regional Cauca
      </span>
      <span className="text-xs text-gray-300">PE-04 v1.0</span>
    </footer>
  );
}
