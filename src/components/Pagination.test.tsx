import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { ITEMS_PER_PAGE } from '../constants';

describe('Pagination component', () => {
  const mockOnPageChange = vi.fn();
  const baseProps = {
    totalItems: 50,
    totalPages: 5,
    currentPage: 1,
    onPageChange: mockOnPageChange,
  };

  it('should not render when totalPages <= 1', () => {
    const { container } = render(<Pagination {...baseProps} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render correct showing information', () => {
    render(<Pagination {...baseProps} />);
    expect(
      screen.getByText(`Showing 1-${ITEMS_PER_PAGE} of ${baseProps.totalItems}`)
    ).toBeInTheDocument();
  });

  it('should render all navigation buttons', () => {
    render(<Pagination {...baseProps} />);

    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('‹')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
    expect(screen.getByText('»')).toBeInTheDocument();
  });

  it('should call onPageChange with correct page number when buttons clicked', async () => {
    render(<Pagination {...baseProps} currentPage={3} />);

    await userEvent.click(screen.getByText('«'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    await userEvent.click(screen.getByText('‹'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    await userEvent.click(screen.getByText('›'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);

    await userEvent.click(screen.getByText('»'));
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('should render correct visible pages based on current page', () => {
    const { rerender } = render(<Pagination {...baseProps} currentPage={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    rerender(<Pagination {...baseProps} currentPage={3} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should calculate correct showing range', () => {
    render(<Pagination {...baseProps} currentPage={2} />);
    const start = (2 - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(2 * ITEMS_PER_PAGE, baseProps.totalItems);
    expect(
      screen.getByText(`Showing ${start}-${end} of ${baseProps.totalItems}`)
    ).toBeInTheDocument();
  });

  it('should disable prev buttons on first page', () => {
    render(<Pagination {...baseProps} currentPage={1} />);
    expect(screen.getByText('«')).toBeDisabled();
    expect(screen.getByText('‹')).toBeDisabled();
  });

  it('should disable next buttons on last page', () => {
    render(<Pagination {...baseProps} currentPage={5} />);
    expect(screen.getByText('›')).toBeDisabled();
    expect(screen.getByText('»')).toBeDisabled();
  });
});
