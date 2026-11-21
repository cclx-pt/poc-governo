# Privacidade, classificação e publicação — decisões funcionais

## Objetivo
Permitir consulta pública de informação institucional sem expor informação interna, dados pessoais ou elementos que identifiquem indiretamente pessoas. A classificação aplica-se a registos, documentos e, quando necessário, campos.

## Classes
| Classe | Acesso previsto | Exemplos |
| --- | --- | --- |
| Público | Visitantes anónimos **apenas após publicação autorizada** | Princípios e estrutura institucional divulgáveis |
| Interno | Utilizadores autenticados com autorização | Diretrizes internas |
| Restrito | Funções, órgãos e comunidades explicitamente autorizados | Propostas e decisões não publicadas |
| Confidencial | Pessoas expressamente autorizadas | Dados pessoais e situações sensíveis |

## Classificação automática e alterações
- Cada tipo de conteúdo tem uma classificação predefinida; tipos desconhecidos começam como **Confidencial**.
- O sistema atribui a classe na criação. O utilizador autorizado pode pedir alteração com justificação.
- Aumentar a restrição pode ser aplicado imediatamente, sujeito a autorização e auditoria.
- Reduzir a restrição requer aprovação separada; nunca altera automaticamente o estado de publicação.
- A competência final para aprovar desclassificação é **proposta pendente**: responsável pela informação, com aprovação adicional do CL quando institucionalmente aplicável.
- Registar classe anterior e nova, motivo, autor, data, decisão e versão; controlar acesso também ao histórico.

## Publicação e portal público
- Dois acessos: portal público sem login e área interna autenticada, com rotas distintas. Os endereços finais não estão definidos.
- **Aprovação institucional, classificação como Público e autorização de publicação são atos distintos.**
- A autoridade final de publicação permanece por decidir.
- Dados públicos são gerados como **projeções/coleções separadas**, contendo exclusivamente campos permitidos. O browser público nunca consulta documentos internos.
- Não publicar nomes, contactos ou detalhes pessoais sem fundamento e aprovação apropriados; analisar também risco de reidentificação por combinação de datas, funções e comunidades.
- Suportar revisão, retirada de publicação, expiração, versionamento e auditoria.

## Responsabilidades
- O CL aprova Cultura Geral e variantes locais e decide exceções e conflitos.
- O Master gere permissões globais; administradores locais só gerem utilizadores da sua comunidade.
- Nenhum papel técnico concede automaticamente competência institucional para aprovar conteúdos.

## Requisitos de implementação e testes
1. Regras Firestore deny-all até backend e regras específicas testados.
2. Autorizar por identidade Firebase verificada, função, âmbito, operação e classificação.
3. Testar acesso anónimo apenas a projeções publicadas e ausência de campos internos.
4. Testar isolamento entre comunidades e recusa de escalada de privilégios.
5. Testar desclassificação sem aprovação, publicação sem autorização, revogação e reidentificação.
6. Auditar decisões e alterações, sem expor conteúdo confidencial nos logs.

## Estado
Decisões de produto documentadas. Os helpers de classificação/publicação são demonstrativos e **não constituem segurança ativa**. Firebase, portal público operacional, aprovação e publicação persistentes ainda não estão implementados.
