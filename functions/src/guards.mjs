import { createHash } from 'node:crypto';

export const GENERIC_LOGIN_RESPONSE = Object.freeze({ message: 'Se o endereço estiver autorizado, receberás um email com o link de acesso.' });
export const MAX_EMAIL_LENGTH = 254;
export function normalizeLoginEmail(value) {
  if (typeof value !== 'string' || value.length > MAX_EMAIL_LENGTH) return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}
export function emailLookupKey(email) {
  return createHash('sha256').update(email).digest('hex');
}
export function isEligibleUser(user, email) {
  return Boolean(user && user.status === 'active' && user.revoked !== true
    && normalizeLoginEmail(user.email) === email);
}
export function mayAdministerUser(actor, targetCommunityId, requestedRoles) {
  if (!actor || actor.status !== 'active' || !targetCommunityId || !Array.isArray(requestedRoles)) return false;
  const allowed = new Set(['member', 'community_admin', 'cl_member', 'platform_master']);
  if (!requestedRoles.every(role => allowed.has(role))) return false;
  if (actor.roles?.includes('platform_master')) return true;
  return actor.roles?.includes('community_admin') && actor.adminCommunityIds?.includes(targetCommunityId)
    && requestedRoles.every(role => role === 'member');
}
export function sanitizedPublicProjection(record, approvedFields) {
  if (record?.classification !== 'public' || record?.state !== 'published'
      || record?.publicationApproved !== true || !Array.isArray(approvedFields)) return null;
  const projection = {};
  for (const field of approvedFields) {
    if (['title','summary','body','slug','version','effectiveFrom'].includes(field)
        && Object.hasOwn(record, field) && ['string','number'].includes(typeof record[field])) {
      projection[field] = record[field];
    }
  }
  return Object.keys(projection).length ? projection : null;
}
