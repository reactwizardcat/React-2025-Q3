import { waitFor } from '@testing-library/react';
import DetailCard from './DetailCard';
import { renderWithProviders } from '../tests/RenderWithProwider';
import { MemoryRouter, Route, Routes } from 'react-router';

vi.mock('../layout/SideBarLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar">{children}</div>
  ),
}));

vi.mock('./UI/MyImage', () => ({
  default: vi.fn(({ src, alt, className, imageClassName }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="my-image"
      data-image-class={imageClassName}
    />
  )),
}));

vi.mock('./UI/MyButton', () => ({
  default: vi.fn(({ callback, children, className }) => (
    <button onClick={callback} className={className} data-testid="my-button">
      {children}
    </button>
  )),
}));

vi.mock('./Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('DetailCard component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={['/cards/1']}>
        <Routes>
          <Route path="/cards/:id" element={<DetailCard />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
