import React from "react";
import { assets } from "../../assets/assets";

import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-[15rem] md:max-w-[15rem] w-full border-r border-gray-300/20 text-sm">
      <img
        className="h-14 w-14 rounded-full mx-auto"
        src={user.imageUrl}
        alt="sidebar"
      />
      <p className="mt-2 text-base max-md:hidden">
        {user.firstName} {user.lastName}
      </p>
      <div className="w-full mt-6">
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 pl-4
               text-gray-400 hover:text-red-500 transition-colors duration-200 ${
                 isActive ? "text-red-500 bg-red-100 font-medium" : ""
               }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="max-md:hidden">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
