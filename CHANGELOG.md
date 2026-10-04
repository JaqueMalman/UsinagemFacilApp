# Histórico de versões

A versão acompanha o nome do cache do PWA em `sw.js` (`usinagem-facil-static-vX`).

## v1.30 — Fresamento
- Nova seção "🕘 Últimos cálculos" com os 5 últimos cálculos feitos no aparelho. Tocar em um card refaz a conta com os mesmos valores.
- Cada card tem uma lixeira 🗑, e "🗑 Limpar tudo" apaga todos depois de um segundo toque.
- O "Limpar tudo" de roscas e o do fresamento passam a usar o mesmo código (`js/lib/confirm.js`).
- Cache PWA v1.30.

## v1.29 — Roscas
- "Favoritos e recentes": cada card ganha uma lixeira 🗑 para tirar só aquela rosca (favorita sai dos favoritos, recente sai do histórico).
- Novo botão "🗑 Limpar tudo", que pede um segundo toque para confirmar.
- Uma linha explica que ⭐ são favoritas, 🕘 são vistas recentemente e que tudo fica só neste aparelho.
- Cache PWA v1.29.

## v1.28 — Avanço de fresamento
- Mesmo padrão do fresamento: a figura da fresa saiu do topo e fica dentro da ajuda "Não sei onde ver o número de facas", abaixo da explicação.
- Botão da fórmula passa a dizer "Ver como é calculado".
- Cache PWA v1.28.

## v1.27 — Modo offline
- Com internet, o app passa a buscar cada página e arquivo no servidor e só usa a cópia guardada quando está sem internet. Antes ele usava sempre a cópia guardada, e uma cópia desatualizada deixava páginas como Tabelas e Aprender sem formatação ao navegar entre telas, mesmo com o Cmd+Shift+R funcionando.
- Cache PWA v1.27.

## v1.26 — Modo offline
- Corrigido: ao instalar uma versão nova, o app podia guardar uma página antiga junto com o CSS novo. Em conversões, o botão CONVERTER aparecia sem formatação depois de abrir outra tela (ex.: Calculadoras). Agora os arquivos da versão nova são sempre baixados do servidor.
- Tabelas e Aprender: o topo fica igual ao de Conversões, com o ⚙ e "USINAGEM FÁCIL" à esquerda e sem a seta "‹".
- Cache PWA v1.26.

## v1.25 — Tabelas
- O topo mostra "USINAGEM FÁCIL" com o subtítulo "Tabelas técnicas", no lugar de "TABELAS TÉCNICAS / Consulta rápida para a máquina", e volta para a tela inicial ao ser tocado.
- Conversões: removida a seta "‹" ao lado de "USINAGEM FÁCIL"; o botão CONVERTER ganha o mesmo visual do botão CALCULAR do fresamento.
- Cache PWA v1.25.

## v1.24 — Conversões
- "USINAGEM FÁCIL" no topo fica alinhado à esquerda, ao lado da seta de voltar, em vez de centralizado.
- A seta de voltar "‹" no topo fica branca, e não mais azul, em conversões e aprender.
- Cache PWA v1.24.

## v1.23 — Cabeçalho
- Tocar em "USINAGEM FÁCIL" no topo das telas volta para a tela inicial.
- Cache PWA v1.23.

## v1.22 — Conversões
- Botão da fórmula passa a dizer "Ver como é calculado" e muda para "Ocultar fórmula" quando aberto.
- A figura das réguas saiu do topo e fica dentro da explicação da fórmula.
- Cache PWA v1.22.

## v1.21 — Fresamento
- Botão da fórmula passa a dizer "Ver como é calculado".
- Novo "Onde medir o diâmetro da ferramenta?" junto do botão da fórmula.
- A figura da fresa saiu do topo e fica dentro dessa explicação, com o "Ø Dc" indicado.
- Cache PWA v1.21.

## v1.20 — Torneamento
- Botão da fórmula passa a dizer "Ver como é calculado".
- "Onde medir o diâmetro da peça?" movido para junto do botão da fórmula.
- A figura da peça no torno saiu do topo e fica dentro da explicação do diâmetro; o rótulo "PEÇA GIRANDO" foi para o canto para não cobrir o "Ø D".
- Cache PWA v1.20.

## v1.19 — Tela inicial
- Removida a seção "★ Consultas rápidas", que confundia os usuários. As mesmas funções continuam nos cards principais e na pesquisa.
- A tela inicial não carrega mais os dados de roscas.
- Cache PWA v1.19.

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
