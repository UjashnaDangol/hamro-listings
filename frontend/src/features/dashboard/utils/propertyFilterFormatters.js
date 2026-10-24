
/**
 * Format a number as Nepalese rupees.
 * Example: 2500000 -> Rs. 25,00,000
 */
export function fmt(value) {
  return `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

/**
 * Format large values compactly for slider labels.
 * Examples:
 * 20000 -> Rs. 20k
 * 500000 -> Rs. 5.0 L
 * 10000000 -> Rs. 1.0 Cr
 */
export function short(value) {
  const amount = Number(value);

  if (amount >= 10000000) {
    return `Rs. ${(amount / 10000000).toFixed(1)} Cr`;
  }

  if (amount >= 100000) {
    return `Rs. ${(amount / 100000).toFixed(1)} L`;
  }

  if (amount >= 1000) {
    return `Rs. ${Math.round(amount / 1000)}k`;
  }

  return `Rs. ${amount}`;
}

/**
 * Generate histogram heights for the price-range slider.
 * The returned values are normalized between 12 and 100.
 */
export function makeBars(count = 36) {
  return Array.from({ length: count }, (_, index) => {
    const position = index / Math.max(count - 1, 1);
    const curve = Math.sin(position * Math.PI);
    const variation = 0.35 + Math.random() * 0.65;

    return Math.round(12 + curve * variation * 88);
  });
}
