import { BaseType } from "./abc";

export interface UserBaseData extends BaseType {
    name: string;
    email: string;
}

export interface UserData extends UserBaseData {
    createdAt: Date;
}

export interface UserCreateData extends UserBaseData {
    password: string;
}

export interface UserUpdateData extends UserBaseData { }
