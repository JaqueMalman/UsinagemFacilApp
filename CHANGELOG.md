# Histórico de versões

A versão acompanha o nome do cache do PWA em `sw.js` (`usinagem-facil-static-vX`).

## v1.18 — Pastas e navegação compartilhada
- Arquivos organizados em `css/`, `js/` (`lib/`, `pages/`) e `data/`. Os `.html` continuam na raiz, então os links e favoritos dos usuários não mudam.
- Cada página carrega `js/common.js` (navegação, vibração ao toque, modo offline) e o próprio script em `js/pages/<página>.js`.
- Barra de navegação inferior gerada por `js/nav.js` a partir de um único mapa de abas:
  - detalhe da rosca destaca "Roscas";
  - fresamento, torneamento, avanço por faca e conversões destacam "Calcular" (conversões destacava "Mais");
  - a auditoria técnica passou a ter a barra.
- `README.txt` separado em `README.md` e `CHANGELOG.md`.
- Testes de estrutura: páginas, navegação e lista de cache offline.
- Cache PWA v1.18.

## v1.17 — ES modules e testes
- Código compartilhado em `js/lib/`: busca, leitura/formatação de números, fórmulas, alerta de RPM, favoritos/recentes, roscas, motor das calculadoras e vibração.
- Scripts das páginas carregados com `type="module"`: sem variáveis globais que possam colidir.
- ES modules exigem servidor (HTTPS ou localhost), como o modo offline. Abrir os `.html` direto pelo sistema de arquivos não funciona mais.
- Avanço por faca agora mostra o alerta de RPM (faltava o espaço do alerta na página).
- Atalho de rosca da tela inicial lê nome, broca e link dos dados técnicos.
- Testes unitários (`npm test`) e teste de fumaça no Chrome (`npm run test:smoke`).

## v1.16 — Correções do code review
- Páginas com parâmetros (`?calc=`, detalhe de rosca) funcionam offline.
- Entradas no padrão brasileiro (1.000 / 1.000,5) não são mais truncadas; caracteres inválidos são recusados.
- Resultado e alerta anteriores são limpos quando a entrada é inválida.
- Conversões: modo mm voltou a funcionar, aceita frações mistas (1 1/2) e recusa campo vazio.
- Sem recarga automática na primeira visita.
- Alerta de RPM mostra o limite configurado.

## v1.14
- Sanitização centralizada de entradas numéricas; proteção contra NaN/Infinity e entradas inválidas.

## v1.12 — Revisão geral
- Navegação principal padronizada em todas as páginas.
- Botões de menu do topo levam a Mais/Tabelas.
- Consultas rápidas da página inicial sem ações provisórias.
- Linhas das tabelas de rosca abrem o detalhe correspondente.
- Brocas não validadas exibem "Pendente validação WestTools", sem "null mm".
- Botões com `type=button`; melhorias de foco de teclado e acessibilidade.

## v1.5 — PWA instalável
- `manifest.webmanifest`, ícones 192×192, 512×512 e Apple Touch Icon.
- Metadados PWA em todas as páginas. Instalação requer HTTPS ou localhost.

## v1.4 — Modo offline
- `sw.js` faz pré-cache dos arquivos estáticos na primeira visita; `sw-register.js` registra o service worker em todas as páginas.
- Service workers só funcionam em HTTPS ou localhost.

## v1.3 — Estrutura de roscas
- Famílias modeladas: métrica grossa, métrica fina, UNC, UNF, BSW, BSP/G e NPT.
- UNC, UNF e BSP/G têm estrutura e designações apoiadas no threadlib; brocas pendentes da validação WestTools.
- BSW e NPT têm esquema e fluxo preparados; registros serão preenchidos na homologação manual.
- Nenhum valor de broca pendente é inventado: a interface mostra "Pendente validação WestTools".
- `auditoria-tecnica.html` funciona como checklist de homologação.

## v1.2 — Base técnica
- `technical-data.js` é a fonte única das roscas.
- WestTools é a fonte dos diâmetros de broca; o threadlib (`THREAD_TABLE.scad`) valida família, designação e geometria, não broca.
- `auditoria-tecnica.html` documenta rastreabilidade e limitações.

## v1.1 — Revisão MVP
- Navegação inferior padronizada: Início, Roscas, Calcular e Mais.
- Página Furos leva às funções de RPM, avanço e consulta de brocas.
- Alvos de toque reforçados para celular.
