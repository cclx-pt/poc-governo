/**
 * Strict public projection builder. Pure POC domain logic, NOT a trusted backend.
 * Call only after authentication, institutional decision verification and authorization.
 */
export const PUBLIC_FIELDS = Object.freeze(['id', 'title', 'summary', 'version', 'effectiveFrom', 'updatedAt']);
const isIsoDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)?$/.test(value) && Number.isFinite(Date.parse(value));
export function buildPublicProjection(record, decision, now = new Date()) {
  if (!record || record.state !== 'published' || record.classification !== 'public' || record.publicationApproved !== true) return null;
  if (!decision || decision.objectId !== record.id || decision.version !== record.version || decision.action !== 'publish' || decision.approved !== true) return null;
  if (typeof record.id !== 'string' || !record.id.trim() || typeof record.title !== 'string' || !record.title.trim()) return null;
  if (!isIsoDate(record.effectiveFrom) || new Date(record.effectiveFrom).getTime() > now.getTime()) return null;
  if (record.effectiveUntil != null && (!isIsoDate(record.effectiveUntil) || new Date(record.effectiveUntil).getTime() <= now.getTime())) return null;
  const output = {};
  for (const field of PUBLIC_FIELDS) {
    if (Object.hasOwn(record, field) && ['string', 'number'].includes(typeof record[field])) output[field] = record[field];
  }
  return output;
}
