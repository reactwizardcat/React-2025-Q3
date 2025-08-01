import type { CardResponse } from '../models/cards.model';

export function downloadCSV(data: CardResponse[]) {
  const csvContent = [
    Object.keys(data[0]).join(','),
    ...data.map((item) => Object.values(item).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const clearUrl = () => {
    URL.revokeObjectURL(url);
  };
  return { url, clearUrl };
}
