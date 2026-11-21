# Autenticação — decisão de arquitetura

## Tecnologia
- Autenticação por OAuth através de **Firebase Authentication**.
- A POC não gere nem armazena palavras-passe.
- O fornecedor OAuth concreto (Google, Microsoft ou outro) ainda precisa de confirmação.
- O frontend utiliza Firebase Authentication SDK após configuração do projeto Firebase e domínios autorizados.
- Não incluir segredos, credenciais de serviço ou tokens no repositório.

## Provisionamento do administrador inicial
- Identidade de referência: `ricardoribeiro9@gmail.com`.
- Papéis previstos: `platform_master` e `cl_member`.
- Não atribuir permissões por comparação isolada de email no browser.
- Depois do primeiro início de sessão, verificar email confirmado e fornecedor aceite; associar a conta ao `uid` emitido pelo Firebase.
- A atribuição inicial dos papéis ocorre numa operação administrativa protegida e auditada, não num fluxo de autoinscrição.
- Separar `platform_master` (administração técnica) de `cl_member` (participação no órgão institucional).

## Segurança e autorização
- Validar Firebase ID tokens no backend com Firebase Admin SDK.
- Aplicar autorização por `uid`, papéis, âmbito organizacional e ação no backend e nas Firestore Security Rules.
- Rejeitar acesso a dados reais enquanto não existirem testes de regras e autorização.
- Preservar `firestore.rules` com deny-all até implementação e revisão de segurança.
- Registar alterações de papéis e decisões institucionais com auditoria.
- O início de sessão bem-sucedido não implica, por si só, permissão de leitura ou escrita.

## Estado
Decisão arquitetural registada; **não implementado**: projeto Firebase, OAuth provider, UI de login, backend, papéis efetivos, regras de acesso. Nenhum utilizador possui ainda acesso real.
