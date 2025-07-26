import { useState } from 'react';
import type { CardResponse } from '../models/cards.model';
import { cn } from '../utils/cn';

interface CardProps {
  data: CardResponse;
}

export default function Card({ data }: CardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const { name, element, region, weapon, images } = data;
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="m-auto max-w-3xs">
        <h2 className="font-allura text-center text-4xl">{name}</h2>
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
      <div
        className={cn(
          'mx-auto mt-2.5 h-96 max-w-2xs overflow-hidden bg-gray-300',
          { 'animate-pulse': !isLoaded }
        )}
      >
        <img
          className={cn(
            'h-full w-full object-cover transition-all duration-500 hover:scale-105',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          src={images.large}
          alt={name}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
