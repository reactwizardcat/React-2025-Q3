import { useTranslations } from 'next-intl';

export default function EmptyData() {
  const t = useTranslations('Cards');
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <p className="text-gray-500">{t('empty')}</p>
    </main>
  );
}
