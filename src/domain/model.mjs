/**
 * Pure, versioned domain contract validation for synthetic POC data.
 * Not a persistence layer or an authorization boundary.
 */
export const ORG_TYPES = Object.freeze(['general','council','ministry','community']);
export const CULTURE_TYPES = Object.freeze(['general_culture','local_variant','exception','conflict']);
export const DECISION_OUTCOMES = Object.freeze(['approved','rejected','returned']);
const nonEmpty = value => typeof value === 'string' && value.trim().length > 0;
const validVersion = value => Number.isInteger(value) && value >= 1;

export function validateOrganizationalUnit(unit) {
  const errors=[];
  if (!nonEmpty(unit?.id)) errors.push('id obrigatório');
  if (!nonEmpty(unit?.name)) errors.push('nome obrigatório');
  if (!ORG_TYPES.includes(unit?.type)) errors.push('tipo de unidade inválido');
  if (unit?.parentId != null && (!nonEmpty(unit.parentId) || unit.parentId === unit.id)) errors.push('referência hierárquica inválida');
  return errors;
}

export function validateCultureProposal(proposal) {
  const errors=[];
  if (!nonEmpty(proposal?.id)) errors.push('id obrigatório');
  if (!CULTURE_TYPES.includes(proposal?.type)) errors.push('tipo de proposta inválido');
  if (!nonEmpty(proposal?.title)) errors.push('título obrigatório');
  if (!nonEmpty(proposal?.proposingUnitId)) errors.push('unidade proponente obrigatória');
  if (!validVersion(proposal?.version)) errors.push('versão inválida');
  if (proposal?.type === 'local_variant') {
    if (!nonEmpty(proposal?.referenceId) || !validVersion(proposal?.referenceVersion)) errors.push('variante sem referência geral versionada');
    if (!nonEmpty(proposal?.communityId)) errors.push('comunidade obrigatória');
  }
  return errors;
}

export function validateInstitutionalDecision(decision) {
  const errors=[];
  if (!nonEmpty(decision?.decisionId)) errors.push('identificador da decisão obrigatório');
  if (!nonEmpty(decision?.objectId)) errors.push('objeto obrigatório');
  if (!validVersion(decision?.version)) errors.push('versão do objeto obrigatória');
  if (!CULTURE_TYPES.includes(decision?.subject)) errors.push('assunto inválido');
  if (decision?.decidingBody !== 'conselho_de_lideranca') errors.push('órgão decisor inválido');
  if (!DECISION_OUTCOMES.includes(decision?.outcome)) errors.push('resultado inválido');
  return errors;
}
