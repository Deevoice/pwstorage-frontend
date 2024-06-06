import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { ErrorData } from '@/types/error';
import { TokenData } from '@/types/auth';
import api from '@/lib/api';

export const apiRequest = async <T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    prefix: string,
    endpoint: string = '',
    fingerprint?: string | null,
    data?: any,
    config?: AxiosRequestConfig,
    isRecursion: boolean = false
): Promise<AxiosResponse<T | ErrorData>> => {
    const url = `${prefix}${endpoint}`;
    try {
        if (method === 'get') {
            return await api.get<T | ErrorData>(url, config);
        } else if (method === 'post') {
            return await api.post<T | ErrorData>(url, data, config);
        } else if (method === 'put') {
            return await api.put<T | ErrorData>(url, data, config);
        } else if (method === 'patch') {
            return await api.patch<T | ErrorData>(url, data, config);
        } else if (method === 'delete') {
            return await api.delete<T | ErrorData>(url, config);
        } else {
            throw new Error(`Unsupported request method: ${method}`);
        }
    } catch (e: AxiosError<ErrorData> | unknown) {
        const error = (e as AxiosError<ErrorData>);
        console.log(error.response?.data);
        if (error.response?.status === 401) {
            if (error.response?.data.detail === 'Invalid token' && fingerprint) {
                if (isRecursion) {
                    Router.push('/login');
                    throw new Error('Unauthorized');
                };
                await refreshToken(fingerprint);
                return await apiRequest(method, prefix, endpoint, fingerprint, data, config, isRecursion = true);
            }
        }
        return (error.response as AxiosResponse<ErrorData>);
    }
};

export const saveToken = <T>(responseData: T): T => {
    if ((responseData as ErrorData).error_code) { return responseData; }
    const tokenData = (responseData as TokenData);
    sessionStorage.setItem('accessToken', tokenData.accessToken);
    Cookies.remove('refresh_token');
    Cookies.set('refresh_token', tokenData.refreshToken, { expires: tokenData.refreshTokenExpiresIn * 60 });
    return responseData;
}

export const refreshToken = async (fingerprint: string | null): Promise<TokenData | ErrorData> => {
    const regreshTokenCookie = Cookies.get('refresh_token');
    if (!regreshTokenCookie) {
        Router.push('/login');
        throw new Error('Unauthorized');
    }
    const response = await api.post<TokenData | ErrorData>('/auth/refresh_tokens', {
        fingerprint
    }, { headers: { 'x-refresh-token': regreshTokenCookie } });
    return saveToken(response.data);
};
