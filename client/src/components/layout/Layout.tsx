import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="h-11 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 shrink-0 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-1.5 -ml-1 mr-3 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded-md flex items-center justify-center">
            <span className="text-white text-[9px] font-bold">S</span>
          </div>
          <span className="text-xs font-semibold text-gray-700">SENA PE-04</span>
        </div>
        <span className="ml-auto text-[10px] text-gray-400">Dashboard</span>
      </header>

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-4">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="h-8 bg-white border-t border-gray-200 flex items-center justify-center shrink-0">
        <span className="text-[9px] text-gray-400">
          &copy; {new Date().getFullYear()} SENA Regional Cauca
        </span>
      </footer>
    </div>
  );
}
