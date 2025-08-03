import type { CardResponse } from '../models/cards.model';

export function createURL(
  data: Record<number | string | symbol, CardResponse>
) {
  const dataArray = Object.values(data);
  if (dataArray.length === 0) {
    const emptyBlob = new Blob([''], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(emptyBlob);
  }
  const csvContent = [
    Object.keys(dataArray[0]).slice(0, -1).join(','),
    ...dataArray.map((item) => Object.values(item).slice(0, -1).join(',')),
  ].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
}
