import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeLoginEmail, emailLookupKey, isEligibleUser, mayAdministerUser, sanitizedPublicProjection } from '../src/guards.mjs';

test('normalização e chave de lookup sem email em identificadores Firestore', () => {
  assert.equal(normalizeLoginEmail(' User@Example.com '), 'user@example.com');
  assert.equal(normalizeLoginEmail('bad'), null);
  assert.match(emailLookupKey('user@example.com'), /^[0-9a-f]{64}$/);
  assert.notEqual(emailLookupKey('user@example.com'), emailLookupKey('other@example.com'));
});
test('apenas utilizador ativo e registado é elegível para email link', () => {
  const u = {email:'user@example.com',status:'active'};
  assert.equal(isEligibleUser(u,'user@example.com'),true);
  assert.equal(isEligibleUser({...u,status:'invited'},'user@example.com'),false);
  assert.equal(isEligibleUser({...u,status:'disabled'},'user@example.com'),false);
  assert.equal(isEligibleUser({...u,revoked:true},'user@example.com'),false);
  assert.equal(isEligibleUser(u,'other@example.com'),false);
});
test('administração local não concede privilégios institucionais ou globais', () => {
  const local={status:'active',roles:['community_admin'],adminCommunityIds:['almada']};
  assert.equal(mayAdministerUser(local,'almada',['member']),true);
  assert.equal(mayAdministerUser(local,'moita',['member']),false);
  assert.equal(mayAdministerUser(local,'almada',['cl_member']),false);
  assert.equal(mayAdministerUser(local,'almada',['platform_master']),false);
  assert.equal(mayAdministerUser({...local,status:'disabled'},'almada',['member']),false);
});
test('projeção pública usa allowlist e nunca replica campos pessoais', () => {
  const record={classification:'public',state:'published',publicationApproved:true,title:'Cultura',body:'Texto aprovado',email:'secret@example.com',ownerUid:'u1'};
  assert.deepEqual(sanitizedPublicProjection(record,['title','body','email','ownerUid']),{title:'Cultura',body:'Texto aprovado'});
  assert.equal(sanitizedPublicProjection({...record,state:'draft'},['title']),null);
  assert.equal(sanitizedPublicProjection({...record,classification:'restricted'},['title']),null);
});
