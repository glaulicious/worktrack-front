import { api } from './client';

export const authApi = {
  login: (email, password) => api.post('/api/v1/auth/login', { email, password }),
};