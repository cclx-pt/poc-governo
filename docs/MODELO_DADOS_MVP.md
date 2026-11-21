# Contrato de dados — MVP Governo CCLX

## Objetivo
Modelo inicial de persistência e autorização para implementação Firestore. **Não representa coleções ativas.** O cliente nunca escreve diretamente em coleções administrativas ou publicações.

## Coleções privadas
| Coleção | Chave | Campos essenciais | Escrita |
|---|---|---|---|
| `usersByUid` | Firebase UID | email, status, roles, communityIds, adminCommunityIds, updatedAt | Backend administrativo |
| `userDirectory` | SHA-256 do email normalizado | uid, email, status, revoked | Backend administrativo |
| `communities` | identificador estável | name, status, updatedAt | Master |
| `governanceRecords` | ID imutável | type, title, summary, communityId, classification, state, version, createdByUid, history | Backend autorizado |
| `institutionalDecisions` | ID imutável | recordId, version, decision, authority, decidedByUid, decidedAt, rationale | Backend autorizado |
| `publicationApprovals` | ID imutável | recordId, version, approved, approvedByUid, approvedAt, fields | Backend autorizado após decisão institucional |
| `auditEvents` | ID gerado | action, actorUid, targetId, at, before/after sem conteúdo sensível | Backend apenas |
| `loginChallenges` | ID aleatório | uid, tokenHash, expiresAt, used, usedAt | Backend apenas |
| `authRateLimits` | hash | count, resetAt | Backend apenas |
| `mail` | ID gerado | to, message | Backend + extensão de email |

## Coleção pública
`publishedRecords`: apenas projeções aprovadas, geradas pelo backend a partir de campos explicitamente autorizados. Nunca copiar documentos internos completos. Exigir versão, autorização de publicação, validade e mecanismo de retirada.

## Invariantes
1. O UID autenticado é a identidade; email isolado nunca autoriza operações.
2. `community_admin` só gere membros da sua comunidade, sem elevar papéis.
3. Aprovação institucional e autorização de publicação são atos distintos.
4. Reduzir classificação exige decisão autorizada; não publicar por consequência.
5. Publicação depende de autorização para a **versão exata** do documento.
6. Uma alteração após publicação retira ou invalida a projeção anterior até nova autorização.
7. Histórico e auditoria não são editáveis pelo cliente.
8. Por defeito, todas as regras Firestore permanecem `deny-all` até testes de integração.
9. Criar índices apenas quando as consultas reais forem definidas e testadas.

## Plano de migração da demonstração
Os dados fictícios em `localStorage` **não são migrados automaticamente**. O MVP real terá um serviço de repositório com operações `list/create/update/submit/decide/publish/withdraw`, chamadas a funções protegidas, e uma fonte Firestore distinta da demonstração. Não colocar dados pessoais no modo local.

## Pendências institucionais
Autoridade final de publicação; autoridade para desclassificação; múltiplas pertenças a comunidades. Até serem aprovadas, bloquear operações reais correspondentes.
