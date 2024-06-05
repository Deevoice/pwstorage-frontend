import api from '@/lib/api';
import { RecordData, RecordCreateData, RecordUpdateData, RecordPaginationResponse } from '@/types/record';

export const getRecords = async (): Promise<RecordPaginationResponse> => {
    const response = await api.get<RecordPaginationResponse>('/records');
    return response.data;
};

export const getRecordById = async (id: number): Promise<RecordData> => {
    const response = await api.get<RecordData>(`/records/${id}`);
    return response.data;
};

export const createRecord = async (data: RecordCreateData): Promise<RecordData> => {
    const response = await api.post<RecordData>('/records', data);
    return response.data;
};

export const updateRecord = async (id: number, data: RecordUpdateData): Promise<RecordData> => {
    const response = await api.put<RecordData>(`/records/${id}`, data);
    return response.data;
};

export const deleteRecord = async (id: number): Promise<null> => {
    const response = await api.delete(`/records/${id}`);
    return response.data;
};
