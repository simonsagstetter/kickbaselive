/**
 * Compares two numbers, `a` and `b`, to determine their order with a specific rule:
 * - Zeros are moved to the end of the list.
 * - Positive numbers are sorted in descending order.
 * - Negative numbers are sorted in descending order.
 * - If one number is zero and the other is not, the zero is considered larger.
 *
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @returns {number} - Returns a negative number if `a` should come before `b`,
 *                     a positive number if `a` should come after `b`,
 *                     or zero if they are considered equal in terms of sorting.
 */
export function zerosLast(a, b) {
    if (a === 0 && b !== 0) return 1;
    if (b === 0 && a !== 0) return -1;
    if (a === 0 && b === 0) return 0;

    if (a > 0 && b > 0) return b - a;

    if (a < 0 && b < 0) return b - a;

    if (a > 0) return -1;
    if (b > 0) return 1;

    return 0;
}
