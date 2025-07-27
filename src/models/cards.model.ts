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

export interface CardsResponse {
  cards: CardResponse[] | null;
  total_count: number;
  total_pages: number;
  page: number;
}
