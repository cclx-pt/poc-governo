import { emailLookupKey, normalizeLoginEmail, mayAdministerUser } from './guards.mjs';

export function validateNewMember({email,communityId,roles},actor) {
  const normalized=normalizeLoginEmail(email);
  const errors=[];
  if(!normalized) errors.push('email inválido');
  if(typeof communityId!=='string' || !/^[a-z0-9-]{2,64}$/.test(communityId)) errors.push('comunidade inválida');
  if(!Array.isArray(roles) || roles.length!==1 || roles[0]!=='member') errors.push('apenas papel member nesta operação');
  if(!mayAdministerUser(actor,communityId,roles)) errors.push('sem autorização para a comunidade');
  return {errors,normalized,lookupKey:normalized?emailLookupKey(normalized):null};
}

export function canDisableMember(actor,member) {
  if(!member || member.roles?.some(role=>role==='platform_master'||role==='cl_member')) return false;
  return mayAdministerUser(actor,member.communityId,['member']);
}
