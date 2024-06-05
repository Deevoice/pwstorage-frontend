import { PaginationResponse } from "./pagination";

export interface FolderBaseData {
    name: string;
    parentFolderId?: number;
}

export interface FolderData extends FolderBaseData {
    id: number;
    createdAt: string;
}

export interface FolderCreateData extends FolderBaseData { }

export interface FolderUpdateData extends FolderBaseData { }

export interface FolderPaginationResponse extends PaginationResponse<FolderData> { }
