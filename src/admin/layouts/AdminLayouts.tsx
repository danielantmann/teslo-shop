import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const AdminLayouts = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6"></main>
      </div>
    </div>
  );
};

export default AdminLayouts;
