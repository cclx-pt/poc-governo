# Autenticação e gestão de utilizadores — decisão funcional e técnica

## Decisão confirmada
- Firebase Authentication e Firestore são os serviços escolhidos para autenticação e dados.
- **Início de sessão passwordless por link enviado para o email**, gerido exclusivamente pelo backend; após consumir o link, o servidor emite um **Firebase Custom Token** e o cliente autentica-se no Firebase Authentication. **Não** usar login Google OAuth nem palavra-passe. Esta arquitetura evita expor o envio de links através do SDK público do Firebase.
- O utilizador introduz o email; o sistema só envia um link se a conta já estiver registada, ativa e autorizada.
- Não existe autoinscrição pública. Não enviar links de login a emails desconhecidos, desativados ou revogados.
- Mensagem genérica de resposta, independentemente de o email existir, para evitar enumeração de contas.
- Links temporários e de utilização única; aplicar rate limiting, proteção contra abuso e monitorização.

## Implementação obrigatória
- O pedido de link é processado exclusivamente por um backend de confiança (por exemplo, Cloud Functions), **não** por `sendSignInLinkToEmail` chamado livremente pelo browser.
- Verificar no servidor a lista de utilizadores autorizados e ativos **antes de gerar ou enviar** o link.
- O backend gera um token aleatório de utilização única, armazena apenas o respetivo hash e entrega o link através de uma fila `mail` protegida. O envio requer instalar e configurar uma extensão de envio de email no Firebase; **ainda não está instalada**.\n- O backend troca o link válido por um Firebase Custom Token, sem aceitar identidades fornecidas pelo cliente.
- Não ativar o método público Firebase Email Link, que permitiria solicitar emails diretamente ao Firebase sem passar pela allowlist. Provisionar contas exclusivamente pelo backend administrativo e validar o estado da conta antes da emissão de Custom Tokens.\n- A Cloud Function não deve ser exposta em produção antes de configurar domínio, entrega de email, testes de segurança, antiabuso e criação administrativa protegida.
- Validar o token Firebase e associar a autorização ao `uid` verificado; email isolado nunca é autorização.
- Revogar sessões/tokens e bloquear acesso a dados quando uma conta é desativada; rever regras Firestore e autorização de backend.

## Administração e papéis
- `platform_master`: administra utilizadores, permissões e comunidades globalmente.
- `community_admin`: pode propor/registar, ativar e desativar utilizadores **apenas no âmbito da sua comunidade**, sem poder atribuir `platform_master`, `cl_member` ou privilégios globais.
- `cl_member`: papel institucional do Conselho de Liderança, separado da administração técnica.
- `member`: permissões atribuídas por função, comunidade, classificação e operação.
- Cada alteração de acesso e papel é auditada. A pertença a múltiplas comunidades e as regras de delegação avançadas ficam por especificar.

## Administrador inicial
- Email de referência: `ricardoribeiro9@gmail.com`.
- Papéis previstos: `platform_master` e `cl_member`.
- Atribuição inicial protegida, auditada e vinculada ao `uid` depois de verificar a identidade; **não está ativa nesta POC**.

## Separação de acessos
- Portal público sem autenticação para conteúdo efetivamente publicado.
- Área interna com login por email link, sujeita a autorização por função, âmbito e classificação.
- Rotas distintas; a segurança assenta em backend/regras, não na ocultação de páginas.

## Estado
**Decisão aprovada, implementação pendente.** Ainda não há projeto Firebase operacional, envio de links, login funcional, gestão real de utilizadores ou permissões ativas. As regras Firestore permanecem deny-all até testes de segurança.
