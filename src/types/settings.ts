import { BaseType } from "./abc";

export interface SettingsBaseData extends BaseType {
    authSessionExpiration: number;
}

export interface SettingsData extends SettingsBaseData { }

export interface SettingsUpdateData extends SettingsBaseData { }
