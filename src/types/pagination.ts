import { BaseType } from "./abc";

export interface PaginationResponse<T> extends BaseType {
    items: T[];
    total_items: number;
    total_pages: number;
}
