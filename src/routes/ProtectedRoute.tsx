import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import api from "@/api/api";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    api.get("/areas")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return <div>Carregando...</div>; // ou um spinner
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
