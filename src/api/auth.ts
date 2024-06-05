import api from '@/lib/api';
import { LoginData, TokenData } from '@/types/auth';

export const login = async (data: LoginData): Promise<TokenData> => {
    const response = await api.post<TokenData>('/auth/login', data);
    const tokenData = response.data;
    sessionStorage.setItem('accessToken', tokenData.accessToken);
    return tokenData;
};

export const refreshToken = async (fingerprint: string): Promise<TokenData> => {
    const response = await api.post<TokenData>('/auth/refresh_tokens', { fingerprint });
    const tokenData = response.data;
    sessionStorage.setItem('accessToken', tokenData.accessToken);
    return tokenData;
};

export const logout = async (): Promise<null> => {
    const response = await api.delete('/auth/logout');
    return response.data;
};
