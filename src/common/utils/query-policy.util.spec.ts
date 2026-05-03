import {
  DEFAULT_QUERY_TAKE,
  MAX_QUERY_TAKE,
  normalizeSkip,
  normalizeTake,
  withListQueryPolicy,
} from './query-policy.util';

describe('query policy utilities', () => {
  describe('normalizeSkip', () => {
    it('omits skip when not provided', () => {
      expect(normalizeSkip()).toBeUndefined();
      expect(normalizeSkip(null)).toBeUndefined();
    });

    it('clamps negative skip to zero', () => {
      expect(normalizeSkip(-10)).toBe(0);
    });

    it('preserves non-negative skip values', () => {
      expect(normalizeSkip(25)).toBe(25);
    });
  });

  describe('normalizeTake', () => {
    it('uses the default take when not provided', () => {
      expect(normalizeTake()).toBe(DEFAULT_QUERY_TAKE);
      expect(normalizeTake(null)).toBe(DEFAULT_QUERY_TAKE);
    });

    it('clamps negative take to zero', () => {
      expect(normalizeTake(-5)).toBe(0);
    });

    it('caps take at the maximum value', () => {
      expect(normalizeTake(MAX_QUERY_TAKE + 1)).toBe(MAX_QUERY_TAKE);
    });

    it('preserves take values inside the allowed range', () => {
      expect(normalizeTake(20)).toBe(20);
    });
  });

  describe('withListQueryPolicy', () => {
    it('adds default pagination and ordering', () => {
      expect(withListQueryPolicy({}, { id: 'asc' })).toEqual({
        skip: undefined,
        take: DEFAULT_QUERY_TAKE,
        orderBy: { id: 'asc' },
      });
    });

    it('preserves explicit orderBy while normalizing pagination', () => {
      expect(
        withListQueryPolicy(
          { skip: -1, take: MAX_QUERY_TAKE + 50, orderBy: { id: 'desc' } },
          { id: 'asc' },
        ),
      ).toEqual({
        skip: 0,
        take: MAX_QUERY_TAKE,
        orderBy: { id: 'desc' },
      });
    });

    it('preserves unrelated query parameters', () => {
      const where = { name: { contains: 'A' } };
      const cursor = { id: 1 };

      expect(withListQueryPolicy({ where, cursor }, { id: 'asc' })).toEqual({
        where,
        cursor,
        skip: undefined,
        take: DEFAULT_QUERY_TAKE,
        orderBy: { id: 'asc' },
      });
    });
  });
});
