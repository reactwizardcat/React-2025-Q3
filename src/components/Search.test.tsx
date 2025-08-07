import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

vi.mock('./Header', () => ({
  default: ({
    children,
    refresh,
  }: {
    children: React.ReactNode;
    refresh: () => void;
  }) => (
    <div>
      {children}
      <button onClick={refresh}>Mock Refresh</button>
    </div>
  ),
}));

vi.mock('./UI/MyButton', () => ({
  default: ({
    disabled,
    children,
  }: {
    disabled: boolean;
    children: React.ReactNode;
  }) => <button disabled={disabled}>{children}</button>,
}));

vi.mock('../utils/cn', () => ({
  cn: vi.fn().mockImplementation((...args) => args.join(' ')),
}));

describe('Search component', () => {
  const mockChangeQuery = vi.fn();
  const mockRefresh = vi.fn();
  const initialQuery = 'initial query';
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input with initial value and enabled when not loading', () => {
    render(
      <Search
        queryString={initialQuery}
        isLoading={false}
        changeQuery={mockChangeQuery}
        refresh={mockRefresh}
      />
    );

    const input = screen.getByRole('searchbox');
    expect(input).toBeEnabled();
    expect(input).toHaveValue(initialQuery);
    expect(screen.getByText('Enter search query...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeEnabled();
  });

  it('should disable input and button when loading', () => {
    render(
      <Search
        queryString={initialQuery}
        isLoading={true}
        changeQuery={mockChangeQuery}
        refresh={mockRefresh}
      />
    );

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(input).toHaveValue(initialQuery);
  });

  it('should call changeQuery when clicking search button', async () => {
    const testQuery = 'test query';
    render(
      <Search
        queryString=""
        isLoading={false}
        changeQuery={mockChangeQuery}
        refresh={mockRefresh}
      />
    );

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, testQuery);
    await user.click(button);

    expect(mockChangeQuery).toHaveBeenCalledTimes(1);
    expect(mockChangeQuery).toHaveBeenCalledWith(testQuery);
  });

  it('should call changeQuery when pressing Enter in input field', async () => {
    const testQuery = 'test query';
    render(
      <Search
        queryString=""
        isLoading={false}
        changeQuery={mockChangeQuery}
        refresh={mockRefresh}
      />
    );

    const input = screen.getByRole('searchbox');

    await user.type(input, `${testQuery}{Enter}`);

    expect(mockChangeQuery).toHaveBeenCalledTimes(1);
    expect(mockChangeQuery).toHaveBeenCalledWith(testQuery);
  });

  it('should trim input value when submitted via button click', async () => {
    const testQuery = '  test query  ';
    const expectedQuery = 'test query';
    render(
      <Search
        queryString=""
        isLoading={false}
        changeQuery={mockChangeQuery}
        refresh={mockRefresh}
      />
    );

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    await user.type(input, testQuery);
    await user.click(button);

    expect(mockChangeQuery).toHaveBeenCalledWith(expectedQuery);
  });

  it('should pass refresh prop to Header component', async () => {
    render(
      <Search
        queryString=""
        isLoading={false}
        changeQuery={mockChangeQuery}
        refresh={mockRefresh}
      />
    );

    const refreshButton = screen.getByText('Mock Refresh');
    await user.click(refreshButton);
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('should show floating label correctly', () => {
    render(
      <Search
        queryString=""
        isLoading={false}
        changeQuery={mockChangeQuery}
        refresh={mockRefresh}
      />
    );

    const label = screen.getByText('Enter search query...');
    expect(label).toHaveClass('peer-placeholder-shown:translate-y-0');
    expect(label).toHaveClass('peer-not-placeholder-shown:-translate-y-7.5');
  });
});
