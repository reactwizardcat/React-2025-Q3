import type { CardResponse } from '../models/cards.model';

export function downloadCSV(data: Record<number, CardResponse>) {
  const dataArray = Object.values(data);
  const csvContent = [
    Object.keys(dataArray[0]).slice(0, -1).join(','),
    ...dataArray.map((item) => Object.values(item).slice(0, -1).join(',')),
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const clearUrl = () => {
    URL.revokeObjectURL(url);
  };
  return { url, clearUrl };
}
