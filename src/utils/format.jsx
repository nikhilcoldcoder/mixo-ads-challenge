export function formatNumber(num) {
  return num?.toLocaleString() || "0";
}

export function formatCurrency(num) {
  return `$${(num || 0).toFixed(2)}`;
}
