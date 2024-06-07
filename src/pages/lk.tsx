import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MainLayout from '@/layouts/MainLayout';
import Record from '@/components/Record';
import { COOKIE_REFRESH_TOKEN } from '@/utils/constants';
import { errorUnauthorized } from '@/api/apiHelper';
import { getUser } from '@/api/user';
import { getRecords } from '@/api/record';
import { UserData } from '@/types/user';
import { RecordPaginationResponse } from '@/types/record';
import { useFingerprint } from '@/context/FingerprintContext';

const LkPage: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [records, setRecords] = useState<RecordPaginationResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { fingerprint } = useFingerprint();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser(fingerprint);
                setUser(userData as UserData);

                const recordsData = await getRecords(fingerprint);
                setRecords(recordsData as RecordPaginationResponse);
            } catch (err) {
                console.error('Ошибка при получении данных:', err);
                setError('Ошибка при получении данных.');
            } finally {
                setLoading(false);
            }
        };

        if (fingerprint && Cookies.get(COOKIE_REFRESH_TOKEN)) {
            fetchData();
        } else if (!Cookies.get(COOKIE_REFRESH_TOKEN)) {
            errorUnauthorized();
        }
    }, [fingerprint]);

    if (loading) {
        return (
            <MainLayout>
                <h1>Lk Page</h1>
                <p>Загрузка...</p>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <h1>Lk Page</h1>
                <p>{error}</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <h1>Lk Page</h1>
            <p>User name: {user?.name}</p>
            {records ? (
                <ul>
                    {records.items.map(record => (
                        <Record
                            key={record.id}
                            id={record.id}
                            title={record.title}
                            content={record.content}
                            recordType={record.recordType}
                            folderId={record.folderId}
                            isFavorite={record.isFavorite}
                            createdAt={record.createdAt}
                            updatedAt={record.updatedAt}
                        />
                    ))}
                </ul>
            ) : (
                <p>Нет записей для отображения.</p>
            )}
        </MainLayout>
    );
};

export default LkPage;
