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
            <li>
              Element:{' '}
              <span className="font-lobster tracking-widest">{element}</span>
            </li>
            <li>
              Region:{' '}
              <span className="font-lobster tracking-widest">{region}</span>
            </li>
            <li>
              Weapon:{' '}
              <span className="font-lobster tracking-widest">{weapon}</span>
            </li>
          </ul>
        </>
        <div className="h-80 max-w-3xs overflow-hidden mx-auto mt-2.5">
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
