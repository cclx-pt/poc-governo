# Modelo funcional — versão de trabalho

**Âmbito:** P7 — Redefinir a Cultura CCLX. Esta especificação não estabelece competências institucionais; apresenta contratos funcionais sujeitos a aprovação.

## Entidades nucleares
- **UnidadeOrganizacional:** identificador, tipo (geral, órgão, comunidade, ministério), nome, relação estrutural, vigência.
- **Pessoa:** identificador pseudónimo, campos pessoais minimizados, estado. Dados reais proibidos na POC.
- **Nomeação:** pessoa, função, âmbito, início/fim, fonte de aprovação, estado; uma pessoa pode ter várias nomeações.
- **DocumentoCultural:** tipo, âmbito, classificação, proprietário institucional, estado, versão, início/fim de vigência, documento de referência.
- **Processo:** identificador, finalidade, âmbito, versão, grafo validado, estado, origem geral/local, vínculos a diretrizes.
- **VarianteLocal:** processo de referência, unidade local, alterações permitidas, fundamentação, estado de conformidade, revisão.
- **DecisãoDePublicação:** objeto/versão, ação, autor, revisor, aprovador, data, justificação e histórico imutável.

## Estados propostos (não aprovados)
Rascunho → Em revisão → Aprovado → Publicado → Revogado/Arquivado. Publicar nunca decorre automaticamente de editar ou aprovar.

## Regras de integridade
1. Uma variante local aponta para uma versão explícita do processo geral.
2. Alterar a referência geral sinaliza variantes locais para revisão; não substitui silenciosamente os conteúdos.
3. A revogação retira o conteúdo da projeção pública, preservando histórico interno segundo política de retenção.
4. As consultas são filtradas por ação, âmbito, classificação e vigência.
5. Ninguém ganha acesso por pertencer apenas à mesma comunidade.
6. Processos não representam tarefas atribuídas nem estados de execução operacional.

## Jornadas de utilização
- Visitante consulta apenas informação pública aprovada.
- Membro autorizado consulta estrutura, funções e diretrizes no seu âmbito.
- Responsável institucional propõe uma diretriz; um aprovador autorizado decide; um publicador autorizado publica.
- Responsável local propõe uma variante; o sistema evidencia o processo geral e a necessidade de revisão.
- Auditor autorizado consulta versões, decisões e alterações relevantes.

## Critérios de aceitação para a fase de implementação
- Isolamento entre unidades e classificação comprovados por testes negativos.
- Histórico de versões e revogação demonstráveis.
- Projeções públicas construídas com allowlist de campos.
- Edição de processo não provoca publicação nem atribuição de tarefas.
- Fluxo de aprovação sujeito a matriz institucional aprovada.
