'use client';

import { downloadCSVAction } from '@/actions/DownloadCSVAction';
import MyButton from './UI/MyButton';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { clear } from '@/lib/cardsSlice';

export default function Flayout() {
  const count = useAppSelector((state) => state.cards.cardsCounter);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cards.cardsStore);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const t = useTranslations('Flayout');
  const saveToCSV = async () => {
    try {
      const { url, filename } = await downloadCSVAction(
        data,
        `${count}_items.csv`
      );
      if (linkRef.current) {
        linkRef.current.href = url;
        linkRef.current.download = filename;
        linkRef.current.click();
      }
    } catch (error) {
      console.error('Failed to download CSV:', error);
    }
  };

  const clearSaved = () => {
    dispatch(clear());
  };
  if (!count) {
    return null;
  }

  return (
    <div className="animate-fade-in-up animate-duration-500 fixed right-3 bottom-3 flex flex-col gap-3 rounded-md bg-blue-200/40 p-4 text-red-500 md:right-16 md:bottom-10">
      <p>
        {t('title')} {count}
      </p>
      <MyButton callback={saveToCSV}>{t('save')}</MyButton>
      <a
        href={''}
        ref={linkRef}
        download={`${count}_items.csv`}
        className="hidden"
      ></a>
      <MyButton callback={clearSaved} disabled={count === 0}>
        {t('clear')}
      </MyButton>
    </div>
  );
}
