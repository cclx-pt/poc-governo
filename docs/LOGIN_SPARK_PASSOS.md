# Login Firebase nativo — execução no Spark

Estado confirmado pelo responsável em 21/11/2026:
- Projeto `governo-cclx` criado.
- Cloud Firestore criado.
- Authentication ativado.
- Método Email/Palavra-passe e **Link de email (sem palavra-passe)** ativados.
- Sem conta de faturação: permanecer no Spark.

## Próximos passos técnicos (não concluídos)
1. Executar `npm install firebase` no repositório e incluir **package.json e package-lock.json** no mesmo commit. Não editar manualmente só package.json.
2. Inicializar `initializeApp(firebaseConfig)`, `getAuth`, `getFirestore`; criar um fluxo `sendSignInLinkToEmail` e `signInWithEmailLink`.
3. Como o frontend usa HashRouter, usar uma URL de retorno permitida em Authentication → Settings → Authorized domains, preferencialmente uma rota própria no domínio final, e validar o tratamento de query parameters.
4. Ao receber `onAuthStateChanged`, ler `usersByUid/{uid}`. Se não existir registo ativo, apresentar **Acesso não autorizado** e terminar a sessão. O bloqueio deve ser reforçado nas regras Firestore.
5. O primeiro login cria ou identifica o UID no Authentication. Verificar que corresponde ao email esperado antes de criar **manualmente na consola** o documento de autorização `usersByUid/{uid}`. Nunca atribuir `platform_master` com base apenas num email enviado pelo browser.
6. Testar: acesso anónimo, UID sem registo, UID revogado, utilizador ativo, acesso fora da comunidade, tentativa de alteração de papéis, link expirado/reutilizado, portal público sem documentos internos.
7. Só depois publicar regras testadas e frontend; publicar Hosting requer autorização expressa do responsável.

## Cuidados
- Os links nativos de email podem criar utilizadores no Firebase Auth; **isso não cria autorização institucional**.
- Não permitir writes de perfis, permissões, decisões, auditoria ou publicações por clientes até existir controlo robusto.
- Não usar os endpoints de Cloud Functions preparados para a arquitetura Blaze enquanto se mantém Spark.
- A página `/mvp` atual continua a ser simulação em localStorage; não introduzir dados reais nela.
