import { FolderData, FolderCreateData, FolderUpdateData, FolderPaginationResponse } from '@/types/folder';
import { ErrorData } from '@/types/error';
import { apiRequest } from './apiHelper';

const _prefix = '/folders';

export const getFolders = async (): Promise<FolderPaginationResponse | ErrorData> => {
    const response = await apiRequest<FolderPaginationResponse>('get', _prefix, '/');
    return response.data;
};

export const getFolderById = async (id: number): Promise<FolderData | ErrorData> => {
    const response = await apiRequest<FolderData>('get', _prefix, `/${id}`);
    return response.data;
};

export const createFolder = async (data: FolderCreateData): Promise<FolderData | ErrorData> => {
    const response = await apiRequest<FolderData>('post', _prefix, '/', data);
    return response.data;
};

export const updateFolder = async (id: number, data: FolderUpdateData): Promise<FolderData | ErrorData> => {
    const response = await apiRequest<FolderData>('put', _prefix, `/${id}`, data);
    return response.data;
};

export const deleteFolder = async (id: number): Promise<null | ErrorData> => {
    const response = await apiRequest<null>('delete', _prefix, `/${id}`);
    return response.data;
};
