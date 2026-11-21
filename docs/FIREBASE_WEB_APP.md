# Firebase Web App — Governo CCLX

Registo da aplicação Web fornecido pelo administrador em 21/11/2026:
- Project ID: `governo-cclx`
- Project Number / Messaging Sender ID: `259305812783`
- Auth Domain: `governo-cclx.firebaseapp.com`
- Storage Bucket: `governo-cclx.firebasestorage.app`
- App ID: `1:259305812783:web:338ac015ac4b697c59e7da`

A configuração pública está em `src/config/firebase.ts`. **Ainda não existe uma instância Firebase Client inicializada**, e nenhuma ligação real foi ativada.

## Próxima implementação
1. Instalar o SDK com `npm install firebase` e confirmar que **package.json e package-lock.json** ficam sincronizados para que `npm ci` continue a funcionar.
2. Criar `src/services/firebase.ts` com `initializeApp(firebaseConfig)`, `getAuth` e `getFirestore`, sem criar acessos privilegiados.
3. Criar ecrãs de login e confirmação com `signInWithCustomToken` após validação do link no backend.
4. Validar as Cloud Functions, o provisionamento de contas e as regras de acesso antes de permitir dados reais.
5. Confirmar a configuração de Authentication, Firestore, faturação, envio de emails e Hosting na consola.

## Segurança
- A `apiKey` Web do Firebase é um identificador público, não uma credencial administrativa.
- Não guardar contas de serviço, tokens de acesso, palavras-passe ou segredos no GitHub.
- Restringir o uso da chave às APIs necessárias, quando aplicável, e configurar domínios autorizados, App Check e regras de segurança adequadas.
- As regras Firestore permanecem `deny-all`; não executar deploy até os testes de segurança passarem.
