import { render } from '@testing-library/react';
import SceletonCard from './SceletonCard';

describe('SceletonCard snapshot test', () => {
  it('should match snapshot', () => {
    const { container } = render(<SceletonCard />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
