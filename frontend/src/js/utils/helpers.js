/**
 * Format a date string to "15 March 2025"
 * @param {string} dateString - YYYY-MM-DD string
 * @returns {string} Formatted date
 */
const longDateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

export function formatDate(dateString) {
    if (!dateString) return '';
    try {
        // Reuse the cached formatter
        return longDateFormatter.format(new Date(dateString));
    } catch (e) {
        return dateString;
    }
}
/**
 * Format a date string to "DD-MM-YYYY"
 * @param {string} dateString - YYYY-MM-DD string
 * @returns {string} Formatted date
 */
export function formatDateShort(dateString) {
    if (!dateString) return 'N/A';

    // MariaDB date is always "YYYY-MM-DD"
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    // Rearrange to DD-MM-YYYY
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
