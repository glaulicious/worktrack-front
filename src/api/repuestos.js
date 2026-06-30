import { api } from './client';

export const repuestosApi = {
  listar: () => api.get('/api/v1/repuestos'),
  crear: (data) => api.post('/api/v1/repuestos', data),
};