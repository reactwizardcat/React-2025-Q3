import { render, screen } from '@testing-library/react';
import DetailCard from './DetailCard';
import type { CardResponse } from '../models/cards.model';
import { MemoryRouter } from 'react-router';

vi.mock('../layout/SideBarLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sidebar">{children}</div>
  ),
}));

vi.mock('./UI/MyImage', () => ({
  default: ({
    src,
    alt,
    className,
    imageClassName,
  }: {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="my-image"
      data-image-class={imageClassName}
    />
  ),
}));

const mockImage = 'https://example.com/image.jpg';

const mockCardData: CardResponse = {
  id: 1,
  name: 'Diluc',
  element: 'Pyro',
  region: 'Mondstadt',
  weapon: 'Claymore',
  images: {
    large: mockImage,
    small: '',
  },
};

describe('DetailCard component test', () => {
  beforeEach(() => {
    vi.mock('react-router', async (importOriginal) => {
      const actual = await importOriginal<typeof import('react-router')>();
      return {
        ...actual,
        useLoaderData: vi.fn(() => mockCardData),
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <DetailCard />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render all card details correctly', () => {
    render(
      <MemoryRouter>
        <DetailCard />
      </MemoryRouter>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();

    const image = screen.getByTestId('my-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImage);
    expect(image).toHaveAttribute('alt', 'Diluc');
    expect(image).toHaveClass('mt-0 h-full w-full');

    expect(screen.getByText('Diluc')).toBeInTheDocument();
    expect(screen.getByText('Element: Pyro')).toBeInTheDocument();
    expect(screen.getByText('Region: Mondstadt')).toBeInTheDocument();
    expect(screen.getByText('Weapon: Claymore')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should render Link with correct "to" prop', () => {
    render(
      <MemoryRouter>
        <DetailCard />
      </MemoryRouter>
    );

    const link = screen.getByText('Close').closest('a');
    expect(link).toHaveAttribute('href', '/');
  });
});
