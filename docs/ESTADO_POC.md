# Estado da POC React — 21/11/2026

## Fundação técnica verificada
- **GitHub Actions CI #12: success** — https://github.com/cclx-pt/poc-governo/actions/runs/44886090814
- Node 22, lockfile presente, `npm ci`, `npm run typecheck`, `npm run build` e `npm test`: **todos aprovados na CI #12**.
- `src/main.tsx` reposto, importação ReactFlow corrigida e `firestore.rules` deny-all restauradas.
- Testes de domínio, publicação e âmbito executados com sucesso no workflow.
- A correção encontra-se na **PR #4**, ainda sem merge; a PR #2 já foi integrada na main antes da correção.

## Limites da POC
- Interface demonstrativa com dados ilustrativos; sem dados pessoais reais, autenticação ou persistência.
- Editor de fluxos local, sem guardar, versionar ou executar aprovações.
- Regras Firestore **deny all**.
- Não existe workflow de deploy.
- A CI comprova compilação e testes automatizados existentes, **não** comprova segurança de produção nem aceitação funcional.

## Próximos gates
1. Rever alterações da PR #4, confirmar CI verde no head final e integrar a correção na main mediante aprovação.
2. Rever controlos de qualidade e segurança da PR #1, sem presumir que já estão na main.
3. Especificar modelo de dados e APIs de leitura/escrita com dados sintéticos.
4. Validar decisões institucionais ainda pendentes antes de definir permissões finais.
5. Implementar autenticação, autorização server-side, regras Firestore testadas e auditoria antes de qualquer dado real.
