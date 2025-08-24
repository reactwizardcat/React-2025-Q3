import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from '../UncontrolledForm';
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../../store/formsSlice';
import countriesReducer from '../../store/countriesSlice';
import { renderWithProviders } from '../../tests/renderWithProviders';

vi.mock('../utils/fileToBase64', () => ({
  fileToBase64: vi.fn().mockResolvedValue('mock-base64-data'),
}));

vi.mock('./UncontrolledPasswordStrength', () => ({
  default: vi.fn(({ length }) => (
    <div data-testid="password-strength">Strength: {length}</div>
  )),
}));

describe('UncontrolledForm component tests', () => {
  const mockHandleClose = vi.fn();
  const mockCountries = ['USA', 'Canada', 'Mexico'];

  const createTestStore = () => {
    return configureStore({
      reducer: {
        cards: formsReducer,
        countries: countriesReducer,
      },
      preloadedState: {
        countries: {
          CountryStore: mockCountries,
          loading: false,
          error: null,
        },
        cards: {
          cardsStore: {},
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with all form fields', () => {
    renderWithProviders(<UncontrolledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/accept terms and conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/upload picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted with invalid data', async () => {
    renderWithProviders(<UncontrolledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/age is required/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', async () => {
    renderWithProviders(<UncontrolledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });

    const closeButton = screen.getByLabelText(/close form/i);
    await userEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it('validates password strength component', async () => {
    renderWithProviders(<UncontrolledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });

    const passwordInput = screen.getByLabelText('Password');
    await userEvent.type(passwordInput, 'weak');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(screen.getByText(/Strength/i)).toHaveTextContent(/Weak password/i);
  });

  it('handles terms and conditions checkbox', async () => {
    renderWithProviders(<UncontrolledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/You must accept the Terms and Conditions/i)
    ).toBeInTheDocument();
  });
});
