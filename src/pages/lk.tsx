import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import MainLayout from '@/layouts/MainLayout';
import Record from '@/components/Record';
import { refreshToken } from '@/api/apiHelper';
import { getUser } from '@/api/user';
import { getRecords } from '@/api/record';
import { UserData } from '@/types/user';
import { RecordPaginationResponse } from '@/types/record';
import { useFingerprint } from '@/context/FingerprintContext';

const LkPage: React.FC = () => {
    const [user, setUser] = useState<UserData>();
    const [records, setRecord] = useState<RecordPaginationResponse>();
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
                        Router.push('/login');
                    }
                }

                const userData = await getUser(fingerprint);
                setUser(userData as UserData);

                const recordsData = await getRecords(fingerprint);
                setRecord(recordsData as RecordPaginationResponse)
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

    return (
        <MainLayout>
            <h1>Lk Page</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <p>User name: {user?.name}</p>
                    {records ? (
                        <ul>
                            {
                                records.items.map(record => (
                                    <Record
                                        key={record.id}
                                        id={record.id}
                                        title={record.title}
                                        content={record.content}
                                        recordType={record.recordType}
                                        folderId={record.folderId}
                                        isFavorite={record.isFavorite}
                                    />
                                ))
                            }
                        </ul>
                    ) : (
                        <p>Нет записей для отображения.</p>
                    )}
                </>
            )}
        </MainLayout>
    );
};

export default LkPage;
