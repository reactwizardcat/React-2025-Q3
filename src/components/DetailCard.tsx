import { Link, useParams } from 'react-router';
import SideBarLayout from '../layout/SideBarLayout';
import MyImage from './UI/MyImage';
import { cn } from '../utils/cn';
import { useGetCardByIdQuery } from '../api/cardsApi';
import Loader from './Loader';
import { getErrorMessage } from '../utils/getErrorMessage';

export default function DetailCard() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useGetCardByIdQuery(id || '');

  if (isLoading) {
    return (
      <SideBarLayout>
        <Loader />
      </SideBarLayout>
    );
  }

  if (error) {
    return <p>{getErrorMessage(error)}</p>;
  }

  if (!data) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center">
        <p className="text-gray-500">No card found</p>
      </main>
    );
  }
  const { name, element, region, weapon, images } = data;
  return (
    <SideBarLayout>
      <MyImage
        src={images.large}
        alt={name}
        className="mt-0 h-full w-full"
        imageClassName="hover:scale-100"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 from-30% p-4">
        <h2 className="font-allura text-5xl font-medium text-white">{name}</h2>
        <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
          <div className="mt-2 overflow-hidden text-white/80 opacity-0 transition duration-600 group-hover:opacity-100">
            <p>Element: {element}</p>
            <p>Region: {region}</p>
            <p>Weapon: {weapon}</p>
          </div>
        </div>
      </div>
      <Link
        className={cn(
          'absolute -top-5 -left-5 inline-flex items-center justify-center rounded-4xl bg-gray-100 p-2 text-gray-400',
          'transition duration-300 hover:bg-blue-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500',
          'focus:outline-none focus:ring-inset hover:[&>svg]:stroke-red-500'
        )}
        to=".."
      >
        <svg
          className="h-6 w-6 stroke-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>
    </SideBarLayout>
  );
}
