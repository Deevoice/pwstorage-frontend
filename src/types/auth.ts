import { BaseType } from "./abc";

export interface LoginData extends BaseType {
    email: string;
    password: string;
    fingerprint: string;
    expiresIn: number;
}

export interface TokenData extends BaseType {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}
