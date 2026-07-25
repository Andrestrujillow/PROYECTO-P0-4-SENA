export default function Footer() {
  return (
    <footer className="h-14 bg-surface border-t border-border-light flex items-center justify-between px-6 shrink-0">
      <span className="text-xs text-text-muted font-medium">
        &copy; {new Date().getFullYear()} SENA Regional Cauca
      </span>
      <span className="text-xs text-text-muted/50 font-medium">PE-04 v1.0</span>
    </footer>
  );
}
