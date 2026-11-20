/** Decisões institucionais confirmadas; helper de domínio, não controlo de acesso. */
export const LEADERSHIP_COUNCIL = 'conselho_de_lideranca';
export const COUNCIL_APPROVAL_SUBJECTS = Object.freeze(['general_culture','local_variant','exception','conflict']);
export function isCouncilApprovalRecorded(decision, subject) {
  return COUNCIL_APPROVAL_SUBJECTS.includes(subject)
    && decision?.subject === subject
    && decision?.decidingBody === LEADERSHIP_COUNCIL
    && decision?.outcome === 'approved'
    && typeof decision?.decisionId === 'string'
    && decision.decisionId.trim().length > 0;
}
export function isLocalProposalApproved(proposal, decision) {
  return proposal?.type === 'local_variant'
    && proposal?.id === decision?.objectId
    && isCouncilApprovalRecorded(decision, 'local_variant');
}
