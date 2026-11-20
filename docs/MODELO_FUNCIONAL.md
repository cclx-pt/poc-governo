# Modelo funcional — versão de trabalho

**Âmbito:** P7 — Redefinir a Cultura CCLX. As competências confirmadas estão identificadas abaixo; os restantes contratos funcionais continuam sujeitos a validação.

## Autoridade institucional confirmada
- O **Conselho de Liderança (CL)** aprova a Cultura Geral.
- As comunidades **propõem** práticas, adaptações e variantes locais; a aprovação cabe ao **CL**.
- O **CL** decide exceções e resolve conflitos entre orientações gerais e propostas locais.
- A aprovação **não equivale** a publicação; os poderes de publicação, suspensão e revogação permanecem por definir.

## Entidades nucleares
- **UnidadeOrganizacional:** identificador, tipo (geral, órgão, comunidade, ministério), nome, relação estrutural, vigência.
- **Pessoa:** identificador pseudónimo, campos pessoais minimizados, estado. Dados reais proibidos na POC.
- **Nomeação:** pessoa, função, âmbito, início/fim, fonte de aprovação, estado; uma pessoa pode ter várias nomeações.
- **DocumentoCultural:** tipo, âmbito, classificação, proprietário institucional, estado, versão, início/fim de vigência, documento de referência.
- **Processo:** identificador, finalidade, âmbito, versão, grafo validado, estado, origem geral/local, vínculos a diretrizes.
- **VarianteLocal:** processo de referência, unidade local, alterações propostas, fundamentação, estado de conformidade e aprovação pelo CL.
- **DecisãoInstitucional:** objeto/versão, ação, órgão decisor (CL nos casos confirmados), data, fundamentação e histórico.
- **DecisãoDePublicação:** separada da decisão de aprovação; responsáveis e competências ainda pendentes.

## Estados propostos (não aprovados como procedimento)
Rascunho → Submetido ao CL → Em apreciação → Aprovado pelo CL / Não aprovado → Publicado (mediante autorização de publicação) → Revogado/Arquivado.

## Regras de integridade
1. Uma variante local aponta para uma versão explícita do processo geral.
2. Alterar a referência geral sinaliza variantes locais para revisão; não substitui silenciosamente os conteúdos.
3. Proposta local não é aprovada até existir decisão positiva do CL.
4. Exceções e conflitos são submetidos a decisão do CL.
5. Aprovação não publica automaticamente; apenas conteúdos autorizados aparecem na projeção pública.
6. As consultas são filtradas por ação, âmbito, classificação e vigência.
7. Ninguém ganha acesso por pertencer apenas à mesma comunidade.
8. Processos não representam tarefas atribuídas nem estados de execução operacional.

## Jornadas de utilização
- Visitante consulta apenas informação pública aprovada e autorizada para publicação.
- Membro autorizado consulta estrutura, funções e diretrizes no seu âmbito.
- Proponente institucional apresenta Cultura Geral para decisão do CL.
- Comunidade apresenta uma variante local; o sistema evidencia a referência geral e encaminha a proposta para decisão do CL.
- Proponente apresenta exceção ou conflito; a decisão pertence ao CL.
- Auditor autorizado consulta versões, decisões e alterações relevantes.

## Critérios de aceitação
- O sistema não permite marcar Cultura Geral como aprovada sem decisão do CL.
- O sistema não permite marcar variante local como aprovada sem decisão do CL.
- O sistema não permite decidir exceções ou conflitos por outro órgão sem nova decisão institucional.
- A aprovação não provoca publicação automática nem atribuição de tarefas.
- Isolamento entre unidades e classificação comprovados por testes negativos.
- Histórico de versões e revogação demonstráveis.
- Projeções públicas construídas com allowlist de campos.
