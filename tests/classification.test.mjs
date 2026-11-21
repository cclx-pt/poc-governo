import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultClassification, assessClassificationChange, mayPublish } from '../src/domain/classification.mjs';

test('Classificação automática usa valores conservadores', () => {
  assert.equal(defaultClassification('personal_record'),'confidential');
  assert.equal(defaultClassification('local_variant'),'restricted');
  assert.equal(defaultClassification('unknown'),'confidential');
});

test('Aumentar restrição exige autorização e justificação', () => {
  assert.equal(assessClassificationChange({current:'internal',requested:'confidential',authorized:true,reason:'Dados pessoais'}).allowed,true);
  assert.equal(assessClassificationChange({current:'internal',requested:'confidential',authorized:false,reason:'Dados pessoais'}).allowed,false);
  assert.equal(assessClassificationChange({current:'internal',requested:'confidential',authorized:true,reason:''}).allowed,false);
});

test('Reduzir restrição requer aprovação separada e nunca publicação implícita', () => {
  const change=assessClassificationChange({current:'confidential',requested:'public',authorized:true,reason:'Versão anonimizada'});
  assert.equal(change.allowed,false);
  assert.equal(change.requiresReview,true);
  assert.equal(mayPublish({classification:'public',state:'approved',publicationApproved:true}),false);
  assert.equal(mayPublish({classification:'public',state:'published',publicationApproved:false}),false);
});
