# Governo CCLX — POC

Plataforma institucional proposta para **P7 — Redefinir a Cultura CCLX**.

> **Estado:** POC técnica e funcional em evolução; **não é aplicação de produção**. O repositório é público: não colocar dados pessoais reais, segredos, tokens ou credenciais.

## Objetivo
Documentar a estrutura institucional, Cultura Geral, autonomia local, diretrizes e processos com versões, decisões do Conselho de Liderança e classificação da informação.

**Fora do âmbito:** gestão de tarefas, projetos, produtividade e contabilização financeira.

## Decisões de arquitetura
- **Firebase Authentication:** login sem palavra-passe por link de email; sem login Google OAuth.
- **Acesso fechado:** envio de links apenas a utilizadores previamente registados e ativos, após validação pelo backend.
- **Administração:** Master global e administradores locais limitados às respetivas comunidades; membro do CL é papel institucional distinto.
- **Privacidade:** classificação automática Público/Interno/Restrito/Confidencial, com alteração controlada e auditada.
- **Publicação:** portal público sem login, separado da área interna; só conteúdos explicitamente aprovados para publicação e transformados numa projeção segura.
- **Governação:** CL aprova Cultura Geral e variantes locais, e decide exceções e conflitos.

## Documentação
- [Autenticação e utilizadores](docs/AUTENTICACAO_FIREBASE.md)
- [Privacidade, classificação e publicação](docs/PRIVACIDADE_PUBLICACAO.md)
- [Plano de entregas](docs/PLANO_ENTREGAS.md)
- [Estado da POC](docs/ESTADO_POC.md)

## Desenvolvimento
React, TypeScript e Vite. `npm ci`, `npm run typecheck`, `npm run build`, `npm test`. CI aprovada em execuções anteriores; confirmar novamente a última alteração antes de merge. Sem deploy automático, sem Firebase operacional e sem dados reais. Regras Firestore deny-all.
