# Usinagem Fácil

PWA de consultas, tabelas e cálculos rápidos para operadores de usinagem, torno e CNC: roscas e brocas de pré-furo, RPM, velocidade de corte, avanços e conversão polegada ↔ milímetro. Funciona offline depois da primeira visita.

## Como rodar

O app é HTML, CSS e JavaScript puros, sem build. Ele precisa ser servido por HTTP (localhost ou HTTPS): os scripts são ES modules e o modo offline usa service worker, e nenhum dos dois funciona abrindo os arquivos direto pelo Finder (`file://`).

```sh
python3 -m http.server 8000
# abra http://localhost:8000
```

## Testes

Requer Node 20+. Não há dependências para instalar.

```sh
npm test             # testes unitários (node --test)
npm run test:smoke   # abre todas as páginas no Chrome headless e lista o que cada uma mostra
```

O teste de fumaça usa o Chrome do macOS por padrão; em outro sistema, defina `CHROME=/caminho/do/chrome`. Para conferir que uma mudança não alterou nada na tela, salve a saída antes e depois (`npm run test:smoke > antes.txt`) e compare.

## Estrutura

```
*.html               páginas (na raiz, para manter os links dos usuários)
sw.js                service worker (precisa ficar na raiz por causa do escopo)
manifest.webmanifest
css/styles.css
js/common.js         carregado por todas as páginas: navegação, vibração, modo offline
js/nav.js            barra de navegação inferior e mapa de abas por página
js/sw-register.js    registro do service worker e aviso de nova versão
js/lib/              funções compartilhadas (testadas em tests/)
js/pages/            um script por página, com o mesmo nome do .html
data/                dados técnicos de roscas e tabela de conversão
icons/
tests/
```

Cada página carrega, nesta ordem: os dados de que precisa (`data/*.js`, scripts clássicos), `js/pages/<página>.js` e `js/common.js`.

## Dados técnicos

- `data/technical-data.js` é a fonte única das roscas. `data/data.js` adapta esses dados para o formato usado pelas telas (`window.DB`).
- Os diâmetros de broca vêm da tabela WestTools. Broca ainda não validada fica com `brocaMm: null` e a interface mostra "Pendente validação WestTools". Nunca preencha um valor estimado.
- `tests/data.test.js` confere a consistência dos dados (duplicatas, designação × diâmetro × passo, broca perto de diâmetro − passo). Rode `npm test` depois de cadastrar ou validar roscas.
- `auditoria-tecnica.html` lista o que ainda falta validar.

## Publicando uma nova versão

1. Suba a versão do cache em `sw.js` (`CACHE_NAME`). O app serve sempre a cópia completa da versão instalada; sem subir a versão, os aparelhos continuam com os arquivos antigos. Com a versão nova, aparece o aviso "Nova versão disponível" e, ao tocar em "Atualizar agora", tudo é trocado de uma vez. Para testar localmente, use Cmd+Shift+R ou suba a versão.
2. Se criou, renomeou ou removeu arquivos, atualize `STATIC_FILES` em `sw.js`. O `npm test` avisa se a lista não bater com os arquivos do app.
3. Registre as mudanças no `CHANGELOG.md`.
