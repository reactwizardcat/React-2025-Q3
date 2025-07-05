import React from 'react';
import type { CardResponse } from '../models/cards.model';

interface CardProps {
  data: CardResponse;
}

class Card extends React.Component<CardProps> {
  render() {
    const { name, element, region, weapon, images } = this.props.data;
    return (
      <div className="w-2xs">
        <h2>{name}</h2>
        <p>{element}</p>
        <p>{region}</p>
        <p>{weapon}</p>
        <div className="h-80 overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            src={images.large}
            alt={name}
          />
        </div>
      </div>
    );
  }
}

export default Card;
