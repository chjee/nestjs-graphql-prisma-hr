export function getJwtSecret(secret = process.env.JWT_SECRET): string {
  const trimmedSecret = secret?.trim();
  if (!trimmedSecret) {
    throw new Error('JWT_SECRET must be set');
  }
  return trimmedSecret;
}
