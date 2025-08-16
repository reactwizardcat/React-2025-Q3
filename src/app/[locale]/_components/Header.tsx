'use client';

import { cn } from '../_utils/cn';
import { useTheme } from '../_hooks/useTheme';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import { useTranslations } from 'next-intl';

export default function Header({ children }: { children?: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Header');
  const pathName = usePathname();

  return (
    <header
      className={cn(
        'mx-4 mt-3 flex flex-col gap-3 rounded-t-4xl bg-white bg-[url("/fon2.png")]',
        'bg-cover bg-center bg-no-repeat px-5 py-4 shadow-md md:flex-row',
        'dark:bg-gray-400/40 dark:bg-blend-overlay'
      )}
    >
      {children}
      <nav className="md: mx-3 flex flex-row justify-between gap-4 md:flex-col">
        <ul className="flex items-center justify-evenly space-x-6">
          <li>
            <Link
              href="/about"
              className={cn(
                'text-xl font-semibold text-white transition duration-300 text-shadow-sm hover:text-red-600 hover:text-shadow-white',
                pathName === 'about'
                  ? 'pointer-events-none font-medium text-red-600 underline underline-offset-4 text-shadow-white'
                  : 'text-shadow-black'
              )}
            >
              {t('about')}
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              className={cn(
                'text-xl font-semibold text-white transition duration-300 text-shadow-sm hover:text-red-600 hover:text-shadow-white',
                pathName === 'search'
                  ? 'pointer-events-none font-medium text-red-600 underline underline-offset-4 text-shadow-white'
                  : 'text-shadow-black'
              )}
            >
              {t('search')}
            </Link>
          </li>
        </ul>
        <div className="flex justify-center gap-3">
          <label className="relative inline-flex cursor-pointer">
            <input
              className="peer sr-only"
              type="checkbox"
              onChange={toggleTheme}
              checked={theme}
            />
            <div className="h-10 w-20 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 transition-all duration-500 peer-checked:from-blue-400 peer-checked:to-indigo-500 after:absolute after:top-1 after:left-1 after:flex after:h-8 after:w-8 after:items-center after:justify-center after:rounded-full after:bg-white after:text-lg after:shadow-md after:transition-all after:duration-500 after:content-['☀️'] peer-checked:after:translate-x-10 peer-checked:after:content-['🌙']"></div>
          </label>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
