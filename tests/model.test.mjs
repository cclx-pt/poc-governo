import test from 'node:test';
import assert from 'node:assert/strict';
import { validateOrganizationalUnit, validateCultureProposal, validateInstitutionalDecision } from '../src/domain/model.mjs';

test('Unidades organizacionais exigem identidade, tipo e hierarquia coerente', () => {
  assert.deepEqual(validateOrganizationalUnit({id:'almada',name:'Almada',type:'community',parentId:'geral'}),[]);
  assert.ok(validateOrganizationalUnit({id:'almada',name:'Almada',type:'community',parentId:'almada'}).length);
  assert.ok(validateOrganizationalUnit({id:'',name:'',type:'invalid'}).length);
});

test('Variante local exige referência geral versionada e comunidade', () => {
  const valid={id:'v1',type:'local_variant',title:'Prática local',proposingUnitId:'almada',communityId:'almada',version:1,referenceId:'geral-1',referenceVersion:2};
  assert.deepEqual(validateCultureProposal(valid),[]);
  assert.ok(validateCultureProposal({...valid,referenceVersion:undefined}).length);
  assert.ok(validateCultureProposal({...valid,communityId:''}).length);
  assert.ok(validateCultureProposal({...valid,version:0}).length);
});

test('Decisões institucionais exigem CL e versão explícita', () => {
  const valid={decisionId:'CL-001',objectId:'v1',version:1,subject:'local_variant',decidingBody:'conselho_de_lideranca',outcome:'approved'};
  assert.deepEqual(validateInstitutionalDecision(valid),[]);
  assert.ok(validateInstitutionalDecision({...valid,decidingBody:'comunidade'}).length);
  assert.ok(validateInstitutionalDecision({...valid,version:0}).length);
  assert.ok(validateInstitutionalDecision({...valid,outcome:'published'}).length);
});
