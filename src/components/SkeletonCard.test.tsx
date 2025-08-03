import { render } from '@testing-library/react';
import SceletonCard from './SkeletonCard';

describe('Sceleton component test', () => {
  it('should match snapshot', () => {
    const { container } = render(<SceletonCard />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
