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

/**
 * Describes an institutional decision without granting privileges.
 * Approval and publication are deliberately separate.
 */
export function getInstitutionalStatus(proposal, decision, publication) {
  if (!proposal || typeof proposal.id !== 'string') return 'invalid';
  const subject = proposal.type === 'local_variant' ? 'local_variant' : proposal.type;
  if (!COUNCIL_APPROVAL_SUBJECTS.includes(subject)) return 'invalid';
  if (!decision || decision.objectId !== proposal.id || decision.subject !== subject) return 'awaiting_council';
  if (decision.decidingBody !== LEADERSHIP_COUNCIL || !decision.decisionId) return 'awaiting_council';
  if (decision.outcome === 'rejected') return 'rejected';
  if (decision.outcome !== 'approved') return 'awaiting_council';
  if (publication?.objectId === proposal.id && publication?.approved === true && publication?.version === proposal.version) return 'published';
  return 'approved_not_published';
}
