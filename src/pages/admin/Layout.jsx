import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Navbar */}
      <AdminNavbar />

      {/* Main container */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div
          className="flex-1 px-4 py-6 md:px-10 
                     mt-[64px]                  /* push content below navbar */
                     h-[calc(100vh-64px)] 
                     overflow-y-auto"
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
