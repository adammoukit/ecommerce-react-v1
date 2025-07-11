import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import TopContent from "./Components/TopContent";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      {/* <MobileNav /> */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopContent ajouté ici */}
        <TopContent />
        
        <main className="flex-1 overflow-auto p-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
