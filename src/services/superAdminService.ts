import axiosInstance from './axiosInstance';

export const getAllUsers = async () => {
  const response = await axiosInstance.get('/super-admins/users');
  return response.data;
};

export const updateUserById = async (id: string, data: any) => {
  const response = await axiosInstance.patch(`/super-admins/users/${id}`, data);
  return response.data;
};

export const deleteUserById = async (id: string) => {
  const response = await axiosInstance.delete(`/super-admins/users/${id}`);
  return response.data;
};
