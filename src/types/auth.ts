export interface LoginData {
    email: string;
    password: string;
    fingerprint: string;
    expiresIn: number;
}

export interface TokenData {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}
