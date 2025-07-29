import type { CardResponse } from '../models/cards.model';
import MyImage from './UI/MyImage';

interface CardProps {
  data: CardResponse;
}

export default function Card({ data }: CardProps) {
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
      <MyImage src={images.large} alt={name} />
    </div>
  );
}
