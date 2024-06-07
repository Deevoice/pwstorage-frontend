import { BaseType } from "./abc";

export interface RecordContentBase extends BaseType { }

export interface RecordContentNote extends RecordContentBase {
    data: string;
}

export interface RecordContentLogin extends RecordContentBase {
    login: string;
    password: string;
}

export interface RecordContentCard extends RecordContentBase {
    number: string;
    month: string;
    year: string;
    cvv: string;
    pin: string;
}
