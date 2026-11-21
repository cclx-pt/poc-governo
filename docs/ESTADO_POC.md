# Estado da POC React — 21/11/2026

## Verificações confirmadas
- CI #12 aprovada: https://github.com/cclx-pt/poc-governo/actions/runs/44886090814
- CI #13 aprovada: https://github.com/cclx-pt/poc-governo/actions/runs/44886140519
- CI #15 aprovada: https://github.com/cclx-pt/poc-governo/actions/runs/44886191092
- Lockfile, instalação, TypeScript, compilação e testes passaram nas execuções indicadas.
- PR #2 foi integrada na main antes da correção de `src/main.tsx`. A PR #4 reúne correções e evolução posterior, **ainda não integrada**.
- Novas alterações posteriores à CI #15 requerem validação adicional.

## Decisões funcionais registadas
- Firebase Authentication com **email link sem palavra-passe**, sem login Google OAuth.
- Apenas utilizadores previamente registados e ativos recebem links; verificação no backend.
- Master global, administradores locais limitados à comunidade e papéis CL separados.
- `ricardoribeiro9@gmail.com` como referência para Master e membro do CL, sujeito a identidade verificada e provisionamento protegido.
- Portal público sem login e área interna autenticada, com rotas distintas.
- Classificação automática (Público, Interno, Restrito, Confidencial), alterações controladas e auditadas.
- Publicação separada da classificação e aprovação; dados públicos expostos apenas através de projeções seguras.
- CL aprova Cultura Geral e variantes locais e decide exceções/conflitos.

## Limitações
- POC com dados ilustrativos; sem login, envio de emails, persistência, administração real, publicação ou dados pessoais.
- Regras Firestore deny-all e ausência de deploy automático.
- Helpers de domínio **não** substituem segurança de backend ou regras Firestore.

## Próximos passos
1. Validar CI do head final da PR #4 e rever antes de integrar.
2. Implementar ambiente Firebase de teste e backend de convite/login email link.
3. Implementar papéis, isolamento por comunidade, classificação e auditoria.
4. Construir portal público apenas com conteúdo explicitamente publicado.
5. Validar decisões pendentes sobre publicação e desclassificação.
