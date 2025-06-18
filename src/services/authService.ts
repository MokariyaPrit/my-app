// ✅ src/services/authService.ts
import api from '../api/axios';
import axios from 'axios';

interface LoginDto {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginDto) => {
  const response = await api.post('/auth/login', credentials);

  const { access_token, refresh_token } = response.data;
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);

  setAuthToken(access_token);

  return response.data; // { user, access_token, refresh_token }
};

interface SignupData {
  email: string;
  password: string;
  role: string;
  region: string;
}

export const signupUser = async (data: SignupData) => {
  const response = await api.post('/users', data);
  return response.data;
};

const API_URL = 'http://localhost:3000';

export const refreshToken = async () => {
  const token = localStorage.getItem('refresh_token');

  if (!token) throw new Error('No refresh token found');

  const response = await axios.post(`${API_URL}/auth/refresh-token`, {
    refresh_token: token,
  });

  const { access_token, refresh_token: newRefreshToken } = response.data;

  // Update tokens
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', newRefreshToken);

  setAuthToken(access_token);

  return access_token;
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
