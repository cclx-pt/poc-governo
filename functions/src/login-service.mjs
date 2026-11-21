import { GENERIC_LOGIN_RESPONSE, emailLookupKey, isEligibleUser, normalizeLoginEmail } from './guards.mjs';

/**
 * Dependency-injected, server-only login request orchestration.
 * No link is generated for unknown, inactive or throttled accounts.
 * All callers receive an indistinguishable public response.
 */
export async function requestLoginLink(emailInput, { findUser, allowAttempt, createLink, sendLink, audit }) {
  const email = normalizeLoginEmail(emailInput);
  if (!email) return GENERIC_LOGIN_RESPONSE;
  const key = emailLookupKey(email);
  try {
    if (!(await allowAttempt(key))) return GENERIC_LOGIN_RESPONSE;
    const user = await findUser(key);
    if (!isEligibleUser(user, email)) return GENERIC_LOGIN_RESPONSE;
    const link = await createLink(email);
    await sendLink(email, link);
    await audit?.({event:'login_link_queued',userId:user.id ?? null});
  } catch (error) {
    // Do not leak account existence or provider failures to clients.
    await audit?.({event:'login_link_error',reason:'delivery_or_provider_failure'}).catch(() => {});
  }
  return GENERIC_LOGIN_RESPONSE;
}
