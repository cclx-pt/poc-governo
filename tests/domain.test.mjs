import test from 'node:test';
import assert from 'node:assert/strict';
import { canAppearInPublicProjection, needsLocalVariantReview, validateProcessGraph } from '../src/domain/policy.mjs';

test('Publicação requer estado, classificação, aprovação e vigência', () => {
  const approved = {id:'doc-1',state:'published',classification:'public',publicationApproved:true,effectiveFrom:'2026-11-20'};
  assert.equal(canAppearInPublicProjection(approved),true);
  for (const patch of [{state:'draft'},{classification:'internal'},{publicationApproved:false},{effectiveFrom:null},{id:null}]) {
    assert.equal(canAppearInPublicProjection({...approved,...patch}),false);
  }
  assert.equal(canAppearInPublicProjection(null),false);
});
test('Variantes locais necessitam revisão quando muda referência geral', () => {
  const reference={id:'general',version:2};
  assert.equal(needsLocalVariantReview({referenceId:'general',referenceVersion:2,reviewState:'confirmed'},reference),false);
  assert.equal(needsLocalVariantReview({referenceId:'general',referenceVersion:1,reviewState:'confirmed'},reference),true);
  assert.equal(needsLocalVariantReview(null,reference),true);
});
test('Grafo rejeita nós duplicados e ligações inválidas', () => {
  assert.deepEqual(validateProcessGraph({nodes:[{id:'a'},{id:'b'}],edges:[{source:'a',target:'b'}]}),[]);
  assert.ok(validateProcessGraph({nodes:[{id:'a'},{id:'a'}],edges:[]}).length>0);
  assert.ok(validateProcessGraph({nodes:[{id:'a'}],edges:[{source:'a',target:'z'}]}).length>0);
  assert.ok(validateProcessGraph({nodes:[],edges:[]}).length>0);
});
