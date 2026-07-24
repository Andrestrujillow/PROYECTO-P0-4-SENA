import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-sena-blue-dark overflow-hidden">
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      <Header
        isSidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar isOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
