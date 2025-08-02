import { useId } from 'react';
import type { CardResponse } from '../models/cards.model';
import MyImage from './UI/MyImage';
import { useAppDispatch } from '../store/hooks';
import { toggleCard } from '../store/cardsSlice';
import { cn } from '../utils/cn';

interface CardProps {
  data: CardResponse;
  isSelected: boolean;
}

export default function Card({ data, isSelected }: CardProps) {
  const id = useId();
  const { name, element, region, weapon, images } = data;

  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleCard(data));
  };

  return (
    <div className="relative rounded-lg bg-white p-4 shadow-md dark:bg-gray-300/80 dark:shadow-white">
      <div className="m-auto max-w-3xs">
        <h2 className="font-allura text-center text-4xl">{name}</h2>
        <label
          htmlFor={`bookmark-toggle-${id}`}
          className="absolute top-3 right-3 inline-flex cursor-pointer items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            id={`bookmark-toggle-${id}`}
            className="hidden"
            checked={isSelected}
            onChange={toggle}
          />
          <svg
            viewBox="0 0 24 24"
            className={cn(
              'stroke-linecap-round stroke-linejoin-round h-10 w-10 fill-none stroke-2 drop-shadow-sm transition-all duration-300',
              isSelected ? 'stroke-red-400' : 'stroke-gray-500'
            )}
          >
            <defs>
              <linearGradient
                y2="100%"
                x2="100%"
                y1="0%"
                x1="0%"
                id={`gradientFill-${id}`}
              >
                <stop
                  style={{ stopColor: '#ff5a5f', stopOpacity: 1 }}
                  offset="0%"
                ></stop>
                <stop
                  style={{ stopColor: '#ff9a44', stopOpacity: 1 }}
                  offset="100%"
                ></stop>
              </linearGradient>
            </defs>
            <path
              fill={isSelected ? `url(#gradientFill-${id})` : 'none'}
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              className={cn(
                'transition-transform duration-300',
                isSelected ? 'scale-110' : 'scale-100',
                isSelected ? 'bookmark-pop' : 'none'
              )}
            ></path>
            <path
              d="M8 11l3 3 5-5"
              className={cn(
                'stroke-white transition-all duration-300',
                isSelected ? 'translate-x-0.5' : 'none'
              )}
            ></path>
          </svg>
        </label>
        <ul>
          <li className="flex flex-row items-center gap-2">
            Element:
            <img
              src={`/Diamond_${element}.png`}
              alt={`${element} icon`}
              className="h-8 w-8"
            />
            <span className="font-lobster tracking-widest">{element}</span>
          </li>
          <li className="flex h-4 flex-row items-center gap-2">
            Region:
            <img
              src={`/Emblem_${region}.png`}
              alt={`${region} icon`}
              className="h-8 w-8"
            />
            <span className="font-lobster tracking-widest">{region}</span>
          </li>
          <li className="flex flex-row gap-2">
            Weapon:
            <span className="font-lobster tracking-widest">{weapon}</span>
          </li>
        </ul>
      </div>
      <MyImage src={images.large} alt={name} />
    </div>
  );
}
