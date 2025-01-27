import { BaseType } from "./abc";

export interface LoginData extends BaseType {
    email: string;
    password: string;
    fingerprint: string;
}

export interface TokenData extends BaseType {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}
