import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flayout from './Flayout';
import { renderWithProviders } from '../tests/RenderWithProwider';
import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../store/cardsSlice';

vi.mock('../utils/downloadToCSV', () => ({
  downloadCSV: vi.fn(() => ({
    url: 'mock-url',
    clearUrl: vi.fn(),
  })),
}));

describe('Flayout component tests', () => {
  it('renders correctly with count', () => {
    renderWithProviders(<Flayout count={2} />);

    expect(screen.getByText('Marked for saving: 2')).toBeInTheDocument();
    expect(screen.getByText('Save CSV')).toBeInTheDocument();
    expect(screen.getByText('Clear Saved')).toBeInTheDocument();
  });

  it('calls downloadCSV and triggers download when Save CSV button is clicked', async () => {
    const { container } = renderWithProviders(<Flayout count={2} />);
    const saveButton = screen.getByText('Save CSV');

    await userEvent.click(saveButton);

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', 'mock-url');
    expect(link).toHaveAttribute('download', '2_items.csv');
  });

  it('dispatches clear action when Clear Saved button is clicked', async () => {
    const testStore = configureStore({
      reducer: {
        cards: cardsReducer,
      },
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
    let link = container.querySelector('a');
    expect(link).toHaveAttribute('download', '2_items.csv');

    rerender(<Flayout count={5} />);
    link = container.querySelector('a');
    expect(link).toHaveAttribute('download', '5_items.csv');
  });
});
