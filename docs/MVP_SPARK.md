# Governo CCLX — MVP no plano Firebase Spark

Decisão do responsável (21/11/2026): **avançar sem conta de faturação e sem Cloud Functions**.

## Arquitetura da primeira versão
- Firebase Hosting: interface React.
- Firebase Authentication: início de sessão com link de email nativo (Firebase Auth).
- Cloud Firestore: documentos e utilizadores.
- Firestore Security Rules: acesso por UID autenticado, conta ativa, papéis e comunidade.
- Sem Cloud Functions, Trigger Email extension, conta de serviço no browser ou lógica administrativa privilegiada no frontend.

## Advertência essencial
O método nativo `sendSignInLinkToEmail` **não impede por si só** que um visitante tente criar uma identidade Firebase Auth. Autenticação e autorização são distintas. O utilizador só pode ler dados institucionais se tiver um documento `usersByUid/{uid}` ativo e autorizado, validado pelas regras Firestore. Nenhuma identidade recém-criada recebe papéis automaticamente.

## Provisionamento inicial
1. O administrador cria manualmente a identidade do primeiro utilizador em Firebase Authentication, ou confirma a identidade depois de um login de teste.
2. Atribui o documento `usersByUid/{uid}` **na consola Firebase**, com o UID exato e papéis previamente aprovados. A conta inicial é `ricardoribeiro9@gmail.com`, com `platform_master` e `cl_member`, apenas depois de verificação da identidade.
3. Para novos utilizadores, a administração privilegiada só deve ser implementada após validar um fluxo de provisionamento seguro. Não permitir que um utilizador atribua papéis a si próprio.
4. Enquanto não existir esse fluxo, a consola Firebase serve para criar/ativar contas; a interface pode listar os utilizadores autorizados, mas não alterar papéis.

Exemplo **de estrutura, não executar com valores fictícios**:
```json
{
  "uid": "<UID exato do Firebase Authentication>",
  "email": "ricardoribeiro9@gmail.com",
  "status": "active",
  "revoked": false,
  "roles": ["platform_master", "cl_member"],
  "communityIds": [],
  "adminCommunityIds": []
}
```

## Fluxo nativo de login
1. O browser envia um link com `sendSignInLinkToEmail` para o email introduzido.
2. O utilizador abre o link no mesmo dispositivo ou confirma o email para completar `signInWithEmailLink`.
3. A aplicação lê `auth.currentUser.uid` e consulta `usersByUid/{uid}`.
4. Sem registo ativo e autorizado, mostra **Acesso não autorizado**, não apresenta dados e termina a sessão.
5. As regras Firestore validam novamente a identidade e o âmbito em cada operação; esconder botões não substitui regras.

## Limitações
- A emissão de links de email usa quotas e medidas antiabuso do Firebase.
- Sem backend privilegiado, operações como atribuir Master, revogar sessões ou aprovar publicação institucional requerem uma solução de segurança específica. Não serão simuladas como operações reais.
- Os dados fictícios em `localStorage` não são migrados automaticamente.
- A publicação pública exige projeções previamente aprovadas, não leitura de documentos internos.
- Antes de abrir a aplicação a utilizadores reais, testar regras de segurança nos emuladores e definir backups e política de retenção.

## Critérios de entrada em piloto
- SDK Firebase instalado com lockfile sincronizado.
- Login por email funcional e domínio autorizado configurado.
- UID do Master confirmado e documento de acesso criado na consola.
- Regras Firestore testadas contra acesso anónimo, contas não autorizadas, acesso entre comunidades e tentativas de elevação de privilégios.
- Apenas operações efetivamente protegidas ficam disponíveis; decisões institucionais e publicação permanecem bloqueadas até terem controlos verificáveis.
