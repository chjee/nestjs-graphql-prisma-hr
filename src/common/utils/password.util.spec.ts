import { hashPassword, verifyPassword } from './password.util';

describe('password util', () => {
  it('hashes a password into the database column budget and verifies it', async () => {
    const passwordHash = await hashPassword('whoami');

    expect(passwordHash).not.toBe('whoami');
    expect(passwordHash.length).toBeLessThanOrEqual(60);
    await expect(verifyPassword('whoami', passwordHash)).resolves.toBe(true);
    await expect(verifyPassword('wrong-password', passwordHash)).resolves.toBe(
      false,
    );
  });

  it('rejects unsupported plaintext password storage', async () => {
    await expect(verifyPassword('whoami', 'whoami')).rejects.toThrow(
      'Unsupported password hash format',
    );
  });
});
