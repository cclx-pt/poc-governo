import test from 'node:test';
import assert from 'node:assert/strict';
import { isCouncilApprovalRecorded, isLocalProposalApproved, LEADERSHIP_COUNCIL } from '../src/domain/governance.mjs';
test('Cultura Geral, variantes, exceções e conflitos exigem decisão do CL', () => {
  for (const subject of ['general_culture','local_variant','exception','conflict']) {
    const d={subject,decidingBody:LEADERSHIP_COUNCIL,outcome:'approved',decisionId:'CL-2026-001'};
    assert.equal(isCouncilApprovalRecorded(d,subject),true);
    assert.equal(isCouncilApprovalRecorded({...d,decidingBody:'conselho_pastoral'},subject),false);
    assert.equal(isCouncilApprovalRecorded({...d,outcome:'proposed'},subject),false);
    assert.equal(isCouncilApprovalRecorded({...d,decisionId:''},subject),false);
  }
});
test('Uma proposta local não é aprovação e exige decisão vinculada ao objeto', () => {
  const proposal={type:'local_variant',id:'local-1'};
  const d={subject:'local_variant',objectId:'local-1',decidingBody:LEADERSHIP_COUNCIL,outcome:'approved',decisionId:'CL-001'};
  assert.equal(isLocalProposalApproved(proposal,d),true);
  assert.equal(isLocalProposalApproved(proposal,{...d,objectId:'local-2'}),false);
  assert.equal(isLocalProposalApproved(proposal,null),false);
});
