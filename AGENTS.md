# Instruções para agentes — Governo CCLX

## Missão
Rever e desenvolver a plataforma institucional no âmbito da **P7 — Redefinir a Cultura CCLX**. Cultura é como fazemos as coisas; Governo é como definimos, protegemos e acompanhamos essa cultura.

## Regras de âmbito
- Usar **Governo**, não «Governação», nas interfaces e documentação institucional.
- **Cultura Definida:** princípios e diretrizes gerais aprovados, vinculativos no respetivo âmbito.
- **Cultura Livre:** autonomia local compatível com a Cultura Geral, sem a contradizer, substituir ou anular.
- Excluir gestão de tarefas, projetos, escalas, produtividade e execução operacional.
- Os processos são documentação de como atuar, não um motor de atribuição de tarefas.
- Projeto independente do Portal CAF, com dados, credenciais e ambientes separados.
- Português de Portugal; identidade visual monocromática e acessível.

## Antes de implementar
1. Identificar autoridade competente, classificação, âmbito, vigência, publicação e privacidade.
2. Distinguir factos aprovados de propostas ainda pendentes.
3. Criar uma ADR para decisões de arquitetura com impacto relevante.
4. Definir critérios de aceitação e testes positivos e negativos.
5. Nunca incluir segredos ou dados pessoais no repositório público.

## Qualidade e segurança
- Negar acesso por omissão; autenticação não implica autorização.
- Validar isolamento entre comunidades e ações por papel, âmbito e classificação.
- Dados públicos apenas em projeções com campos permitidos e aprovação explícita.
- Manter versões, vigência, histórico, suspensão e revogação.
- Validar grafos, variantes locais e efeitos de mudanças na Cultura Geral.
- CI e testes obrigatórios antes de integrar código.

## Formato da revisão
Cada achado inclui ID, severidade, evidência, impacto, correção proposta, dependências, critérios de aceitação e gate aplicável.
