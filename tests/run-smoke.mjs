// Teste de fumaça no navegador: sobe um servidor estático, abre tests/smoke.html
// no Chrome headless e imprime o que cada página mostrou na tela.
// Uso: node tests/run-smoke.mjs            (imprime o resultado)
//      node tests/run-smoke.mjs > base.txt (para comparar antes/depois de uma mudança)
// Defina CHROME=/caminho/do/chrome se o Chrome não estiver no local padrão do macOS.
import { createServer } from 'node:http';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TIMEOUT_MS = 90_000;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png' };

let finish;
const result = new Promise(r => { finish = r; });

const server = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/__smoke_result') {
    let body = '';
    for await (const chunk of req) body += chunk;
    res.end();
    finish(body);
    return;
  }
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(ROOT, path));
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404); res.end();
  }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/tests/smoke.html`;

const profile = await mkdtemp(join(tmpdir(), 'uf-smoke-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${profile}`, '--enable-logging=stderr', '--v=0', url]);
let stderr = '';
chrome.stderr.on('data', d => { stderr += d; });
chrome.on('error', e => finish(Promise.reject(e)));

const timer = setTimeout(() => finish(null), TIMEOUT_MS);
let output;
try { output = await result; } catch (e) { output = null; console.error('Falha ao abrir o Chrome:', e.message); }
clearTimeout(timer);
chrome.kill();
server.close();
await rm(profile, { recursive: true, force: true }).catch(() => {});

if (output == null) { console.error('O teste de fumaça não terminou.'); process.exit(1); }
console.log(output);
// Erros de JavaScript das páginas aparecem no log do console do Chrome.
const jsErrors = stderr.split('\n').filter(l => /CONSOLE.*(Uncaught|Error)/.test(l)).map(l => l.replace(/^\[[^\]]*\]\s*/, ''));
if (jsErrors.length) { console.log('\nERROS DE JAVASCRIPT:\n' + jsErrors.join('\n')); process.exitCode = 1; }
