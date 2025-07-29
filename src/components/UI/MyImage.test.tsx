import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import MyImage from './MyImage';

describe('MyImage component', () => {
  const mockSrc = 'https://example.com/image.jpg';
  const mockAlt = 'Test image';

  beforeEach(() => {
    global.Image = class {
      onload: () => void = vi.fn();
      constructor() {
        setTimeout(() => {
          this.onload();
        }, 100);
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders image container with loading state', () => {
    render(<MyImage src={mockSrc} alt={mockAlt} />);

    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('animate-pulse');
    expect(container).toHaveClass('bg-gray-300');
  });

  it('shows image with opacity-0 when not loaded', () => {
    render(<MyImage src={mockSrc} alt={mockAlt} />);

    const image = screen.getByRole('img');
    expect(image).toHaveClass('opacity-0');
  });

  it('changes state when image loads', async () => {
    render(<MyImage src={mockSrc} alt={mockAlt} />);

    const image = screen.getByRole('img');

    await act(async () => {
      image.dispatchEvent(new Event('load'));
    });

    const container = image.parentElement;
    expect(container).not.toHaveClass('animate-pulse');
    expect(image).toHaveClass('opacity-100');
  });

  it('applies hover effect', () => {
    render(<MyImage src={mockSrc} alt={mockAlt} />);

    const image = screen.getByRole('img');
    expect(image).toHaveClass('hover:scale-105');
  });

  it('accepts custom classNames', () => {
    render(
      <MyImage
        src={mockSrc}
        alt={mockAlt}
        className="custom-container"
        imageClassName="custom-image"
      />
    );

    const container = screen.getByRole('img').parentElement;
    const image = screen.getByRole('img');

    expect(container).toHaveClass('custom-container');
    expect(image).toHaveClass('custom-image');
  });

  it('has correct default dimensions', () => {
    render(<MyImage src={mockSrc} alt={mockAlt} />);

    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('h-96');
    expect(container).toHaveClass('max-w-2xs');
  });

  it('uses proper object-fit', () => {
    render(<MyImage src={mockSrc} alt={mockAlt} />);

    const image = screen.getByRole('img');
    expect(image).toHaveClass('object-cover');
  });
});
