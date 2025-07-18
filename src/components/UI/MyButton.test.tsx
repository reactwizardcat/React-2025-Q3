import MyButton from './MyButton';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

test('button visubility', () => {
  const text = 'Click Me';
  render(<MyButton>{text}</MyButton>);

  expect(screen.getByText(text)).toBeVisible();
});
