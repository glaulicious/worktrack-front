import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { usuario, rol, logout } = useAuth();

  return (
    <section>
      <h1>Hola, {usuario?.nombre}</h1>
      <p>Rol: {rol}</p>
      <button type="button" onClick={logout}>
        Cerrar sesión
      </button>

      {/* Acá después condicionamos qué módulos mostrar según el rol */}
    </section>
  );
}