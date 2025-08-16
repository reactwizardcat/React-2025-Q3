'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MyButton from './_components/UI/MyButton';
import { useTranslations } from 'next-intl';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const t = useTranslations('Error');

  useEffect(() => {
    console.log('Error caught in error.tsx:', {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  const handleReload = () => {
    reset();
    router.refresh();
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
      <h2 className="text-2xl">{t('title')}</h2>
      {error && <p className="text-red-400">{error.message}</p>}
      <MyButton callback={handleReload}>{t('button')}</MyButton>
    </div>
  );
}
