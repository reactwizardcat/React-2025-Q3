import { describe, it, expect } from 'vitest';
import type { CardResponse, CardsResponse } from '../models/cards.model';
import { isValidCard, isValidData } from './validator';

describe('Validation functions', () => {
  const mockValidCard: CardResponse = {
    id: 1,
    element: 'Pyro',
    name: 'Diluc',
    region: 'Mondstadt',
    weapon: 'Claymore',
    images: {
      large: 'large.jpg',
      small: 'small.jpg',
    },
  };

  const mockValidCardsResponse: CardsResponse = {
    total_count: 100,
    total_pages: 10,
    page: 1,
    cards: [mockValidCard],
  };

  describe('isValidCard', () => {
    it('should return true for valid card', () => {
      expect(isValidCard(mockValidCard)).toBe(true);
    });

    it('should return false for non-object value', () => {
      expect(isValidCard(null)).toBe(false);
      expect(isValidCard(undefined)).toBe(false);
      expect(isValidCard('string')).toBe(false);
      expect(isValidCard(123)).toBe(false);
    });

    it('should return false when field types are invalid', () => {
      expect(isValidCard({ ...mockValidCard, id: '1' })).toBe(false);
      expect(isValidCard({ ...mockValidCard, element: 123 })).toBe(false);
    });

    it('should validate images object structure', () => {
      expect(isValidCard({ ...mockValidCard, images: null })).toBe(false);
      expect(isValidCard({ ...mockValidCard, images: {} })).toBe(false);
      expect(
        isValidCard({
          ...mockValidCard,
          images: { large: 123, small: 'small.jpg' },
        })
      ).toBe(false);
    });
  });

  describe('isValidData', () => {
    it('should return true for valid data', () => {
      expect(isValidData(mockValidCardsResponse)).toBe(true);
    });

    it('should return true when cards is null', () => {
      expect(isValidData({ ...mockValidCardsResponse, cards: null })).toBe(
        true
      );
    });

    it('should return false for non-object value', () => {
      expect(isValidData(null)).toBe(false);
      expect(isValidData(undefined)).toBe(false);
      expect(isValidData('string')).toBe(false);
      expect(isValidData(123)).toBe(false);
    });

    it('should return false when field types are invalid', () => {
      expect(
        isValidData({ ...mockValidCardsResponse, total_count: '100' })
      ).toBe(false);
      expect(isValidData({ ...mockValidCardsResponse, page: '1' })).toBe(false);
    });

    it('should validate cards array items', () => {
      expect(
        isValidData({
          ...mockValidCardsResponse,
          cards: [{ ...mockValidCard, id: 'invalid' }],
        })
      ).toBe(false);
    });

    it('should return false for empty cards array', () => {
      expect(isValidData({ ...mockValidCardsResponse, cards: [] })).toBe(false);
    });
  });
});
