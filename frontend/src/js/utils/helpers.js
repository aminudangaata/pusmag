/**
 * Format a date string to "15 March 2025"
 * @param {string} dateString - YYYY-MM-DD string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    if (!dateString) return ''

    try {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date)
    } catch (e) {
        console.error('Error formatting date:', e)
        return dateString
    }
}
