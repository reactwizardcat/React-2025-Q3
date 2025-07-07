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
        <div className="max-w-3xs m-auto">
          <h2 className="font-allura text-center text-4xl">{name}</h2>
          <ul>
            <li className="flex flex-row gap-2 items-center">
              Element:
              <img
                src={`/Diamond_${element}.png`}
                alt={`${element} icon`}
                className="w-8 h-8"
              />
              <span className="font-lobster tracking-widest">{element}</span>
            </li>
            <li className="flex flex-row gap-2 items-center">
              Region:
              <img
                src={`/Emblem_${region}.png`}
                alt={`${region} icon`}
                className="w-8 h-8"
              />
              <span className="font-lobster tracking-widest">{region}</span>
            </li>
            <li className="flex flex-row gap-2">
              Weapon:
              <span className="font-lobster tracking-widest">{weapon}</span>
            </li>
          </ul>
        </div>
        <div className="h-96 max-w-2xs overflow-hidden mx-auto mt-2.5">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={images.large}
            alt={name}
          />
        </div>
      </div>
    );
  }
}

export default Card;
