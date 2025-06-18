// src/routes/RequireRole.tsx
import { Navigate } from "react-router-dom";

export const RequireRole = ({ role, children }: { role: string; children: any }) => {
  const userRole = localStorage.getItem("user_role");
  return userRole === role ? children : <Navigate to="/unauthorized" replace />;
};
