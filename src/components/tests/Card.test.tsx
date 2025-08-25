import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../Card';
import type { FormData } from '../../schema/formShema';

describe('Card Component', () => {
  const mockData: FormData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    password: 'Aa1!',
    confirmPassword: 'Aa1!',
    gender: 'male',
    country: 'Albania',
    picture: 'https://example.com/avatar.jpg',
  };

  it('renders correctly with full data', () => {
    const { container } = render(<Card el={mockData} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
