# MVP demonstrável — Governo CCLX

## Objetivo
Permitir ao Conselho de Liderança testar percursos reais de interface **antes** da ligação à base de dados Firebase e à autenticação de produção.

## Como experimentar
1. Executar `npm ci` e `npm run dev` num ambiente Node 22.
2. Abrir o endereço apresentado pelo Vite.
3. Escolher **Experimentar MVP** na navegação (rota `#/mvp`).
4. Criar uma proposta fictícia; submeter ao CL; simular aprovação; alterar a classificação; simular publicação quando a proposta estiver aprovada e classificada como Pública.
5. Abrir **Portal público (demo)** (rota `#/portal-publico`) para verificar o conteúdo publicado.
6. Testar o registo de membros fictícios na secção Utilizadores.
7. Usar **Repor demonstração** para restaurar os dados iniciais.

## Limitações de segurança
- **Não é uma aplicação multiutilizador**. Os dados ficam no `localStorage` do navegador e não são partilhados entre dispositivos.
- **Não existe autenticação nem autorização real no modo de demonstração**. Os botões de decisão e publicação são simulações.
- **Não introduzir dados pessoais ou informação confidencial**.
- A visualização pública demonstra apenas a seleção de conteúdo dentro do mesmo navegador; não constitui um portal público seguro.
- A publicação real só será permitida depois de implementar backend, regras Firestore, aprovação institucional, sanitização e auditoria.

## Próximos passos para MVP real
- Ligar frontend ao Firebase Authentication por link de email controlado pelo backend.
- Provisionamento administrativo de utilizadores, verificação de estado e papéis.
- Persistência Firestore, isolamento entre comunidades e regras de segurança testadas.
- Decisões CL auditadas e fluxo de publicação independente.
- Hospedagem de ambiente de testes após CI verde e aprovação.
