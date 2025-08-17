import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ErrorElement({ message }: { message: string }) {
  const t = useTranslations('Cards');
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <p className="mt-10 max-w-3xl px-4 text-center text-2xl text-red-500">
        {message}
      </p>
      <Link className="mt-4" href="/cards/1">
        {t('link')}
      </Link>
    </main>
  );
}
