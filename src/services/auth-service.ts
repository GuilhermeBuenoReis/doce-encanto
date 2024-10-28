import axios from 'axios';
import { API_CONFIG } from '@/config/api';
import type { SignInData, SignUpData } from '@/types/auth-type';

interface loginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createNewUser = async (
  userData: SignUpData
): Promise<loginResponse> => {
  const response = await api.post('/register', userData);

  return response.data;
};

export const authUser = async (
  loginData: SignInData
): Promise<loginResponse> => {
  const response = await api.post<loginResponse>('/login', loginData);

  return response.data;
};
