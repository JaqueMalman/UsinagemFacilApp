// Estrutura do projeto: páginas, navegação e lista de cache offline do service worker.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { PAGE_TAB, pageName } from '../js/nav.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = f => readFileSync(join(ROOT, f), 'utf8');
const pages = readdirSync(ROOT).filter(f => f.endsWith('.html'));
const filesIn = dir => readdirSync(join(ROOT, dir)).filter(f => f.includes('.')).map(f => `${dir}/${f}`);

test('toda página carrega o CSS, o js/common.js e tem a barra de navegação', () => {
  for (const p of pages) {
    const html = read(p);
    assert.match(html, /href="css\/styles\.css"/, p);
    assert.match(html, /<script type="module" src="js\/common\.js"><\/script>/, p);
    assert.match(html, /<nav class="bottom-nav"[^>]*><\/nav>/, `${p}: barra deve ser só o espaço vazio preenchido pelo nav.js`);
  }
});

test('todo script referenciado pelas páginas existe', () => {
  for (const p of pages) {
    for (const [, src] of read(p).matchAll(/<script[^>]*src="([^"]+)"/g)) assert.ok(existsSync(join(ROOT, src)), `${p}: ${src}`);
  }
});

test('mapa de abas aponta para páginas que existem', () => {
  for (const p of Object.keys(PAGE_TAB)) assert.ok(pages.includes(p), p);
  assert.equal(pageName('/app/'), 'index.html');
  assert.equal(pageName('/app/roscas.html'), 'roscas.html');
});

test('cache offline: lista do sw.js bate com os arquivos do app', () => {
  const cached = [...read('sw.js').matchAll(/^\s+'\.\/([^']*)'/gm)].map(m => m[1]).filter(Boolean);
  for (const f of cached) assert.ok(existsSync(join(ROOT, f)), `no cache mas não existe: ${f}`);
  const app = [...pages, ...['css', 'js', 'js/lib', 'js/pages', 'data', 'icons'].flatMap(filesIn), 'manifest.webmanifest'];
  assert.deepEqual(app.filter(f => !cached.includes(f)), [], 'arquivos do app fora do cache offline');
});
