import { apiRequest } from './apiHelper';
import { RecordData, RecordCreateData, RecordUpdateData, RecordPaginationResponse } from '@/types/record';
import { ErrorData } from '@/types/error';

const _prefix = '/records';

export const getRecords = async (
    fingerprint: string | null
): Promise<RecordPaginationResponse | ErrorData> => {
    const response = await apiRequest<RecordPaginationResponse>('get', _prefix, '/', fingerprint);
    return response.data;
};

export const getRecordById = async (
    fingerprint: string | null, id: number
): Promise<RecordData | ErrorData> => {
    const response = await apiRequest<RecordData>('get', _prefix, `/${id}`, fingerprint);
    return response.data;
};

export const createRecord = async (
    fingerprint: string | null, data: RecordCreateData
): Promise<RecordData | ErrorData> => {
    const response = await apiRequest<RecordData>('post', _prefix, '/', fingerprint, data);
    return response.data;
};

export const updateRecord = async (
    fingerprint: string | null, id: number, data: RecordUpdateData
): Promise<RecordData | ErrorData> => {
    const response = await apiRequest<RecordData>('put', _prefix, `/${id}`, fingerprint, data);
    return response.data;
};

export const deleteRecord = async (
    fingerprint: string | null, id: number
): Promise<null | ErrorData> => {
    const response = await apiRequest<null>('delete', _prefix, `/${id}`, fingerprint);
    return response.data;
};
