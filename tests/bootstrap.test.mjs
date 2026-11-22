import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_ADMIN, validateBootstrapAssignment } from '../src/domain/bootstrap.mjs';

test('Conta inicial reúne administração técnica e pertença ao CL', () => {
  assert.equal(INITIAL_ADMIN.email, 'ricardoribeiro9@gmail.com');
  assert.deepEqual(validateBootstrapAssignment(INITIAL_ADMIN), []);
  assert.ok(INITIAL_ADMIN.roles.includes('platform_master'));
  assert.ok(INITIAL_ADMIN.roles.includes('cl_member'));
});

test('A configuração não ativa acesso sem identidade verificada', () => {
  assert.equal(INITIAL_ADMIN.status, 'pending_identity_verification');
  assert.ok(validateBootstrapAssignment({...INITIAL_ADMIN, status:'active'}).length);
  assert.ok(validateBootstrapAssignment({...INITIAL_ADMIN, institutionalBody:'community'}).length);
});
