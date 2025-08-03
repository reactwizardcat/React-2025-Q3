import Card from './Card';
import type { CardResponse } from '../models/cards.model';
import { renderWithProviders } from '../tests/RenderWithProwider';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cardsReducer from '../store/cardsSlice';
import { configureStore } from '@reduxjs/toolkit';

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

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useId: () => 'test-id',
  };
});

describe('Card component test', () => {
  it('should match snapshot', () => {
    const { container } = renderWithProviders(
      <Card data={mockCardData} isSelected={true} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display selected state when isSelected is true', () => {
    renderWithProviders(<Card data={mockCardData} isSelected={true} />);

    const bookmarkIcon = screen
      .getByLabelText(/Toggle bookmark/)
      .querySelector('svg');
    expect(bookmarkIcon).toHaveClass('stroke-red-400');
    expect(bookmarkIcon?.querySelector('path')).toHaveAttribute('fill');
  });

  it('should display unselected state when isSelected is false', () => {
    renderWithProviders(<Card data={mockCardData} isSelected={false} />);

    const bookmarkIcon = screen
      .getByLabelText(/Toggle bookmark/)
      .querySelector('svg');
    expect(bookmarkIcon).toHaveClass('stroke-gray-500');
    expect(bookmarkIcon?.querySelector('path')).not.toHaveAttribute(
      'fill="none"'
    );
  });

  it('should call addCard when bookmark is clicked', async () => {
    const testStore = configureStore({
      reducer: {
        cards: cardsReducer,
      },
      preloadedState: {
        cards: {
          cardsStore: {
            [mockCardData.id]: mockCardData,
          },
          cardsCounter: 0,
        },
      },
    });

    const dispatchSpy = vi.spyOn(testStore, 'dispatch');
    renderWithProviders(<Card data={mockCardData} isSelected={false} />, {
      store: testStore,
    });

    const bookmarkLabel = screen.getByLabelText(/Toggle bookmark/);
    await userEvent.click(bookmarkLabel);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'cards/addCard',
      payload: mockCardData,
    });
  });

  it('should call addCard when bookmark is clicked', async () => {
    const testStore = configureStore({
      reducer: {
        cards: cardsReducer,
      },
      preloadedState: {
        cards: {
          cardsStore: {
            [mockCardData.id]: mockCardData,
          },
          cardsCounter: 0,
        },
      },
    });

    const dispatchSpy = vi.spyOn(testStore, 'dispatch');
    renderWithProviders(<Card data={mockCardData} isSelected={true} />, {
      store: testStore,
    });

    const bookmarkLabel = screen.getByLabelText(/Toggle bookmark/);
    await userEvent.click(bookmarkLabel);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'cards/removeCard',
      payload: mockCardData,
    });
  });

  it('should display the character image', () => {
    renderWithProviders(<Card data={mockCardData} isSelected={false} />);

    const image = screen.getByAltText('Diluc');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImage);
  });
});
