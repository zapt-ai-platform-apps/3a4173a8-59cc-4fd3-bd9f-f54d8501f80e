/**
 * Format price in the user's locale with the specified currency
 * @param {number} amount - The monetary amount
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR')
 * @returns {string} - Formatted price string
 */
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncate Ethereum address for display
 * @param {string} address - The full Ethereum address
 * @returns {string} - Truncated address (e.g., 0x1234...5678)
 */
export function truncateAddress(address = '') {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Generate a random ID for temporary use
 * @returns {string} - Random ID string
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15);
}