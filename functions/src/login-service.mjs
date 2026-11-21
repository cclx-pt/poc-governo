import { randomBytes, createHash } from 'node:crypto';
import { GENERIC_LOGIN_RESPONSE, emailLookupKey, isEligibleUser, normalizeLoginEmail } from './guards.mjs';

export const LINK_TTL_MS = 15 * 60 * 1000;
export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Server-controlled magic links + Firebase custom tokens.
 * Unlike direct Firebase email-link client calls, an anonymous browser
 * cannot trigger Firebase's own email sending endpoint.
 * All callers receive an indistinguishable public response.
 */
export async function requestLoginLink(emailInput, { findUser, allowAttempt, storeChallenge, sendLink, audit, baseUrl, now=Date.now }) {
  const email = normalizeLoginEmail(emailInput);
  if (!email) return GENERIC_LOGIN_RESPONSE;
  const key = emailLookupKey(email);
  try {
    if (!(await allowAttempt(key))) return GENERIC_LOGIN_RESPONSE;
    const user = await findUser(key);
    if (!isEligibleUser(user, email) || !user.uid) return GENERIC_LOGIN_RESPONSE;
    const token = randomBytes(32).toString('base64url');
    const challengeId = randomBytes(16).toString('hex');
    await storeChallenge({challengeId,tokenHash:hashToken(token),uid:user.uid,expiresAt:now()+LINK_TTL_MS});
    const link = new URL('/auth/confirm', baseUrl);
    link.searchParams.set('challenge', challengeId);
    link.searchParams.set('token', token);
    await sendLink(email, link.toString());
    await audit?.({event:'login_link_queued',uid:user.uid});
  } catch {
    // Do not leak account existence or provider failures to clients.
    try { await audit?.({event:'login_link_error'}); } catch { /* ignore */ }
  }
  return GENERIC_LOGIN_RESPONSE;
}

export async function redeemLoginLink({challengeId,token}, {consumeChallenge,findUserByUid,createCustomToken,now=Date.now}) {
  if (typeof challengeId !== 'string' || !/^[0-9a-f]{32}$/.test(challengeId)
      || typeof token !== 'string' || !/^[a-zA-Z0-9_-]{40,80}$/.test(token)) return null;
  // consumeChallenge must atomically check token hash and expiry, then mark used.
  const challenge = await consumeChallenge(challengeId,hashToken(token),now());
  if (!challenge) return null;
  const user = await findUserByUid(challenge.uid);
  if (!user || user.status !== 'active' || user.revoked === true || user.uid !== challenge.uid) return null;
  return createCustomToken(challenge.uid);
}
