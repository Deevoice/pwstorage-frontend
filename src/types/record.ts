import { BaseType } from "./abc";
import { RecordType } from './enums/record';
import { PaginationResponse } from './pagination';

export interface RecordBaseData extends BaseType {
    folderId: number | null;
    title: string;
    isFavorite: boolean;
    content: string | null;
}

export interface RecordData extends RecordBaseData {
    id: number;
    recordType: RecordType;
    createdAt: string;
    updatedAt: string;
}

export interface RecordCreateData extends RecordBaseData {
    recordType: RecordType;
}

export interface RecordUpdateData extends RecordBaseData { }

export interface RecordPaginationResponse extends PaginationResponse<RecordData> { }
