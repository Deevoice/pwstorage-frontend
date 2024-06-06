import { LoginData, TokenData } from '@/types/auth';
import { ErrorData } from '@/types/error';
import { apiRequest, saveToken } from './apiHelper';

const _prefix = '/auth';

export const loginUser = async (
    data: LoginData
): Promise<TokenData | ErrorData> => {
    const response = await apiRequest<TokenData | ErrorData>('post', _prefix, '/login', null, data);
    return saveToken(response.data);
};

export const logoutUser = async (
    fingerprint: string | null
): Promise<null | ErrorData> => {
    const response = await apiRequest<null>('delete', _prefix, '/logout', fingerprint);
    return response.data;
};
