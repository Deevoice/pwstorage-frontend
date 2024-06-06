import { apiRequest } from './apiHelper';
import { UserData, UserCreateData, UserUpdateData } from '@/types/user';
import { ErrorData } from '@/types/error';

const _prefix = '/users';

export const getUser = async (
    fingerprint: string | null
): Promise<UserData | ErrorData> => {
    const response = await apiRequest<UserData>('get', _prefix, '/me', fingerprint);
    return response.data;
};

export const createUser = async (
    data: UserCreateData
): Promise<UserData | ErrorData> => {
    const response = await apiRequest<UserData>('post', _prefix, '/', null, data);
    return response.data;
};

export const updateUser = async (
    fingerprint: string | null, data: UserUpdateData
): Promise<UserData | ErrorData> => {
    const response = await apiRequest<UserData>('put', _prefix, '/me', fingerprint, data);
    return response.data;
};

export const deleteUser = async (
    fingerprint: string | null
): Promise<null | ErrorData> => {
    const response = await apiRequest<null>('delete', _prefix, '/me', fingerprint);
    return response.data;
};
