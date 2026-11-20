# ADR-0001 — Princípios de arquitetura da POC

**Estado:** Proposta, pendente de aprovação.

## Contexto
O Governo CCLX serve a P7 e documenta estrutura, responsabilidades, cultura e processos, com áreas pública e interna. Não gere tarefas.

## Decisão proposta
- Frontend React + TypeScript + Vite.
- Firebase Authentication para autenticação, com autorização separada e validada no backend/regras.
- Firestore em projeto independente do Portal CAF.
- Projeções públicas explícitas, com campos permitidos, nunca cópias indiscriminadas de documentos internos.
- Processos versionados, com distinção geral/local, vigência, revisão e revogação.
- Publicação em produção desativada até gate de segurança e aprovação.

## Alternativas a avaliar
- GitHub Pages apenas para POC estática sem dados reais.
- Hosting com funções servidoras para publicação controlada e operações privilegiadas.

## Consequências
A escolha de hosting e regras definitivas depende da matriz de competências e da classificação dos dados.
