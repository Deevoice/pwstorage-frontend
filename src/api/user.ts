import api from '@/lib/api';
import { UserData, UserCreateData, UserUpdateData } from '@/types/user';

export const getUser = async (): Promise<UserData> => {
    const response = await api.get<UserData>('/users/me');
    return response.data;
};

export const createUser = async (data: UserCreateData): Promise<UserData> => {
    const response = await api.post<UserData>('/users', data);
    return response.data;
};

export const updateUser = async (data: UserUpdateData): Promise<UserData> => {
    const response = await api.put<UserData>('/users/me', data);
    return response.data;
};

export const deleteUser = async (): Promise<null> => {
    const response = await api.delete('/users/me');
    return response.data;
};
