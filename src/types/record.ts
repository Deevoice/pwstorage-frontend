import { RecordType } from './enums/record';
import { PaginationResponse } from './pagination';

export interface RecordBaseData {
    folderId?: number;
    title: string;
    isFavorite: boolean;
    content: string;
}

export interface RecordData extends RecordBaseData {
    id: number;
    recordType: RecordType;
}

export interface RecordCreateData extends RecordBaseData {
    recordType: RecordType;
}

export interface RecordUpdateData extends RecordBaseData { }

export interface RecordPaginationResponse extends PaginationResponse<RecordData> { }
