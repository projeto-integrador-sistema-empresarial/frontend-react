import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Altere para a URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthorizationToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
