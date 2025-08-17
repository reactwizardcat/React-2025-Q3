import Header from '@/components/Header';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-2.5">
        <section className="max-w-2xl text-center text-lg dark:text-white">
          <h1 className="mb-5 text-2xl font-bold capitalize">{t('title')}</h1>
          <p className="mb-2.5">{t('text')}</p>
          <p className="mb-2.5">
            {t('linktext')}
            <Link
              className="text-blue-400 underline-offset-5 hover:underline"
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('link')}
            </Link>
          </p>

          <Link
            href="https://github.com/reactwizardcat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline-offset-5 hover:underline"
          >
            {t('githublink')}
          </Link>
        </section>
      </main>
    </>
  );
}
