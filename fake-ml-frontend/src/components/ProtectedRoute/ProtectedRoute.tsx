import { Navigate } from "react-router-dom";
import type { ComponentType } from "react";

// 1. Defino un helper puro para la firma final
type ProtectedRouteProps<P> = {
  element: ComponentType<P>;
  isAuthenticated: boolean;
} & P;

// 2. Componente genérico
function ProtectedRoute<P extends object>(
  props: ProtectedRouteProps<P>,
): React.JSX.Element {
  const { element: Component, isAuthenticated, ...rest } = props;
  return isAuthenticated ? (
    <Component {...(rest as P)} />
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
