import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { STORAGE_ACCESS_TOKEN } from '@/utils/constants';
import { API_BASE_URL } from '@/utils/constants';
import { ErrorData } from '@/types/error';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem(STORAGE_ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    (error: AxiosError<ErrorData>) => {
        if (error.response?.status === 401) {
            const errorData = error.response.data;
            if (errorData.detail in [
                'Invalid refresh token',
                'Auth session not found',
                'Auth session deleted'
            ]) {
                Router.push('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
