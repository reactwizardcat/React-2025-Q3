import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { ITEMS_PER_PAGE } from '../constants';
import { MemoryRouter } from 'react-router';

describe('Pagination component', () => {
  const mockOnPageChange = vi.fn();
  const baseProps = {
    totalItems: 50,
    totalPages: 5,
    currentPage: 1,
    onPageChange: mockOnPageChange,
  };

  const renderWithRouter = (props = baseProps) => {
    return render(
      <MemoryRouter>
        <Pagination {...props} />
      </MemoryRouter>
    );
  };

  it('should not render when totalPages <= 1', () => {
    const { container } = renderWithRouter({ ...baseProps, totalPages: 1 });
    expect(container).toBeEmptyDOMElement();
  });

  it('should render correct showing information', () => {
    renderWithRouter();
    expect(
      screen.getByText(`Showing 1-${ITEMS_PER_PAGE} of ${baseProps.totalItems}`)
    ).toBeInTheDocument();
  });

  it('should render all navigation buttons', () => {
    renderWithRouter();

    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('‹')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
    expect(screen.getByText('»')).toBeInTheDocument();
  });

  it('should call onPageChange with correct page number when buttons clicked', async () => {
    renderWithRouter({ ...baseProps, currentPage: 3 });

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
    const { rerender } = renderWithRouter({ ...baseProps, currentPage: 1 });
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <Pagination {...baseProps} currentPage={3} />
      </MemoryRouter>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should calculate correct showing range', () => {
    renderWithRouter({ ...baseProps, currentPage: 2 });
    const start = (2 - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(2 * ITEMS_PER_PAGE, baseProps.totalItems);
    expect(
      screen.getByText(`Showing ${start}-${end} of ${baseProps.totalItems}`)
    ).toBeInTheDocument();
  });

  it('should disable prev buttons on first page', () => {
    renderWithRouter({ ...baseProps, currentPage: 1 });
    expect(screen.getByText('«')).toBeDisabled();
    expect(screen.getByText('‹')).toBeDisabled();
  });

  it('should disable next buttons on last page', () => {
    renderWithRouter({ ...baseProps, currentPage: 5 });
    expect(screen.getByText('›')).toBeDisabled();
    expect(screen.getByText('»')).toBeDisabled();
  });

  it('should navigate when page is changed', async () => {
    renderWithRouter({ ...baseProps, currentPage: 2 });
    await userEvent.click(screen.getByText('3'));
  });
});
