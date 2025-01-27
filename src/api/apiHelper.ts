import { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
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
    data?: any,
    config?: AxiosRequestConfig,
    isRecursion: boolean = false
): Promise<AxiosResponse<T | ErrorData>> => {
    const url = `${prefix}${endpoint}`;

    const methods = {
        get: () => api.get<T | ErrorData>(url, config),
        post: () => api.post<T | ErrorData>(url, data, config),
        put: () => api.put<T | ErrorData>(url, data, config),
        patch: () => api.patch<T | ErrorData>(url, data, config),
        delete: () => api.delete<T | ErrorData>(url, config),
    };

    if (!methods[method]) {
        throw new Error(`Unsupported request method: ${method}`);
    }

    try {
        return await methods[method]();
    } catch (error: AxiosError<ErrorData> | unknown) {
        if (!isAxiosError(error) || !error.response) {
            throw error;
        }

        const errorData: ErrorData = error.response.data;

        if (['Invalid token', 'Not authenticated', 'Auth session not found'].includes(errorData.detail)) {
            if (isRecursion) {
                errorUnauthorized();
                return error.response;
            }

            const fingerprint = await getFingerprint();
            try {
                await refreshToken(fingerprint);
            } catch (refreshError) {
                return error.response;
            }
            return await apiRequest(method, prefix, endpoint, data, config, true);
        }

        return error.response as AxiosResponse<ErrorData>;
    }
};

export const saveCookies = <T>(
    fingerprint: string, responseData: T, encryptionKey?: string
): T => {
    if ((responseData as ErrorData).error_code) { return responseData; }
    const tokenData = responseData as TokenData;
    sessionStorage.setItem(STORAGE_ACCESS_TOKEN, tokenData.accessToken);
    const expiresIn = tokenData.refreshTokenExpiresIn * 60;
    Cookies.set(COOKIE_REFRESH_TOKEN, tokenData.refreshToken, { expires: expiresIn });
    _saveEncryptionKey(fingerprint, expiresIn, encryptionKey);
    return responseData;
};

export const deleteCookies = () => {
    Cookies.remove(COOKIE_REFRESH_TOKEN);
    Cookies.remove(COOKIE_ENCRYPTION_KEY);
    sessionStorage.removeItem(STORAGE_ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_ENCRYPTION_KEY);
};

const refreshToken = async (
    fingerprint: string
): Promise<any> => {
    const refreshTokenCookie = Cookies.get(COOKIE_REFRESH_TOKEN);
    if (!refreshTokenCookie) {
        errorUnauthorized();
        throw new Error('Unauthorized');
    }
    const response = await api.post<TokenData | ErrorData>('/auth/refresh_tokens', {
        fingerprint
    }, { headers: { 'x-refresh-token': refreshTokenCookie } });
    const encryptionKey = Cookies.get(COOKIE_ENCRYPTION_KEY);
    deleteCookies();
    return saveCookies(fingerprint, response.data, encryptionKey);
};

export const getFingerprint = async (): Promise<string> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
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
};

export const errorUnauthorized = (redirect: boolean = true) => {
    if (redirect) {
        Router.push('/login');
    } else {
        throw new Error('Unauthorized');
    }
};
