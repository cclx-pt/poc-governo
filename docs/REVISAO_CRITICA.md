# Revisão crítica pré-publicação

**Estado:** NO-GO para produção; GO condicionado para POC sem dados reais.

## Achados prioritários
| ID | Severidade | Achado | Critério de saída |
|---|---|---|---|
| GOV-01 | Crítica | Competências de autor, revisor, aprovador, publicador e revogador ainda não aprovadas | Matriz institucional validada |
| SEC-01 | Crítica | Autenticação e autorização não implementadas | Regras e testes de acesso por papel, âmbito, classificação e ação |
| SEC-02 | Alta | Risco de publicação de dados privados por projeções públicas mal definidas | Allowlist de campos, publicação por backend de confiança e testes |
| ENG-01 | Alta | Starter sem lockfile e testes | npm ci, build, typecheck e testes em PR |
| ENG-02 | Alta | Starter anterior previa deploy automático na main | Deploy desativado até autorização explícita |
| FLOW-01 | Alta | Editor de fluxos demonstrativo, sem persistência, versões ou aprovação | Contratos e testes de validação do grafo |
| DATA-01 | Alta | Modelo de dados, vigência e retenção por definir | ADR e contratos de dados aprovados |
| OPS-01 | Alta | Backup, restauro e auditoria não implementados | Plano operacional e ensaio de recuperação |
| GOV-02 | Alta | Variantes locais não reavaliadas perante alteração da Cultura Geral | Propagação de revisão e bloqueio de conflitos |
| ACC-01 | Média | Acessibilidade não validada | Objetivo WCAG 2.2 AA e testes básicos |

## Decisões institucionais pendentes
1. Hierarquia de princípios, políticas, diretrizes, procedimentos e práticas locais.
2. Competências e delegações dos órgãos e comunidades.
3. Condições para exceções locais e resolução de incompatibilidades.
4. Classificação e autorização de publicação.
5. Responsáveis pela manutenção e periodicidade de revisão.

## Gates
- **A — Código POC:** sem dados pessoais ou segredos, build reproduzível, testes e CI, README com limitações, sem deploy automático.
- **B — Dados reais:** competências aprovadas, autorização e isolamento testados, ambientes separados, regras de publicação.
- **C — Piloto:** aprovação/publicação/revogação end-to-end, UAT, acessibilidade, segurança e restauro testados.

**Nota:** esta revisão baseia-se no starter local e no plano faseado. Não constitui validação de código compilado nem autorização de produção.
