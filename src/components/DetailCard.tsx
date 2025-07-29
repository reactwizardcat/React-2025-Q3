import { Link, useLoaderData } from 'react-router';
import SideBar from '../layout/SideBarLayout';
import type { CardResponse } from '../models/cards.model';
import MyImage from './UI/MyImage';

export default function DetailCard() {
  const { name, element, region, weapon, images } =
    useLoaderData<CardResponse>();
  return (
    <SideBar>
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
      <Link className="absolute top-5 right-5" to="..">
        Close
      </Link>
    </SideBar>
  );
}
