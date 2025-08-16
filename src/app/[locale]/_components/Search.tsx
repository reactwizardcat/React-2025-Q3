import MyButton from './UI/MyButton';
import { cn } from '../_utils/cn';
import Header from './Header';
import { useTranslations } from 'next-intl';

interface SearchProps {
  changeQuery: (str: string) => void;
  queryString: string;
  isLoading: boolean;
}

export default function Search({
  isLoading,
  queryString,
  changeQuery,
}: SearchProps) {
  const t = useTranslations('Search');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('search');

    if (typeof value === 'string') {
      changeQuery(value.trim());
    }
  };

  return (
    <Header>
      <form onSubmit={handleSubmit} className="flex-1">
        <label
          className={cn(
            'relative mx-3.5 max-w-5xl bg-white lg:mx-auto',
            'flex flex-col items-center justify-center border border-gray-200 px-2 py-2 sm:flex-row',
            'gap-2 rounded-2xl shadow-2xl focus-within:border-gray-500'
          )}
          htmlFor="search-input"
        >
          <input
            className="peer w-full flex-1 rounded-md bg-white px-6 py-2 outline-none disabled:bg-gray-200"
            id="search-input"
            type="search"
            placeholder=" "
            defaultValue={queryString}
            disabled={isLoading}
            name="search"
          />
          <span
            className={cn(
              'pointer-events-none absolute top-4 left-6 text-gray-500 transition-all duration-200',
              'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
              'peer-not-placeholder-shown:-translate-y-7.5 peer-not-placeholder-shown:scale-80',
              'peer-not-placeholder-shown:rounded-full peer-not-placeholder-shown:bg-white/70',
              'peer-not-placeholder-shown:px-1 peer-focus:-translate-y-7.5 peer-focus:scale-75',
              'peer-focus:rounded-full peer-focus:bg-white peer-focus:px-1'
            )}
          >
            {t('placeholder')}
          </span>
          <MyButton
            className="font-lobster w-full sm:w-auto"
            type="submit"
            disabled={isLoading}
          >
            {t('button')}
          </MyButton>
        </label>
      </form>
    </Header>
  );
}
