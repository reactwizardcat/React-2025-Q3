import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Card from './Card';
import type { CardResponse } from '../models/cards.model';

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
    const { container } = render(<Card data={mockCardData} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
