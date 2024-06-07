import { BaseType } from "./abc";

export interface UserBaseData extends BaseType {
    name: string;
    email: string;
}

export interface UserData extends UserBaseData {
    id: number;
    createdAt: string;
}

export interface UserCreateData extends UserBaseData {
    password: string;
}

export interface UserUpdateData extends UserBaseData { }
