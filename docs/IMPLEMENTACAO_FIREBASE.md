# Implementação Firebase — plano de execução seguro

## Âmbito
Implementar autenticação sem palavra-passe por link de email, administração global/local, autorização por comunidade e classificação, e publicação pública separada. Este documento descreve trabalho **por implementar**, não funcionalidades operacionais.

## Sequência e critérios de aceitação

### 1. Configuração e ambientes
- Configurar projetos Firebase separados para desenvolvimento e produção; segredos apenas no ambiente servidor.
- Validar domínio autorizado, URLs de retorno e capacidade de envio controlado de email.
- Escolher mecanismo compatível com Firebase Authentication para gerar e consumir links, sem expor endpoint público de envio indiscriminado.

### 2. Registo e autenticação
- Criar registo administrativo de utilizadores com estado `invited|active|disabled`, email normalizado, UID associado após verificação e auditoria.
- Cloud Function recebe pedido de acesso, valida previamente conta ativa e limites de frequência e só então gera/envia link; resposta genérica para todos os pedidos.
- Bloquear autoinscrição e impedir autenticação/autorização de utilizadores revogados, incluindo validação do estado no servidor. Testar as limitações reais do Firebase Auth e as opções de blocking functions do plano escolhido.
- Consumir link com proteção contra reutilização e expiração; não confiar no email fornecido pelo cliente como prova de identidade.

### 3. Papéis e âmbito
- `platform_master`: gestão global; `community_admin`: gestão de membros apenas das comunidades explicitamente delegadas; `cl_member`: papel institucional separado; `member`: acesso mínimo.
- Administrador local nunca concede `platform_master` ou `cl_member`, nem altera outras comunidades.
- Bootstrap de `ricardoribeiro9@gmail.com` como Master e CL apenas depois de autenticação verificada, associação ao UID e operação auditada.
- Modelo de pertenças por comunidade com possibilidade de múltiplas pertenças, sem ativar essa opção antes da decisão funcional.

### 4. Classificação e publicação
- `public|internal|restricted|confidential` com predefinição por tipo e fallback `confidential`.
- Subida de restrição auditada; redução exige aprovação separada. Não publicar automaticamente após desclassificação.
- Publicação só por fluxo aprovado; gerar coleção pública com campos permitidos, sem referências pessoais ou identificadores indiretos indevidos.
- O portal público consulta apenas projeções publicadas; área interna aplica permissões por UID, papel, comunidade, operação e classe.
- Autoridade de publicação e aprovação de desclassificação permanecem decisões pendentes; nenhuma publicação real antes de serem definidas.

### 5. Testes e gates
- Testes no Firebase Emulator Suite: desconhecido/inativo não recebe link; resposta não enumera contas; rate limit; revogação; acesso cruzado; escalada de privilégios; classificação; desclassificação; publicação e retirada.
- Manter regras Firestore deny-all até testes de autorização específicos aprovados.
- CI com lint/typecheck/build/test e testes de regras; revisão antes de merge, sem deploy automático ou dados reais.

## Definição de concluído
Login funcional e validado em ambiente de desenvolvimento; controlos de acesso comprovados em testes automatizados; administração local isolada; publicação pública segura e sujeita a aprovação; documentação e auditoria atualizadas. Não considerar concluído com testes de domínio apenas.
