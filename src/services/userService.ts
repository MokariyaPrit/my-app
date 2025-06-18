// src/services/userService.ts
import api from '../api/axios';
import axiosInstance from './axiosInstance';

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'manager' | 'admin' | 'superadmin';
}

// Signup (register new user)
export const signupUser = async (userData: CreateUserDto) => {
  const response = await api.post('/users', userData);
  return response.data;
};


export const getUserProfile = async () => {
  const response = await axiosInstance.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (updateDto: Partial<{ name: string; email: string }>) => {
  const response = await axiosInstance.patch('/users/profile', updateDto);
  return response.data;
};