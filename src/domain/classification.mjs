import { CLASSIFICATIONS } from './policy.mjs';

/** Policy defaults for the POC; not an authorization boundary. */
export const DEFAULT_CLASSIFICATIONS = Object.freeze({
  institutional_structure: 'internal',
  general_culture: 'internal',
  local_variant: 'restricted',
  institutional_decision: 'restricted',
  process: 'internal',
  personal_record: 'confidential',
  sensitive_case: 'confidential'
});
const order = Object.freeze({public:0,internal:1,restricted:2,confidential:3});

export function defaultClassification(type) {
  return DEFAULT_CLASSIFICATIONS[type] ?? 'confidential';
}

export function assessClassificationChange({current, requested, authorized, reason}) {
  if (!CLASSIFICATIONS.includes(current) || !CLASSIFICATIONS.includes(requested)) return {allowed:false, requiresReview:false, reason:'Classificação inválida'};
  if (!authorized) return {allowed:false, requiresReview:false, reason:'Sem autorização'};
  if (current === requested) return {allowed:true, requiresReview:false, reason:'Sem alteração'};
  if (typeof reason !== 'string' || !reason.trim()) return {allowed:false, requiresReview:false, reason:'Justificação obrigatória'};
  if (order[requested] < order[current]) return {allowed:false, requiresReview:true, reason:'Redução de restrição requer aprovação'};
  return {allowed:true, requiresReview:false, reason:'Aumento de restrição permitido'};
}

export function mayPublish(record) {
  return record?.classification === 'public'
    && record?.publicationApproved === true
    && record?.state === 'published';
}
