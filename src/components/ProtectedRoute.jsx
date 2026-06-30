import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Protege una ruta validando que haya sesión activa y, opcionalmente,
 * que el rol del usuario esté dentro de los roles permitidos.
 *
 * Uso:
 * <ProtectedRoute roles={['Administrador', 'Lider Tecnico']}>
 *   <InventarioPage />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children, roles }) {
  const { estaLogueado, rol, cargando } = useAuth();

  if (cargando) {
    return <p>Cargando sesión...</p>;
  }

  if (!estaLogueado) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}