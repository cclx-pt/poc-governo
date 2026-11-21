import test from 'node:test';
import assert from 'node:assert/strict';
import { ROLES, normalizeEmail, canRequestLoginLink, canManageCommunity, canAssignRole, canReadRecord, canPublish } from '../src/domain/access-policy.mjs';
const master = { uid: 'm', status: 'active', roles: [ROLES.MASTER] };
const local = { uid: 'l', status: 'active', roles: [ROLES.COMMUNITY_ADMIN], adminCommunityIds: ['almada'], communityIds: ['almada'] };
test('normaliza email e rejeita entradas inválidas', () => {
  assert.equal(normalizeEmail(' User@Example.com '), 'user@example.com');
  assert.equal(normalizeEmail('invalid'), null);
});
test('link só é elegível para email autorizado e ativo', () => {
  const user = { email: 'user@example.com', status: 'active' };
  assert.equal(canRequestLoginLink(user, 'USER@example.com'), true);
  assert.equal(canRequestLoginLink(user, 'other@example.com'), false);
  assert.equal(canRequestLoginLink({ ...user, status: 'disabled' }, user.email), false);
  assert.equal(canRequestLoginLink({ ...user, revoked: true }, user.email), false);
  assert.equal(canRequestLoginLink(null, user.email), false);
});
test('admin local fica limitado à sua comunidade', () => {
  assert.equal(canManageCommunity(local, 'almada'), true);
  assert.equal(canManageCommunity(local, 'moita'), false);
  assert.equal(canManageCommunity(master, 'moita'), true);
  assert.equal(canAssignRole(local, 'almada', ROLES.MEMBER), true);
  assert.equal(canAssignRole(local, 'almada', ROLES.MASTER), false);
  assert.equal(canAssignRole(local, 'almada', ROLES.CL_MEMBER), false);
  assert.equal(canAssignRole(local, 'moita', ROLES.MEMBER), false);
});
test('dados internos e confidenciais não são públicos', () => {
  assert.equal(canReadRecord(null, { classification: 'internal' }), false);
  assert.equal(canReadRecord(null, { classification: 'public', published: true, publicProjection: true }), true);
  assert.equal(canReadRecord(null, { classification: 'public', published: false, publicProjection: true }), false);
  assert.equal(canReadRecord(local, { classification: 'internal', communityId: 'moita' }), false);
  assert.equal(canReadRecord(local, { classification: 'confidential', communityId: 'almada' }), false);
  assert.equal(canReadRecord(local, { classification: 'confidential', allowedUids: ['l'] }), true);
});
test('publicação exige aprovação para versão exata', () => {
  const record = { id: 'doc1', version: 2, classification: 'public' };
  assert.equal(canPublish(record, { approved: true, recordId: 'doc1', version: 2 }), true);
  assert.equal(canPublish(record, { approved: true, recordId: 'doc1', version: 1 }), false);
  assert.equal(canPublish({ ...record, classification: 'restricted' }, { approved: true, recordId: 'doc1', version: 2 }), false);
});
