import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSearch, normalizeThread, debounce } from '../js/lib/text.js';
import { threadLabel, threadDetailUrl } from '../js/lib/threads.js';

test('normalizeSearch remove acentos e maiúsculas', () => {
  assert.equal(normalizeSearch('Furação CÔNICA'), 'furacao conica');
  assert.equal(normalizeSearch(undefined), '');
});

test('normalizeThread iguala as formas de escrever uma rosca', () => {
  const forms = ['M8 × 1,25', 'm8x1.25', 'M8 x 1,25', 'M8×1,25'];
  for (const f of forms) assert.equal(normalizeThread(f), 'm8x1.25', f);
  assert.equal(normalizeThread('1/2″'), normalizeThread('1/2"'));
});

test('threadLabel e threadDetailUrl', () => {
  const metric = { tipo: 'M Rosca ISO Métrica Grossa 60°', passo: '8x1,25' };
  const unc = { tipo: 'Rosca UNC / Grossa 60°', passo: 'UNC 1/4-20' };
  assert.equal(threadLabel(metric), 'M8 × 1,25');
  assert.equal(threadLabel(unc), 'UNC 1/4-20');
  const url = new URL(threadDetailUrl(unc), 'http://x/');
  assert.equal(url.pathname, '/detalhe-rosca.html');
  assert.equal(url.searchParams.get('passo'), unc.passo);
  assert.equal(url.searchParams.get('tipo'), unc.tipo);
});

test('debounce executa só a última chamada', async () => {
  const calls = [];
  const fn = debounce(v => calls.push(v), 10);
  fn(1); fn(2); fn(3);
  await new Promise(r => setTimeout(r, 30));
  assert.deepEqual(calls, [3]);
});
