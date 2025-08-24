import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlledForm from '../ControlledForm';
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '../../store/formsSlice';
import countriesReducer from '../../store/countriesSlice';
import { renderWithProviders } from '../../tests/renderWithProviders';

vi.mock('../utils/fileToBase64', () => ({
  fileToBase64: vi.fn().mockResolvedValue('mock-base64-data'),
}));

vi.mock('../ControlledPasswordStrength', () => ({
  default: vi.fn(() => (
    <div data-testid="password-strength">Password Strength Component</div>
  )),
}));

vi.stubGlobal('crypto', {
  randomUUID: () => 'mock-uuid-1234',
});

describe('ControlledForm component tests', () => {
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
    renderWithProviders(<ControlledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Accept Terms and Conditions')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Picture')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('submits form successfully with valid data', async () => {
    const testStore = createTestStore();

    renderWithProviders(<ControlledForm handleClose={mockHandleClose} />, {
      store: testStore,
    });

    await userEvent.type(screen.getByLabelText('Name'), 'john');
    await userEvent.type(screen.getByLabelText('Email'), 'aaa');
    await userEvent.type(screen.getByLabelText('Password'), 's');
    await userEvent.type(
      screen.getByLabelText('Confirm Password'),
      'StrongPass123!'
    );
    await userEvent.type(screen.getByLabelText('Country'), 'USA');

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Upload Picture');
    await userEvent.upload(fileInput, file);

    expect(
      screen.getByText(/name must start with an uppercase letter/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password must contain at least 1 number/i)
    ).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', async () => {
    renderWithProviders(<ControlledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });

    const closeButton = screen.getByLabelText('Close form');
    await userEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it('disables submit button when form is invalid', async () => {
    renderWithProviders(<ControlledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();

    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');

    expect(submitButton).toBeDisabled();
  });

  it('shows password strength component', async () => {
    renderWithProviders(<ControlledForm handleClose={mockHandleClose} />, {
      store: createTestStore(),
    });
    await userEvent.type(screen.getByLabelText('Password'), 'StrongPass123!');
    expect(screen.getByTestId('password-strength')).toBeInTheDocument();
  });
});
