import { describe, it, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import Card from './Card';
import type { CardResponse } from '../models/cards.model';

const mockImage = 'https://example.com/image.jpg';
const mockElementIcon = '/Diamond_Pyro.png';
const mockRegionIcon = '/Emblem_Mondstadt.png';

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
  beforeEach(() => {
    global.Image = class {
      onload = vi.fn();
      constructor() {
        setTimeout(() => this.onload(), 0);
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders card with correct data', () => {
    render(<Card data={mockCardData} />);

    expect(screen.getByText('Diluc')).toBeInTheDocument();

    expect(screen.getByText('Element:')).toBeInTheDocument();
    expect(screen.getByText('Pyro')).toHaveClass(
      'font-lobster tracking-widest'
    );
    const elementImage = screen.getByAltText('Pyro icon');
    expect(elementImage).toHaveAttribute('src', mockElementIcon);
    expect(elementImage).toHaveClass('h-8 w-8');

    expect(screen.getByText('Region:')).toBeInTheDocument();
    expect(screen.getByText('Mondstadt')).toHaveClass(
      'font-lobster tracking-widest'
    );
    const regionImage = screen.getByAltText('Mondstadt icon');
    expect(regionImage).toHaveAttribute('src', mockRegionIcon);
    expect(regionImage).toHaveClass('h-8 w-8');

    expect(screen.getByText('Weapon:')).toBeInTheDocument();
    expect(screen.getByText('Claymore')).toHaveClass(
      'font-lobster tracking-widest'
    );

    const mainImage = screen.getByAltText('Diluc');
    expect(mainImage).toHaveAttribute('src', mockImage);
  });

  it('shows loading state (animate-pulse) before image loads', () => {
    render(<Card data={mockCardData} />);

    const imageContainer = screen.getByAltText('Diluc').closest('div');
    expect(imageContainer).toHaveClass('animate-pulse');

    expect(screen.getByAltText('Diluc')).toHaveClass('opacity-0');
  });

  it('removes loading state after image loads', () => {
    render(<Card data={mockCardData} />);

    const mainImage = screen.getByAltText('Diluc');
    act(() => {
      mainImage.dispatchEvent(new Event('load'));
    });

    const imageContainer = mainImage.closest('div');
    expect(imageContainer).not.toHaveClass('animate-pulse');
    expect(mainImage).toHaveClass('opacity-100');
  });

  it('applies hover effect class', () => {
    render(<Card data={mockCardData} />);

    const mainImage = screen.getByAltText('Diluc');
    expect(mainImage).toHaveClass('hover:scale-105');
  });
});
