// pages/api/hash.js
import crypto from 'crypto';

export function hashString(inputString: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(inputString);
  return hash.digest('hex');
}