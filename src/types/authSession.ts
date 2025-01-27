import { BaseType } from "./abc";
import { PaginationResponse } from './pagination';

export interface AuthSessionBaseData extends BaseType {
    userIp: string;
    userAgent: string | null;
}

export interface AuthSessionData extends AuthSessionBaseData {
    id: string;
    lastOnline: Date;
    createdAt: Date;
}

export interface AuthSessionPaginationResponse extends PaginationResponse<AuthSessionData> { }
