import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flayout from './Flayout';
import { renderWithProviders } from '../tests/RenderWithProwider';
import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../store/cardsSlice';
import { cardsApi } from '../api/cardsApi';

vi.mock('../hooks/useDownloadCSV', () => ({
  default: vi.fn().mockReturnValue({
    linkRef: { current: document.createElement('a') },
    saveToCSV: vi.fn().mockImplementation(() => {
      const link = document.createElement('a');
      link.href = 'mock-url';
      return link;
    }),
  }),
}));

describe('Flayout component tests', () => {
  const originalClick = window.HTMLAnchorElement.prototype.click;

  beforeEach(() => {
    window.HTMLAnchorElement.prototype.click = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.HTMLAnchorElement.prototype.click = originalClick;
  });

  it('renders correctly with count', () => {
    renderWithProviders(<Flayout count={2} />);

    expect(screen.getByText('Marked for saving: 2')).toBeInTheDocument();
    expect(screen.getByText('Save CSV')).toBeInTheDocument();
    expect(screen.getByText('Clear Saved')).toBeInTheDocument();
  });

  it('dispatches clear action when Clear Saved button is clicked', async () => {
    const testStore = configureStore({
      reducer: {
        cards: cardsReducer,
        [cardsApi.reducerPath]: cardsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cardsApi.middleware),
      preloadedState: {
        cards: {
          cardsStore: {},
          cardsCounter: 2,
        },
      },
    });

    const dispatchSpy = vi.spyOn(testStore, 'dispatch');
    renderWithProviders(<Flayout count={2} />, { store: testStore });
    const clearButton = screen.getByText('Clear Saved');

    await userEvent.click(clearButton);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('disables Clear Saved button when count is 0', () => {
    renderWithProviders(<Flayout count={0} />);
    const clearButton = screen.getByText('Clear Saved');

    expect(clearButton).toBeDisabled();
  });

  it('updates download filename when count changes', () => {
    const { rerender, container } = renderWithProviders(<Flayout count={2} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('download', '2_items.csv');

    rerender(<Flayout count={5} />);
    expect(link).toHaveAttribute('download', '5_items.csv');
  });

  it('creates correct download link attributes', () => {
    const { container } = renderWithProviders(<Flayout count={3} />);
    const link = container.querySelector('a');

    expect(link).toHaveAttribute('download', '3_items.csv');
    expect(link).toHaveClass('hidden');
  });
});
