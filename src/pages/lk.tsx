import React, { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { refreshToken } from '@/api/auth';
import { getUser } from '@/api/user';
import { UserData } from '@/types/user';
import { useFingerprint } from '@/context/FingerprintContext';
import Cookies from 'js-cookie';

const LkPage: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { fingerprint } = useFingerprint();

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            try {
                const accessToken = sessionStorage.getItem('accessToken');
                if (!accessToken && fingerprint) {
                    const refreshTokenCookie = Cookies.get('refresh_token');
                    if (refreshTokenCookie) {
                        await refreshToken(fingerprint);
                    } else {
                        console.error('No refresh token available');
                    }
                }
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.error('Ошибка при получении данных пользователя или рефреше токена:', error);
            } finally {
                setLoading(false);
            }
        };

        if (fingerprint) {
            checkAndRefreshToken();
        }
    }, [fingerprint]);

    if (loading) {
        return (
            <MainLayout>
                <p>Загрузка...</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <h1>Lk Page</h1>
            {user ? (
                <div>
                    <p>Имя: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Отобразите другие данные пользователя по необходимости */}
                </div>
            ) : (
                <p>Не удалось загрузить данные пользователя.</p>
            )}
        </MainLayout>
    );
};

export default LkPage;
