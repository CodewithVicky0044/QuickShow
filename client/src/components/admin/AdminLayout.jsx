import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const linkClass = ({ isActive }) => `px-4 py-2 rounded-md text-sm ${isActive ? "bg-primary text-white" : "bg-white/5 text-gray-300"}`;

  return (
    <div className="min-h-screen px-5 md:px-12 py-24">
      <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/admin/movies" className={linkClass}>Movies</NavLink>
        <NavLink to="/admin/shows" className={linkClass}>Shows</NavLink>
        <NavLink to="/admin/bookings" className={linkClass}>Bookings</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
