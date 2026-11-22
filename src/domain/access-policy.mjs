export const ROLES = Object.freeze({ MASTER: 'platform_master', COMMUNITY_ADMIN: 'community_admin', CL_MEMBER: 'cl_member', MEMBER: 'member' });
export const CLASSIFICATIONS = Object.freeze(['public', 'internal', 'restricted', 'confidential']);
export const ACCOUNT_STATES = Object.freeze(['invited', 'active', 'disabled']);
const normalize = value => typeof value === 'string' ? value.trim().toLowerCase() : '';
export function normalizeEmail(value) {
  const email = normalize(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}
export function canRequestLoginLink(user, requestedEmail) {
  const email = normalizeEmail(requestedEmail);
  return Boolean(email && user && normalizeEmail(user.email) === email && user.status === 'active' && user.revoked !== true);
}
export function canManageCommunity(actor, communityId) {
  if (!actor || actor.status !== 'active' || !communityId) return false;
  if (actor.roles?.includes(ROLES.MASTER)) return true;
  return actor.roles?.includes(ROLES.COMMUNITY_ADMIN) === true && actor.adminCommunityIds?.includes(communityId) === true;
}
export function canAssignRole(actor, communityId, role) {
  if (!Object.values(ROLES).includes(role)) return false;
  if (actor?.status !== 'active') return false;
  if (actor.roles?.includes(ROLES.MASTER)) return true;
  return role === ROLES.MEMBER && canManageCommunity(actor, communityId);
}
export function canReadRecord(actor, record) {
  if (!record || !CLASSIFICATIONS.includes(record.classification)) return false;
  if (record.classification === 'public') return record.published === true && record.publicProjection === true;
  if (!actor || actor.status !== 'active') return false;
  if (actor.roles?.includes(ROLES.MASTER)) return true;
  if (record.classification === 'confidential') return record.allowedUids?.includes(actor.uid) === true;
  const scoped = actor.communityIds?.includes(record.communityId) === true || actor.adminCommunityIds?.includes(record.communityId) === true;
  if (!scoped) return false;
  if (record.classification === 'internal') return true;
  return record.allowedUids?.includes(actor.uid) === true || (record.allowedRoles || []).some(role => actor.roles?.includes(role));
}
export function canPublish(record, approval) {
  return record?.classification === 'public' && approval?.approved === true && approval?.recordId === record?.id && approval?.version === record?.version;
}
