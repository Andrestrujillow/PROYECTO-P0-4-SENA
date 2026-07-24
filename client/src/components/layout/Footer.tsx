export default function Footer() {
  return (
    <footer className="h-10 glass border-t border-sena-blue-light/10 flex items-center justify-between px-4 lg:px-6 shrink-0 relative z-10">
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-sena-gray/30 font-medium">
          &copy; {new Date().getFullYear()} SENA Regional Cauca
        </span>
        <span className="text-[8px] text-sena-gray/15">·</span>
        <span className="text-[10px] text-sena-gray/20 font-medium">
          PE-04 Dashboard
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-sena-green rounded-full animate-pulse" />
          <span className="text-[9px] text-sena-gray/25 font-medium">Online</span>
        </div>
        <span className="text-[9px] text-sena-gray/15">v1.0</span>
      </div>
    </footer>
  );
}
