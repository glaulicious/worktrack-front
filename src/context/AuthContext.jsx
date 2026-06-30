import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import { setToken, clearToken, getToken } from '../api/client';

const AuthContext = createContext(null);

const USER_KEY = 'worktrack_usuario';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al cargar la app, revisa si ya había una sesión guardada
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem(USER_KEY);
    if (getToken() && usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  async function login(email, password) {
    const respuesta = await authApi.login(email, password);
    const { usuario: usuarioLogueado, token_acceso } = respuesta.data;

    setToken(token_acceso);
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioLogueado));
    setUsuario(usuarioLogueado);

    return usuarioLogueado;
  }

  function logout() {
    clearToken();
    localStorage.removeItem(USER_KEY);
    setUsuario(null);
  }

  const value = {
    usuario,
    estaLogueado: !!usuario,
    rol: usuario?.rol ?? null,
    login,
    logout,
    cargando,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}