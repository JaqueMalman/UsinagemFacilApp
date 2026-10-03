USINAGEM FÁCIL — PÁGINA 1 / INÍCIO

Abra index.html no navegador.
Arquivos:
- index.html: estrutura HTML5
- styles.css: layout responsivo/mobile-first
- app.js: pesquisa e interações da tela inicial

Nesta etapa os cards ainda não navegam para páginas reais. Eles exibem uma mensagem indicando qual página será construída em seguida.

REVISÃO MVP 1.1
- Navegação inferior padronizada: Início, Roscas, Calcular e Mais/Tabelas agora usam links funcionais.
- Página Furos atualizada: RPM, avanço e consulta de brocas agora levam às funções já existentes.
- Texto provisório da página Roscas removido e substituído por orientação para o detalhe ilustrado.
- Alvos de toque reforçados para uso em celular.
- Famílias UNF, BSW, BSP e NPT permanecem bloqueadas até validação dos dados da tabela original.


VERSÃO 1.2 — BASE TÉCNICA
- technical-data.js é a fonte única das roscas métricas.
- WestTools continua sendo a fonte dos diâmetros de broca.
- threadlib/THREAD_TABLE.scad é usado como validação de família/designação/geometria, não de broca.
- auditoria-tecnica.html documenta rastreabilidade e limitações.
- UNC/UNF/BSP ainda não foram liberadas porque a versão atual não contém os valores WestTools completos para broca; BSW/NPT não são cobertas pela lista declarada do threadlib.


VERSÃO 1.3 — ESTRUTURA DE ROSCAS
- Famílias modeladas: Métrica grossa, Métrica fina, UNC, UNF, BSW, BSP/G e NPT.
- UNC, UNF e BSP/G têm estrutura/designações de desenvolvimento apoiadas no threadlib; brocas permanecem pendentes da validação WestTools.
- BSW e NPT têm esquema e fluxo preparados, mas registros técnicos serão preenchidos/conferidos na homologação manual final.
- Nenhum valor de broca pendente é inventado: a interface mostra explicitamente “Pendente validação WestTools”.
- auditoria-tecnica.html funciona como checklist administrativo de homologação.

MODO OFFLINE / SERVICE WORKER (v1.4)
-----------------------------------
Foi adicionado o arquivo sw.js para pré-cache dos arquivos estáticos do MVP na primeira visita, além de sw-register.js para registrar o Service Worker em todas as páginas.

Depois da primeira carga completa, as páginas, estilos, scripts e base técnica listados no cache podem ser usados sem conexão. O cache usa a versão "usinagem-facil-static-v1.4"; ao alterar arquivos publicados, incremente essa versão para que os aparelhos recebam a atualização.

IMPORTANTE: Service Workers funcionam em HTTPS ou em localhost. Abrir index.html diretamente pelo sistema de arquivos (file://) não ativa o modo offline.


VERSÃO 1.5 — PWA INSTALÁVEL
- manifest.webmanifest adicionado.
- Ícones 192x192, 512x512 e Apple Touch Icon.
- Metadados PWA em todas as páginas.
- Cache atualizado para v1.5 e inclui manifesto/ícones.
- Instalação requer HTTPS ou localhost.


REVISÃO GERAL v1.12
- Navegação principal padronizada em todas as páginas.
- Botões de menu do topo agora levam a Mais/Tabelas.
- Consultas rápidas da página inicial não possuem mais ações provisórias.
- Linhas de tabelas de rosca passam a abrir o detalhe correspondente.
- Valores de broca ainda não validados exibem “Pendente validação WestTools”, sem “null mm”.
- Botões recebem type=button para evitar submissões acidentais.
- Melhorias de foco de teclado e acessibilidade.
- Cache PWA atualizado para v1.12.


v1.14 - Sanitizacao centralizada de entradas numericas em safety-limits.js; calculadoras usam sanitizeInput antes das formulas; protecao contra NaN/Infinity e entradas invalidas; cache PWA v1.14.

v1.16 - Correções do code review: páginas com parâmetros (?calc=, detalhe de rosca) funcionam offline; entradas no padrão brasileiro (1.000 / 1.000,5) não são mais truncadas e caracteres inválidos são recusados; resultado e alerta anteriores são limpos quando a entrada é inválida; conversões aceitam frações mistas (1 1/2) e recusam campo vazio; sem recarga automática na primeira visita; alerta de RPM mostra o limite configurado; cache PWA v1.16.

v1.17 - Estrutura em ES modules e testes
- Código compartilhado em js/lib/: text (busca), numbers (leitura/formatação), formulas, safety (alerta de RPM), history (favoritos/recentes), threads, calculator (motor das calculadoras de fresamento e torneamento) e haptics.
- Scripts das páginas carregados com type="module": sem variáveis globais que possam colidir. technical-data.js, data.js e sw-register.js continuam scripts clássicos.
- ES modules exigem servidor (HTTPS ou localhost), como o modo offline. Abrir os .html direto pelo sistema de arquivos não funciona mais.
- Avanço por faca agora mostra o alerta de RPM (faltava o espaço do alerta na página).
- Testes: "npm test" roda os testes unitários (node --test, sem dependências); "npm run test:smoke" abre todas as páginas no Chrome headless e lista o que cada uma mostra.
- Cache PWA v1.17.
