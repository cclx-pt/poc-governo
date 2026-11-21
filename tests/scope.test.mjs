import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
test('Firestore POC denies all access', () => {
  const rules = readFileSync('firestore.rules','utf8');
  assert.match(rules, /allow read, write: if false/);
});
test('No automatic deployment workflow', () => {
  assert.equal(existsSync('.github/workflows/deploy.yml'), false);
});
test('P7 scope and exclusion are documented', () => {
  const source = readFileSync('src/App.tsx','utf8');
  assert.match(source, /Redefinir a Cultura CCLX/);
  assert.match(source, /sem gerir tarefas ou projetos/);
});
