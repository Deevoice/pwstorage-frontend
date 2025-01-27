import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MainLayout from '@/layouts/MainLayout';
import Record from '@/components/Record';
import { COOKIE_REFRESH_TOKEN } from '@/utils/constants';
import { errorUnauthorized } from '@/api/apiHelper';
import { getUser } from '@/api/user';
import { getRecords } from '@/api/record';
import { UserData } from '@/types/user';
import { OrderByType } from '@/types/enums/filter';
import { RecordCreateData, RecordUpdateData, RecordPaginationResponse, RecordFilterRequest } from '@/types/record';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import Sidebar from '@/components/sidebar/sidebar';
import RecordModal from '@/components/ui/ModalWindows/RecordModal';
import Pagination from '@mui/material/Pagination';
import { PaginationRequest } from '@/types/pagination';

const LkPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
    const [pagination, setPagination] = useState<PaginationRequest>({ limit: 10, page: 0 });
    const [recordFilter, setRecordFilter] = useState<RecordFilterRequest>({ updatedAtOrderBy: OrderByType.DESC });
    const [user, setUser] = useState<UserData | null>(null);
    const [records, setRecords] = useState<RecordPaginationResponse>({ items: [], totalItems: 0, totalPages: 1 });
    const [error, setError] = useState<string | null>(null);

    const handleAddRecord = () => {
        setSelectedRecordId(null);
        setIsModalOpen(true);
    };

    const handleEditRecord = (recordId: number) => {
        setSelectedRecordId(recordId);
        setIsModalOpen(true);
    };

    const handleSaveRecord = (data: RecordCreateData | RecordUpdateData) => {
        // НА ПОТОМ
        console.log(data);
        // if (!records) return;
        // if (selectedRecordId === null) {
        //     setRecords({
        //         items: [...records.items, { ...data, id: 1 }],
        //         total_items: records.total_items + 1,
        //         total_pages: records.total_pages,
        //     });
        // } else {
        //     setRecords({
        //         items: records.items.map(record =>
        //             record.id === selectedRecordId ? { ...record, ...data } : record
        //         ),
        //         total_items: records.total_items,
        //         total_pages: records.total_pages,
        //     });
        // }
    };

    useEffect(() => {
        if (pagination.page === 0) {
            setPagination({ ...pagination, page: 1 });
            return;
        }
        (async () => {
            const recordsData = await getRecords(pagination, recordFilter);
            setRecords(recordsData as RecordPaginationResponse);
        })();
    }, [pagination, recordFilter]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                setUser(userData as UserData);
            } catch (err) {
                console.error('Ошибка при получении данных:', err);
                setError('Ошибка при получении данных.');
            } finally {
                setLoading(false);
            }
        };

        if (!loading) return;
        if (Cookies.get(COOKIE_REFRESH_TOKEN)) {
            fetchData();
        } else {
            errorUnauthorized();
        }
    }, []);

    return (
        <MainLayout>
            <div className="vault-container">
                <Sidebar recordFilter={recordFilter} setRecordFilter={setRecordFilter} />
                <div className="vault-main">
                    <div className="vault-block">
                        <div className="vault-header">
                            <h1 className="vault-header__title">My Vault</h1>
                            <button className="add-btn" onClick={handleAddRecord}>
                                <PlaylistAddRoundedIcon /> add item
                            </button>
                            <RecordModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                recordId={selectedRecordId}
                                onSave={handleSaveRecord}
                            />
                        </div>
                        {loading ? (
                            <p>Загрузка...</p>
                        ) : (
                            <>
                                <div className="vault-items">
                                    {records.items.map(record => (
                                        <Record key={record.id} record={record} onClick={handleEditRecord} />
                                    ))}
                                </div>
                                <div className="pagination-block">
                                    <Pagination count={records.totalPages} shape="rounded" onChange={
                                        (_, page) => { setPagination({ ...pagination, page: page }); }
                                    } />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default LkPage;
