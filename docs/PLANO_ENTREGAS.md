# Plano técnico — da POC à utilização real

## Gate A — Fundação técnica da POC
- [x] `package-lock.json` versionado.
- [x] `npm ci`, typecheck, build e testes aprovados em Node 22 (CI #13 e #15).
- [x] CI verde na branch da PR #4 em execuções verificadas.
- [ ] Rever a CI do último commit da PR #4 e garantir integração controlada na main.
- [ ] Rever compatibilidade dos controlos de qualidade da PR #1.
- [ ] Revisão de segurança e acessibilidade.
- [ ] Aprovação de integração, **sem deploy automático**.

## Gate B — Aplicação interna utilizável
1. Modelo de dados versionado: unidades, comunidades, pessoas, papéis, nomeações, cultura, processos, variantes, decisões, classificação e auditoria.
2. Firebase Authentication **email link sem palavra-passe**, com backend que só envia links a utilizadores previamente registados e ativos.
3. Master global e administradores de comunidade com âmbito estrito; papéis institucionais separados dos administrativos.
4. Backend e Firestore Rules com autorização por `uid`, papel, comunidade, ação e classificação; testes negativos obrigatórios.
5. Classificação automática por tipo de informação, alteração controlada e trilho de auditoria; desclassificação sujeita a revisão.
6. Cultura Geral e variantes locais sujeitas a decisão do CL; exceções e conflitos decididos pelo CL.
7. Publicação separada da aprovação, com projeção pública mínima, sem dados pessoais ou campos internos.
8. Edição, persistência, versões, recuperação, monitorização, retenção e revogação de acessos.
9. Testes de isolamento entre comunidades, autoinscrição proibida, envio de links a não registados bloqueado, links expirados e acessos revogados.

**Condição:** não usar dados reais até autenticação, autorização, regras Firestore, auditoria e revisão de segurança estarem testadas. Competência final de publicação e aprovação de redução de classificação ainda requerem decisão institucional.

## Gate C — Portal público e piloto controlado
- Portal público acessível sem login, por rotas distintas da área interna.
- Apenas projeções aprovadas e publicadas, sem campos confidenciais ou identificação indireta.
- Testes de anonimização, revisão editorial, retirada de publicações e proteção de dados.
- UAT com papéis institucionais, WCAG 2.2 AA como objetivo, restauro, revogação e incidentes.
- Aprovação formal para disponibilização pública e utilização com dados reais.

## Fora do âmbito
Gestão de tarefas, execução de processos, produtividade, projetos e contabilização financeira do Portal CAF.

## Estado real
POC React demonstrativa, sem autenticação, persistência ou publicação reais. CI #15 aprovada na PR #4; alterações posteriores exigem nova CI. Regras Firestore deny-all. Não existe deploy automático.
