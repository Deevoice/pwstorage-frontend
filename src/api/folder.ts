import api from '@/lib/api';
import { FolderData, FolderCreateData, FolderUpdateData, FolderPaginationResponse } from '@/types/folder';

export const getFolders = async (): Promise<FolderPaginationResponse> => {
    const response = await api.get<FolderPaginationResponse>('/folders');
    return response.data;
};

export const getFolderById = async (id: number): Promise<FolderData> => {
    const response = await api.get<FolderData>(`/folders/${id}`);
    return response.data;
};

export const createFolder = async (data: FolderCreateData): Promise<FolderData> => {
    const response = await api.post<FolderData>('/folders', data);
    return response.data;
};

export const updateFolder = async (id: number, data: FolderUpdateData): Promise<FolderData> => {
    const response = await api.put<FolderData>(`/folders/${id}`, data);
    return response.data;
};

export const deleteFolder = async (id: number): Promise<null> => {
    const response = await api.delete(`/folders/${id}`);
    return response.data;
};
