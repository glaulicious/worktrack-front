import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientePortalPage from './pages/ClientePortalPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ordenes/:codigo" element={<ClientePortalPage />} />

      {/* Ruta protegida genérica: cualquier usuario logueado */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Ejemplos de rutas protegidas por rol específico, para ir agregando */}
      {/*
      <Route
        path="/inventario"
        element={
          <ProtectedRoute roles={['Administrador', 'Lider Tecnico']}>
            <InventarioPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/taller"
        element={
          <ProtectedRoute roles={['Tecnico', 'Lider Tecnico']}>
            <TallerPage />
          </ProtectedRoute>
        }
      />
      */}
    </Routes>
  );
}

export default App;