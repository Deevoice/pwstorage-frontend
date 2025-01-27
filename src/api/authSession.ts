import { ErrorData } from '@/types/error';
import { AuthSessionPaginationResponse } from '@/types/authSession';
import { PaginationRequest } from '@/types/pagination';
import { apiRequest } from './apiHelper';

const _prefix = '/auth_sessions';

export const getAuthSessions = async (
    pagination?: PaginationRequest
): Promise<AuthSessionPaginationResponse | ErrorData> => {
    const response = await apiRequest<AuthSessionPaginationResponse>(
        'get', _prefix, '/', null, { params: { ...pagination } }
    );
    return response.data;
};

export const deleteAuthSession = async (): Promise<null | ErrorData> => {
    const response = await apiRequest<null>('delete', _prefix, '/');
    return response.data;
};
