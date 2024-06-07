import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';
import {
    COOKIE_REFRESH_TOKEN,
    COOKIE_ENCRYPTION_KEY,
    STORAGE_ACCESS_TOKEN,
    STORAGE_ENCRYPTION_KEY
} from '@/utils/constants';

import { ErrorData } from '@/types/error';
import { TokenData } from '@/types/auth';
import api from '@/lib/api';
import { encryptText, decryptText } from '@/utils/cryptoUtils';

export const apiRequest = async <T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    prefix: string,
    endpoint: string = '',
    fingerprint?: string,
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
        const statusCode = (error.response?.status as number);
        if (statusCode === 401 || statusCode === 403) {
            if (isRecursion) { errorUnauthorized(); };
            const errorDetail = (error.response?.data.detail as string);
            if ((errorDetail === 'Invalid token' || errorDetail === 'Not authenticated') && fingerprint) {
                await refreshToken(fingerprint);
                return await apiRequest(method, prefix, endpoint, fingerprint, data, config, isRecursion = true);
            }
        }
        return (error.response as AxiosResponse<ErrorData>);
    }
};

export const saveCookies = <T>(
    fingerprint: string, responseData: T, encryptionKey?: string
): T => {
    if ((responseData as ErrorData).error_code) { return responseData; }
    const tokenData = (responseData as TokenData);
    sessionStorage.setItem(STORAGE_ACCESS_TOKEN, tokenData.accessToken);
    const expiresIn = tokenData.refreshTokenExpiresIn * 60;
    Cookies.set(COOKIE_REFRESH_TOKEN, tokenData.refreshToken, { expires: expiresIn });
    _saveEncryptionKey(fingerprint, expiresIn, encryptionKey)
    return responseData;
}

export const deleteCookies = () => {
    Cookies.remove(COOKIE_REFRESH_TOKEN);
    Cookies.remove(COOKIE_ENCRYPTION_KEY);
    sessionStorage.removeItem(STORAGE_ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_ENCRYPTION_KEY);
}

export const refreshToken = async (
    fingerprint: string
): Promise<TokenData | ErrorData> => {
    const regreshTokenCookie = Cookies.get(COOKIE_REFRESH_TOKEN);
    if (!regreshTokenCookie) { errorUnauthorized(); }
    const response = await api.post<TokenData | ErrorData>('/auth/refresh_tokens', {
        fingerprint
    }, { headers: { 'x-refresh-token': regreshTokenCookie } });
    const encryptionKey = Cookies.get(COOKIE_ENCRYPTION_KEY);
    deleteCookies();
    return saveCookies(fingerprint, response.data, encryptionKey);
};

const _saveEncryptionKey = (
    fingerprint: string, expiresIn: number, encryptionKey?: string
) => {
    if (!encryptionKey) {
        const _encryptionKey = Cookies.get(COOKIE_ENCRYPTION_KEY);
        if (!_encryptionKey) { return errorUnauthorized(); }
        encryptionKey = decryptText(_encryptionKey, fingerprint);
    }
    sessionStorage.setItem(STORAGE_ENCRYPTION_KEY, encryptionKey);
    Cookies.set(COOKIE_ENCRYPTION_KEY, encryptText(encryptionKey, fingerprint), { expires: expiresIn });
}

export const errorUnauthorized = (redirect: boolean = true): void => {
    if (redirect) {
        Router.push('/login');
    } else {
        throw new Error('Unauthorized');
    }
}
