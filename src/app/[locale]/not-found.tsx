import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2.5">
      <h2 className="text-2xl">{t('text')}</h2>
      <Link
        className="text-blue-400 underline-offset-5 hover:underline"
        href="/search"
      >
        {t('link')}
      </Link>
    </main>
  );
}
