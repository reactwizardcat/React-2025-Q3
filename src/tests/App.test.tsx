import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './renderWithProviders';
import App from '../App';

vi.mock('../components/Modal', () => ({
  default: function MockModal({
    formType,
    handleClose,
  }: {
    formType: 'uncontrolled' | 'controlled' | null;
    handleClose: () => void;
  }) {
    return (
      <div data-testid="modal" data-form-type={formType}>
        Mock Modal - {formType}
        <button onClick={handleClose} data-testid="close-modal">
          Close
        </button>
      </div>
    );
  },
}));

describe('App Component', () => {
  it('renders without crashing', async () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole('button', { name: 'controlled form' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'uncontrolled form' })
    ).toBeInTheDocument();
  });

  it('opens modal when controlled form button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const controlledButton = screen.getByRole('button', {
      name: 'controlled form',
    });
    await user.click(controlledButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toHaveAttribute(
      'data-form-type',
      'controlled'
    );
  });

  it('opens modal when uncontrolled form button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const uncontrolledButton = screen.getByRole('button', {
      name: 'uncontrolled form',
    });
    await user.click(uncontrolledButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal')).toHaveAttribute(
      'data-form-type',
      'uncontrolled'
    );
  });

  it('displays cards when store has data', async () => {
    const preloadedState = {
      cards: {
        cardsStore: {
          '1': {
            status: 'fulfilled',
            data: {
              name: 'Test Card',
              email: 'test@example.com',
            },
          },
        },
      },
      countries: {},
    };

    renderWithProviders(<App />, { preloadedState });
  });

  it('closes modal when handleClose is called', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const controlledButton = screen.getByRole('button', {
      name: 'controlled form',
    });
    await user.click(controlledButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-modal');
    await user.click(closeButton);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
