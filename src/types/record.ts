import { BaseType } from "./abc";
import { RecordType } from './enums/record';
import { OrderByType } from "./enums/filter";
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
    createdAt: Date;
    updatedAt: Date;
}

export interface RecordCreateData extends RecordBaseData {
    recordType: RecordType;
}

export interface RecordUpdateData extends RecordBaseData { }

export interface RecordPaginationResponse extends PaginationResponse<RecordData> { }

export interface RecordFilterRequest extends BaseType {
    folderIdEq?: number;
    recordTypeEq?: RecordType;

    titleOrderBy?: OrderByType;
    createdAtOrderBy?: OrderByType;
    updatedAtOrderBy?: OrderByType;

    titleEq?: string;
    titleIlike?: string;

    createdAtFrom?: string;
    createdAtTo?: string;

    updatedAtFrom?: string;
    updatedAtTo?: string;

    isFavorite?: boolean;
}
