import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { ErrorData } from '@/types/error';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
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
