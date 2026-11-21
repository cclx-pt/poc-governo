# Plano técnico — da POC à utilização real

## Gate A — Fundação técnica da POC
- [ ] package-lock.json versionado
- [ ] npm ci, typecheck, build e testes com Node 22
- [ ] CI verde na PR #2
- [ ] Compatibilização dos controlos da PR #1
- [ ] Revisão de segurança e acessibilidade
- [ ] Merge controlado na main, **sem deploy automático**

**Condição:** não efetuar merge se algum ponto obrigatório falhar.

## Gate B — Aplicação interna utilizável
1. Modelo de dados versionado: unidades, pessoas, nomeações, cultura, processos, variantes, decisões e auditoria.
2. Autenticação com ambiente de teste separado.
3. Autorização no backend e regras Firestore: ação + função + âmbito + classificação.
4. Submissão e decisão do CL para Cultura Geral, propostas locais, exceções e conflitos.
5. Edição e persistência de documentos e processos com histórico de versões.
6. Separação entre aprovação institucional e publicação.
7. Testes de isolamento entre comunidades e negação de privilégios indevidos.
8. Backups, recuperação, logging, retenção e monitorização.

**Condição:** decisões DEC-01B/02B/03/04B/05/06 aprovadas antes de implementar permissões finais e dados reais.

## Gate C — Piloto controlado
- UAT com perfis institucionais reais, sem migração irreversível.
- WCAG 2.2 AA como objetivo; testes com teclado e tecnologias de apoio.
- Ensaios de restauro, revogação e incidentes.
- Aprovação formal para disponibilização e tratamento de dados reais.

## Fora do âmbito
Gestão de tarefas, execução de processos, produtividade, projetos e contabilização financeira do Portal CAF.

## Estado real
Código de POC em PR Draft. O lockfile não está confirmado; build e CI não estão validados. O domínio de publicação inclui uma allowlist ilustrativa, **não** constitui backend seguro ou autorização para dados reais.
