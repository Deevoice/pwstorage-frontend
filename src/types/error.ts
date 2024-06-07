import { BaseType } from "./abc";

export interface ErrorData extends BaseType {
    detail: string;
    error_code: string;
    event_id: string;
}
