import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function ProtectedRoute({ children, role }: { children: JSX.Element, role?: string; }) {

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    toast.warning("Você deve logar para realizar a operação")
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    toast.warning("Vire Admin para realizar a operação")
    return <Navigate to="/home" replace />;
  }

  return children;
}
