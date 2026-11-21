# Configuração do projeto Firebase — Governo CCLX

Projeto confirmado pelo responsável:
- Firebase Project ID: `governo-cclx`
- Google Cloud Project Number: `259305812783`

O ficheiro `.firebaserc` aponta para `governo-cclx`. **Isto não cria recursos, não concede acesso ao projeto e não efetua deploy.**

## Passos manuais na consola
1. Confirmar que o projeto Firebase `governo-cclx` está selecionado.
2. Registar uma aplicação Web em **Definições do projeto → Geral → As tuas aplicações → Web**. Copiar a configuração pública da aplicação (apiKey, authDomain, projectId, appId); não enviar contas de serviço ou chaves privadas.
3. Em **Authentication → Sign-in method**, ativar o serviço de autenticação. O login planeado utiliza links controlados pelo backend e Firebase Custom Tokens; não ativar fornecedores adicionais desnecessários.
4. Em **Firestore Database**, criar a base de dados numa localização europeia compatível com os requisitos do projeto. **A localização não pode ser alterada livremente depois da criação.** Manter as regras `deny-all` do repositório até ao fim dos testes.
5. Configurar **Hosting** para a aplicação web quando a revisão de segurança e os testes terminarem.
6. Para **Cloud Functions**, confirmar requisitos de faturação/plano e aprovar eventuais custos antes de ativar.
7. Para os links por email, configurar o serviço de envio no servidor e verificar o domínio remetente. A fila `mail` do código ainda não envia mensagens por si só.

## Bloqueios antes de utilizar dados reais
- Provisionamento protegido de utilizadores, contas Firebase Auth e sincronização dos diretórios de acesso.
- Login no frontend, verificação de sessões e revogação.
- Autorizações do lado do servidor para todas as operações institucionais.
- Regras Firestore e testes de integração com emuladores.
- Aprovação e publicação separadas, auditoria e retenção.
- Revisão dos custos, domínio e configuração de email.

## Segurança
Não colocar ficheiros de conta de serviço, chaves privadas ou tokens no repositório GitHub. O ID e o número do projeto não são segredos. O ambiente atual continua sem dados reais e sem deploy.
