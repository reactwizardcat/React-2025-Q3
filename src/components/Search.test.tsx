import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

vi.mock('./Header', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('search component tests', () => {
  beforeEach(() => vi.resetAllMocks());
  it('search input is disabled and have value', () => {
    const callBack = vi.fn();
    render(
      <Search queryString="aaa" isLoading={true} changeQuery={callBack} />
    );
    const input = screen.getByRole('searchbox');
    expect(input).toBeDisabled();
    expect(input).toHaveValue('aaa');
  });

  it('change previous search value "aaa" to "aaaaa"', async () => {
    const submitFn = vi.fn();
    render(
      <Search queryString="aaa" isLoading={false} changeQuery={submitFn} />
    );
    const input = screen.getByRole('searchbox');
    const submitBtn = screen.getByRole('button', { name: 'Search' });
    await userEvent.type(input, 'aa');
    await userEvent.click(submitBtn);
    expect(submitFn).toHaveBeenCalledOnce();
    expect(submitFn).toHaveBeenCalledWith('aaaaa');
  });
});
