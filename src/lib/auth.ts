import { login, logout } from '@/api/auth';
import { createUser } from '@/api/user';
import { UserCreateData } from '@/types/user';
import { LoginData } from '@/types/auth';

export const loginUser = async (email: string, password: string, fingerprint: string, expiresIn: number) => {
    const loginData: LoginData = {
        email: email,
        password: password,
        fingerprint: fingerprint,
        expiresIn: expiresIn,
    };

    try {
        const user = await login(loginData);
        return user;
    } catch (error) {
        throw new Error('Authentication failed');
    }
};

export const registerUser = async (name: string, email: string, password: string) => {
    const registerData: UserCreateData = {
        name: name,
        email: email,
        password: password
    };

    try {
        const user = await createUser(registerData);
        return user;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

export const logoutUser = async () => {
    try {
        const user = await logout();
        return user;
    } catch (error) {
        throw new Error('Logout failed');
    }
};
