import { ErrorData } from '@/types/error';
import { SettingsData, SettingsUpdateData } from '@/types/settings';
import { apiRequest } from './apiHelper';

const _prefix = '/settings';

export const getSettings = async (): Promise<SettingsData | ErrorData> => {
    const response = await apiRequest<SettingsData>('get', _prefix, '/');
    return response.data;
};

export const updateSettings = async (data: SettingsUpdateData): Promise<SettingsData | ErrorData> => {
    const response = await apiRequest<SettingsData>('put', _prefix, '/', data);
    return response.data;
};
