import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/react";

const AdminGuard = () => {
  const { isLoaded, user } = useUser();
  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  const allowed = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map((v) => v.trim().toLowerCase()).filter(Boolean);
  const email = user.primaryEmailAddress?.emailAddress?.toLowerCase() || "";

  if (allowed.length && !allowed.includes(email)) {
    return <div className="min-h-screen flex items-center justify-center">You are not allowed to access admin panel.</div>;
  }

  return <Outlet />;
};

export default AdminGuard;
