import {
    RecordData,
    RecordCreateData,
    RecordUpdateData,
    RecordPaginationResponse,
    RecordFilterRequest
} from '@/types/record';
import { ErrorData } from '@/types/error';
import { apiRequest } from './apiHelper';
import { PaginationRequest } from '@/types/pagination';

const _prefix = '/records';

export const getRecords = async (
    pagination?: PaginationRequest, filter?: RecordFilterRequest
): Promise<RecordPaginationResponse | ErrorData> => {
    const response = await apiRequest<RecordPaginationResponse>(
        'get', _prefix, '/', null, { params: { ...pagination, ...filter } }
    );
    return response.data;
};

export const getRecordById = async (id: number): Promise<RecordData | ErrorData> => {
    const response = await apiRequest<RecordData>('get', _prefix, `/${id}`);
    return response.data;
};

export const createRecord = async (data: RecordCreateData): Promise<RecordData | ErrorData> => {
    const response = await apiRequest<RecordData>('post', _prefix, '/', data);
    return response.data;
};

export const updateRecord = async (id: number, data: RecordUpdateData): Promise<RecordData | ErrorData> => {
    const response = await apiRequest<RecordData>('put', _prefix, `/${id}`, data);
    return response.data;
};

export const deleteRecord = async (id: number): Promise<null | ErrorData> => {
    const response = await apiRequest<null>('delete', _prefix, `/${id}`);
    return response.data;
};
