import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader snapshot test', () => {
  it('should match snapshot', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
