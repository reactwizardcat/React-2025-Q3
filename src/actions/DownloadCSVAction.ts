'use server';

import type { CardResponse } from '../models/cards.model';

function generateCSVContent<T extends Record<PropertyKey, CardResponse>>(
  data: T
): string {
  const dataArray = Object.values(data);
  if (dataArray.length === 0) {
    return '';
  }
  return [
    Object.keys(dataArray[0]).slice(0, -1).join(','),
    ...dataArray.map((item) => Object.values(item).slice(0, -1).join(',')),
  ].join('\n');
}

export async function downloadCSVAction<
  T extends Record<PropertyKey, CardResponse>,
>(
  data: T,
  filename: string = 'download.csv'
): Promise<{ url: string; filename: string }> {
  const csvContent = generateCSVContent(data);

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const buffer = Buffer.from(await blob.arrayBuffer());
  const base64Data = buffer.toString('base64');

  return {
    url: `data:text/csv;base64,${base64Data}`,
    filename,
  };
}
