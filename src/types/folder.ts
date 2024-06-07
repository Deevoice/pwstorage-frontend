import { BaseType } from "./abc";
import { PaginationResponse } from './pagination';

export interface FolderBaseData extends BaseType {
    name: string;
    parentFolderId: number | null;
}

export interface FolderData extends FolderBaseData {
    id: number;
    createdAt: string;
}

export interface FolderCreateData extends FolderBaseData { }

export interface FolderUpdateData extends FolderBaseData { }

export interface FolderPaginationResponse extends PaginationResponse<FolderData> { }
