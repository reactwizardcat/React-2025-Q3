import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AboutPage from './AboutPage';

vi.mock('../components/Header', () => ({
  default: () => <div>HeaderLayout</div>,
}));

describe('AboutPage component test', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
