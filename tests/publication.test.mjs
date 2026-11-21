import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPublicProjection } from '../src/domain/publication.mjs';
const record = { id:'doc-1',title:'Princípio geral',summary:'Texto público',version:2,effectiveFrom:'2026-01-01',state:'published',classification:'public',publicationApproved:true,privateNotes:'NÃO PUBLICAR',email:'privado@example.org' };
const decision = { objectId:'doc-1',version:2,action:'publish',approved:true };
const now = new Date('2026-11-20T12:00:00Z');
test('A projeção pública nunca copia campos internos ou dados pessoais adicionais', () => {
  const result = buildPublicProjection(record, decision, now);
  assert.deepEqual(result,{id:'doc-1',title:'Princípio geral',summary:'Texto público',version:2,effectiveFrom:'2026-01-01'});
  assert.equal(Object.hasOwn(result,'privateNotes'),false);
  assert.equal(Object.hasOwn(result,'email'),false);
});
test('Bloqueia publicação sem decisão correspondente, sem aprovação ou com classificação interna', () => {
  for (const patch of [{state:'approved'},{classification:'internal'},{publicationApproved:false},{effectiveFrom:'2027-01-01'},{effectiveFrom:'invalid'},{effectiveUntil:'2026-01-02'}]) {
    assert.equal(buildPublicProjection({...record,...patch},decision,now),null);
  }
  for (const patch of [{objectId:'doc-2'},{version:1},{approved:false},{action:'approve'}]) {
    assert.equal(buildPublicProjection(record,{...decision,...patch},now),null);
  }
});
