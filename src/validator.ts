import type { CardResponse, CardsResponse } from './models/cards.model';

export function isValidData(data: unknown): data is CardsResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'total_count' in data &&
    typeof data.total_count === 'number' &&
    'total_pages' in data &&
    typeof data.total_pages === 'number' &&
    'page' in data &&
    typeof data.page === 'number' &&
    'cards' in data &&
    (data.cards === null ||
      (Array.isArray(data.cards) && isValidCard(data.cards[0])))
  );
}

function isValidCard(card: unknown): card is CardResponse {
  return (
    typeof card === 'object' &&
    card !== null &&
    'id' in card &&
    typeof card.id === 'number' &&
    'element' in card &&
    typeof card.element === 'string' &&
    'name' in card &&
    typeof card.name === 'string' &&
    'region' in card &&
    typeof card.region === 'string' &&
    'weapon' in card &&
    typeof card.weapon === 'string' &&
    'images' in card &&
    typeof card.images === 'object' &&
    card.images !== null &&
    'large' in card.images &&
    typeof card.images.large === 'string' &&
    'small' in card.images &&
    typeof card.images.small === 'string'
  );
}
