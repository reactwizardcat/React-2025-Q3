import React from 'react';
import type { CardResponse } from '../models/cards.model';

interface CardProps {
  data: CardResponse;
}

class Card extends React.Component<CardProps> {
  render() {
    const { name, element, region, weapon, images } = this.props.data;
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <>
          <h2 className="font-allura text-center text-4xl">{name}</h2>
          <ul className="ml-3">
            <li className="flex flex-row gap-2">
              Element:
              <img
                src={`/Diamond_${element}.png`}
                alt={`${element} icon`}
                className="w-6 h-6 md:hover:scale-160 transition-transform duration-500 ease-in-out"
              />
              <span className="font-lobster tracking-widest">{element}</span>
            </li>
            <li className="flex flex-row gap-2">
              Region:
              <img
                src={`/Emblem_${region}.png`}
                alt={`${region} icon`}
                className="w-6 h-6 md:hover:scale-160 transition-transform duration-500 ease-in-out"
              />
              <span className="font-lobster tracking-widest">{region}</span>
            </li>
            <li className="flex flex-row gap-2">
              Weapon:
              <span className="font-lobster tracking-widest">{weapon}</span>
            </li>
          </ul>
        </>
        <div className="h-96 max-w-3xs overflow-hidden mx-auto mt-2.5">
          <img
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            src={images.large}
            alt={name}
          />
        </div>
      </div>
    );
  }
}

export default Card;
