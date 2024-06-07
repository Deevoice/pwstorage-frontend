import crypto from 'crypto';
import { blake2bHex } from 'blakejs';

const algorithm = 'aes-256-cbc';

/**
 * Encrypts text using the provided key.
 * @param {string} text - The text to encrypt.
 * @param {string} key - The encryption key.
 * @returns {string} - The encrypted text in hex format.
 */
export const encryptText = (text: string, key: string = ''): string => {
    const iv = Buffer.alloc(16, 0); // Initialization vector (IV) filled with zeros
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(blake2bHex(key, undefined, 16), 'utf-8'), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

/**
 * Decrypts text using the provided key.
 * @param {string} encryptedText - The encrypted text in hex format.
 * @param {string} key - The decryption key.
 * @returns {string} - The decrypted text.
 */
export const decryptText = (encryptedText: string, key: string = ''): string => {
    const iv = Buffer.alloc(16, 0); // Initialization vector (IV) filled with zeros
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(blake2bHex(key, undefined, 16), 'utf-8'), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
