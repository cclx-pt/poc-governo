# Governo CCLX — Especificação Técnica

**Estado:** requisitos técnicos propostos, sujeitos a validação antes da implementação.

## 1. Plataforma
- Aplicação Web responsiva, com interface em português de Portugal.
- Frontend: **React, TypeScript e Vite**.
- Backend gerido: **Firebase**, projeto de referência `governo-cclx`.
- Autenticação: **Firebase Authentication**, link de email sem palavra-passe.
- Persistência: **Cloud Firestore**.
- Publicação: **Firebase Hosting**.
- Plano inicial **Spark**, sem conta de faturação. Funcionalidades que exijam Cloud Functions ou outros serviços pagos dependem de aprovação e revisão da arquitetura.

## 2. Autenticação e autorização
- O Firebase Auth verifica a identidade, mas **não determina a autorização institucional**.
- Cada utilizador tem um registo de autorização associado ao **UID**, com estado, papéis e comunidades.
- Contas não autorizadas, inativas ou revogadas não podem consultar dados internos.
- As regras Firestore validam permissões no servidor em cada operação.
- Proibir autoatribuição de papéis e alterações privilegiadas a partir do browser.
- A autenticação nativa por email pode criar identidades Auth; isso não constitui inscrição ou autorização na CCLX.
- Provisionamento inicial e alterações privilegiadas requerem fluxo administrativo seguro. Na primeira fase Spark, podem ser efetuados manualmente na consola, com verificação de identidade.

## 3. Modelo de dados conceptual
Entidades principais:
- `communities`: comunidades e âmbito Geral.
- `institutionalBodies`: órgãos e competências.
- `usersByUid`: utilizadores, estado, papéis e âmbitos.
- `appointments`: funções, nomeações, vigência e histórico.
- `governanceRecords`: cultura, diretrizes, processos e propostas.
- `institutionalDecisions`: decisões, fundamentos e responsáveis.
- `publicationApprovals`: autorizações explícitas de publicação.
- `publishedRecords`: projeções públicas com campos aprovados.
- `auditEvents`: registos de operações relevantes.

Os nomes são propostas de contrato de dados, não garantias de coleções já criadas. Definir esquemas, índices, migrações e regras de validação antes da implementação.

## 4. Requisitos de segurança
- Regras **deny-by-default** e permissões mínimas.
- Autorização por UID, papel, comunidade, operação e classificação.
- Separação rigorosa entre dados internos e projeções públicas.
- Validação de entradas e de transições de estado no lado confiável.
- Histórico de auditoria resistente a alterações indevidas.
- Testes de negação para acesso anónimo, utilizador não autorizado, elevação de privilégios, acesso entre comunidades, publicação indevida e revogação.
- Nunca guardar segredos administrativos no frontend ou no repositório público.

## 5. Requisitos não funcionais
- Acessibilidade: objetivo **WCAG 2.2 AA**.
- Compatibilidade com navegadores atuais e dispositivos móveis.
- Desempenho e paginação para listas e históricos.
- Estratégia de recuperação, retenção, exportação e cópias de segurança.
- Observabilidade, registo de erros e controlo de custos.
- Versionamento de contratos, testes automatizados e revisão de código.

## 6. Qualidade e entrega
- Repositório GitHub com documentação e alterações revistas por Pull Request.
- CI com instalação reprodutível, análise TypeScript, build e testes.
- Ambientes separados de desenvolvimento e produção quando existir utilização real.
- Publicação sujeita a aprovação expressa.
- Sem dados pessoais reais antes de testes de segurança, permissões e proteção de dados.

## 7. Limites do Spark
A primeira versão pode usar Authentication, Firestore e Hosting dentro das quotas disponíveis. Não se deve assumir a disponibilidade de funções privilegiadas no servidor sem plano ou infraestrutura adequada. Aprovações, administração e publicação com requisitos de confiança devem ficar bloqueadas até existir uma implementação segura.
