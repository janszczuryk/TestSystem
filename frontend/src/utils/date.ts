export const getLocalizedDate = (date: Date | string | null): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date ? date.toLocaleString() : '—';
}
