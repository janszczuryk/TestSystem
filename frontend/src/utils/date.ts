export const getLocalizedDate = (date: Date | null): string => {
  return date ? date.toLocaleString() : '—';
}
