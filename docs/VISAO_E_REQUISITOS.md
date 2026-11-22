# Governo CCLX — Visão e requisitos do produto

**Estado:** especificação funcional para desenvolvimento futuro. Não constitui aplicação operacional nem aprovação de decisões institucionais pendentes.

## 1. Visão
O **Governo CCLX** é uma plataforma institucional da Comunidade Cristã CCLX, enquadrada na prioridade **P7 — Redefinir a Cultura CCLX**. A sua finalidade é tornar explícita, acessível e rastreável a forma como a igreja se organiza, decide, estabelece diretrizes e preserva uma cultura comum, reconhecendo a autonomia das comunidades locais.

O termo oficial a usar em menus, módulos e documentação é **Governo** (não «Governação»). Interface e conteúdos em português de Portugal.

### Resultados pretendidos
- Conhecer a estrutura institucional, órgãos, comunidades e responsabilidades.
- Consultar a Cultura Geral e as suas expressões locais, com contexto e versões.
- Propor, apreciar, aprovar e documentar diretrizes e processos institucionais.
- Manter um registo rastreável de decisões e respetivos fundamentos.
- Disponibilizar conteúdos institucionais selecionados num portal público, sem expor informação interna.

### Fora do âmbito
Gestão de tarefas, projetos, produtividade, execução operacional de processos e contabilidade/gestão financeira do Portal CAF. O Governo CCLX **documenta regras e decisões**; não substitui aplicações operacionais.

## 2. Organização e âmbito
**Comunidades:** Sede, Almada, Moita, Barreiro, Coruche, Caldas da Rainha, Porto e Açores. **Geral** é o âmbito transversal, não uma comunidade local.

**Órgãos de referência:**
- **Conselho de Liderança (CL):** aprova a Cultura Geral e variantes locais; decide exceções e conflitos.
- **Conselho Pastoral (CP):** representação institucional; competências concretas a validar.
- **Conselho Administrativo e Financeiro (CAF):** representação institucional; competências concretas a validar.

A plataforma deve permitir registar órgãos, unidades, comunidades, pessoas, vínculos, funções, nomeações e períodos de vigência, sem pressupor competências que não estejam formalmente aprovadas.

## 3. Módulos pretendidos
### 3.1. Visão institucional
Missão, identidade, princípios, visão P7, cultura comum e referências institucionais.

### 3.2. Estrutura e pessoas
Organograma institucional; comunidades; órgãos; membros e responsáveis; nomeações, mandatos e histórico de funções. A visibilidade de dados pessoais depende das permissões.

### 3.3. Cultura Geral e Cultura Local
Biblioteca de princípios e práticas; distinção entre **Cultura Definida** (referência comum) e **Cultura Livre** (adaptação local dentro dos limites comuns); propostas de variantes, decisões do CL, exceções, conflitos e versionamento.

### 3.4. Diretrizes e processos
Repositório de documentos que explicam **como fazemos as coisas**, com autor, âmbito, versão, estado, classificação, datas e relações com decisões. O processo é documentado, não executado como motor de tarefas.

### 3.5. Propostas e decisões institucionais
Registar propostas gerais e locais; submeter à apreciação competente; recolher decisão, fundamento, data, versão e eventual rejeição ou pedido de revisão. A decisão do CL é distinta da autorização de publicação.

### 3.6. Utilizadores e acessos
Registo administrativo de contas, associação a comunidades, papéis e funções institucionais, ativação/revogação, histórico de alterações e administração delegada limitada à respetiva comunidade.

### 3.7. Portal público
Consulta anónima de conteúdos expressamente autorizados para publicação, através de versões públicas separadas e revistas. Nenhum documento interno deve ser exposto diretamente.

### 3.8. Auditoria e histórico
Rastreabilidade de alterações, classificações, decisões, autorizações, publicação/retirada e versões, respeitando a confidencialidade.

## 4. Papéis e autorização
Papéis técnicos previstos:
- `platform_master`: administração global da plataforma.
- `community_admin`: administração de utilizadores **apenas** nas comunidades atribuídas.
- `cl_member`: papel institucional associado ao Conselho de Liderança.
- `member`: utilizador autorizado com acesso definido pelo seu âmbito.

A autorização deve considerar **identidade, estado da conta, papel, comunidade, operação e classificação**. Ter permissões técnicas de administração não concede automaticamente competência institucional para aprovar propostas.

O primeiro Master proposto é `ricardoribeiro9@gmail.com`, após confirmação de identidade e provisionamento seguro; esta referência **não** autoriza criação automática de privilégios.

## 5. Privacidade e classificação
Classes: **Público, Interno, Restrito e Confidencial**.

- Classificação inicial por tipo de registo; tipos desconhecidos começam como Confidencial.
- Alterações de classificação exigem justificação, controlo de acesso e auditoria.
- Reduzir o nível de restrição exige aprovação apropriada.
- **Aprovação institucional, classificação como Público e autorização de publicação são três atos distintos.**
- A publicação deve gerar apenas uma projeção segura com os campos expressamente permitidos.
- Dados pessoais e conteúdos sensíveis não entram no repositório público de código.

## 6. Fluxo conceptual
1. Utilizador autorizado cria uma proposta geral ou local.
2. A proposta é submetida ao órgão competente; Cultura Geral e variantes locais seguem para o CL.
3. A decisão institucional fica registada com fundamento e versão.
4. A classificação é revista de acordo com as regras.
5. Quando aplicável, a autoridade de publicação autoriza separadamente a divulgação.
6. O sistema publica uma versão pública revista; suporta revisão, retirada e histórico.

As competências de publicação e desclassificação ainda requerem decisão institucional.

## 7. Requisitos técnicos de referência
- Aplicação Web responsiva em **React + TypeScript**, com experiência distinta para área interna e portal público.
- **Firebase Authentication** para autenticação por link de email sem palavra-passe.
- **Cloud Firestore** para persistência; regras de segurança rigorosas e testes negativos.
- **Firebase Hosting** como opção de publicação.
- Projeto Firebase: `governo-cclx`; plano inicial **Spark**, sem conta de faturação.
- No Spark, o login por link nativo pode criar identidades Firebase Auth; **uma identidade autenticada não obtém acesso institucional** sem registo de autorização ativo e validação nas regras.
- Operações administrativas privilegiadas e publicação devem ser bloqueadas até existir uma implementação segura e testada. Cloud Functions e integrações dependentes de faturação ficam para evolução futura.
- Registos versionados, auditoria, revogação, retenção e mecanismos de recuperação.
- Objetivo de acessibilidade: **WCAG 2.2 AA**.

## 8. Critérios mínimos de aceitação do MVP real
- Login por email funcional; contas não autorizadas não consultam dados internos.
- Primeiro administrador provisionado por processo seguro, sem autoatribuição de privilégios.
- Consulta de estrutura, comunidades e conteúdos de cultura por âmbito.
- Propostas e decisões persistentes com permissões, versões e auditoria.
- Isolamento entre comunidades e proteção de informação Restrita/Confidencial.
- Portal público apresenta apenas projeções explicitamente aprovadas.
- Testes de segurança e aceitação concluídos antes de usar dados reais.

## 9. Decisões pendentes
1. Competências detalhadas do CP, CAF e restantes órgãos.
2. Autoridade final de publicação.
3. Autoridade para autorizar redução de classificação.
4. Regras finais de mandatos, nomeações e substituições.
5. Política de retenção, restauro e tratamento de dados pessoais.
6. Evolução da infraestrutura para operações privilegiadas e automações.

## 10. Estado e utilização deste repositório
Este documento define **o produto pretendido**, não afirma que os módulos estejam implementados. A POC React e o código Firebase existentes são experiências técnicas, **não um MVP de produção**. O desenvolvimento e a publicação devem depender de decisão posterior.

Documentação de apoio: [Autenticação](AUTENTICACAO_FIREBASE.md), [Privacidade e publicação](PRIVACIDADE_PUBLICACAO.md), [Plano técnico](PLANO_ENTREGAS.md).
