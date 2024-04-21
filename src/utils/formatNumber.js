/**
 * Formats a number with proper decimal places and thousands separators.
 * @param {number} [number=0] - The number to format (defaults to 0 if not provided).
 * @param {number} [decimals=2] - The number of decimal places to keep (defaults to 2).
 * @returns {string} - The formatted number as a string.
 */
export const formatNumber = (number = 0, decimals = 2) => {
    // Ensure the input is a valid number before formatting
    const validNumber = isNaN(number) ? 0 : number;
    
    return validNumber.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};
