# Estado da POC React

- Interface demonstrativa com dados ilustrativos; sem dados pessoais, autenticação, persistência ou publicação.
- Editor de fluxos apenas local; sem guardar, versionar ou validar aprovações.
- Regras Firestore **deny all** até implementação e testes de autorização.
- Sem workflow de deploy.
- **Lockfile e validação do build pendentes** até instalação das dependências num ambiente com acesso ao registry. O projeto não está aprovado para merge enquanto CI não passar.
- Antes de merge: gerar `package-lock.json` com npm, executar `npm ci`, `npm run typecheck`, `npm run build`, `npm test`.
- Integrar/verificar os controlos da PR #1 antes de aprovar esta PR.
- Não existe aprovação para dados reais nem produção.
