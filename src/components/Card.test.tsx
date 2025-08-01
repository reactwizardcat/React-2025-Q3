import { describe, it, expect } from 'vitest';
import Card from './Card';
import type { CardResponse } from '../models/cards.model';
import { renderWithProviders } from '../tests/RenderWithProwider';

const mockImage = 'https://example.com/image.jpg';

const mockCardData: CardResponse = {
  id: 1,
  name: 'Diluc',
  element: 'Pyro',
  region: 'Mondstadt',
  weapon: 'Claymore',
  images: {
    large: mockImage,
    small: '',
  },
};

describe('Card component test', () => {
  it('should match snapshot', () => {
    const { container } = renderWithProviders(<Card data={mockCardData} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
