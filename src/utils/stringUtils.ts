/**
 * Returns a string consisting of every second character of the original string.
 * @param {string} str - The original string.
 * @returns {string} - A string consisting of every second character.
 */
export function getEverySecondChar(str: string): string {
    return str.split('').filter((_, index) => index % 2 !== 0).join('');
}
