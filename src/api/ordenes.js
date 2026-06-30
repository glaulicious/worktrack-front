import { api } from './client';

export const ordenesApi = {
  crear: (data) => api.post('/api/v1/ordenes', data),
  tareasDeTecnico: (idTecnico) => api.get(`/api/v1/tecnicos/${idTecnico}/tareas`),
  registrarDiagnostico: (idOt, data) => api.post(`/api/v1/ordenes/${idOt}/diagnostico`, data),
  adjuntarEvidencia: (idOt, formData) => api.postForm(`/api/v1/ordenes/${idOt}/evidencia`, formData),
  consultarPublica: (codigoSeguimiento) => api.get(`/api/v1/public/ordenes/${codigoSeguimiento}`),
  resolverPresupuesto: (codigoSeguimiento, data) =>
    api.put(`/api/v1/public/ordenes/${codigoSeguimiento}/resolucion`, data),
};