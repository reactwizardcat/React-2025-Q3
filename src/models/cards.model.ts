export interface CardResponse {
  element: string;
  id: number;
  images: {
    large: string;
    small: string;
  };
  name: string;
  region: string;
  weapon: string;
}

export interface CardsRespobse {
  cards: CardResponse[];
  total_count: number;
  total_pages: number;
}
