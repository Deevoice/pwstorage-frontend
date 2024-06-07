import { blake2bHex } from 'blakejs';
import { LoginData, TokenData } from '@/types/auth';
import { ErrorData } from '@/types/error';
import { apiRequest, saveCookies, deleteCookies } from './apiHelper';

const _prefix = '/auth';

export const loginUser = async (
    data: LoginData
): Promise<TokenData | ErrorData> => {
    deleteCookies();
    const passwordHash = blake2bHex(data.password);
    data.password = passwordHash.substring(0, 64);
    const response = await apiRequest<TokenData | ErrorData>('post', _prefix, '/login', data.fingerprint, data);
    return saveCookies(data.fingerprint, response.data, passwordHash.substring(64, 128));
};

export const logoutUser = async (
    fingerprint: string
): Promise<null | ErrorData> => {
    deleteCookies();
    const response = await apiRequest<null>('delete', _prefix, '/logout', fingerprint);
    return response.data;
};
