import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

vi.mock('../UncontrolledForm', () => ({
  default: vi.fn(({ handleClose }) => (
    <div data-testid="uncontrolled-form">
      <button onClick={handleClose}>Close Uncontrolled</button>
    </div>
  )),
}));

vi.mock('../ControlledForm', () => ({
  default: vi.fn(({ handleClose }) => (
    <div data-testid="controlled-form">
      <button onClick={handleClose}>Close Controlled</button>
    </div>
  )),
}));

vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode) => children,
}));

describe('Modal', () => {
  const mockHandleClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders uncontrolled form when formType="uncontrolled"', () => {
    render(<Modal formType="uncontrolled" handleClose={mockHandleClose} />);

    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it('renders controlled form when formType="controlled"', () => {
    render(<Modal formType="controlled" handleClose={mockHandleClose} />);

    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it('calls handleClose when clicking close button in form', async () => {
    const user = userEvent.setup();
    render(<Modal formType="uncontrolled" handleClose={mockHandleClose} />);

    const closeButton = screen.getByText('Close Uncontrolled');
    await user.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call handleClose when clicking on form content', async () => {
    const user = userEvent.setup();
    render(<Modal formType="uncontrolled" handleClose={mockHandleClose} />);

    const formContent = screen.getByTestId('uncontrolled-form');
    await user.click(formContent);

    expect(mockHandleClose).not.toHaveBeenCalled();
  });

  it('passes handleClose to child components', () => {
    render(<Modal formType="uncontrolled" handleClose={mockHandleClose} />);

    const closeButton = screen.getByText('Close Uncontrolled');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls showModal on dialog element when formType is provided', () => {
    render(<Modal formType="uncontrolled" handleClose={mockHandleClose} />);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
  });
});
