import { BaseType } from "./abc";

export interface PaginationRequest extends BaseType {
    limit: number;
    page: number;
}

export interface PaginationResponse<T> extends BaseType {
    items: T[];
    totalItems: number;
    totalPages: number;
}
