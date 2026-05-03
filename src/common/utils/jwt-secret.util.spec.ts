import { getJwtSecret } from './jwt-secret.util';

describe('getJwtSecret', () => {
  it('returns the configured secret without adding extra characters', () => {
    expect(getJwtSecret('abc123')).toBe('abc123');
  });

  it('fails clearly when the secret is missing', () => {
    expect(() => getJwtSecret('')).toThrow('JWT_SECRET must be set');
  });
});
