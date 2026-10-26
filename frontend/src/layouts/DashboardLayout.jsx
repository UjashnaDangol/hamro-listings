
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        collapsed={collapsed}
        onToggle={() =>
          setCollapsed((previous) => !previous)
        }
      />

      <div
        className={`
          min-h-screen min-w-0
          transition-[margin] duration-300
          ml-0
          ${collapsed ? "md:ml-[72px]" : "md:ml-60"}
        `}
      >
        <main className="w-full min-w-0 px-4 pb-5 pt-20 sm:px-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
