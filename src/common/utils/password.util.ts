import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCallback);
// s1 format intentionally fits the current User.password @db.VarChar(60).
// Changing salt/key sizes or format requires a data migration.
const PASSWORD_HASH_PREFIX = 's1';
const SALT_BYTES = 12;
const KEY_BYTES = 24;

export const DUMMY_PASSWORD_HASH =
  's1$auth-failure$1jrP4XxkhKAbnB9Lx4f33LO9Qv3aZfYL';

export class UnsupportedPasswordHashError extends Error {
  constructor() {
    super('Unsupported password hash format');
  }
}

function encodeBase64Url(value: Buffer): string {
  return value.toString('base64url');
}

function parsePasswordHash(passwordHash: string): {
  salt: string;
  hash: string;
} {
  const [prefix, salt, hash] = passwordHash.split('$');
  if (prefix !== PASSWORD_HASH_PREFIX || !salt || !hash) {
    throw new UnsupportedPasswordHashError();
  }
  return { salt, hash };
}

export async function hashPassword(password: string): Promise<string> {
  const salt = encodeBase64Url(randomBytes(SALT_BYTES));
  const key = (await scrypt(password, salt, KEY_BYTES)) as Buffer;
  return `${PASSWORD_HASH_PREFIX}$${salt}$${encodeBase64Url(key)}`;
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  const { salt, hash } = parsePasswordHash(passwordHash);
  const expected = Buffer.from(hash, 'base64url');
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;

  if (actual.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}
