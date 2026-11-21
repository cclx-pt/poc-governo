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
  const plan = readFileSync('docs/PLANO_ENTREGAS.md','utf8');
  assert.match(source, /P7/);
  assert.match(source, /tarefas|projetos/i);
  assert.match(plan, /Fora do âmbito/);
  assert.match(plan, /Gestão de tarefas/);
});
