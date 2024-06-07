import { BaseType } from "@/types/abc";
import { encryptText, decryptText } from "./cryptoUtils";

export const JSONStringToInterface = <T>(data: string, decryptionKey?: string): T => {
    const schema: T = JSON.parse(!!decryptionKey ? decryptText(data, decryptionKey) : data);
    return schema;
}

export const interfaceToJSONString = (data: BaseType, encryptionKey?: string): string => {
    const result = JSON.stringify(data);
    return !!encryptionKey ? encryptText(result, encryptionKey) : result;
}
