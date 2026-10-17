import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { installLocalStorage } from './helpers.js';
import * as history from '../js/lib/history.js';

beforeEach(() => installLocalStorage());

test('cálculos recentes limitados a 6, sem repetir o mesmo link', () => {
  history.addRecentCalc({ href: 'a.html', label: 'A' });
  history.addRecentCalc({ href: 'a.html', label: 'A' });
  assert.equal(history.recentCalcs().length, 1);
  for (let i = 0; i < 10; i++) history.addRecentCalc({ href: `${i}.html`, label: String(i) });
  assert.equal(history.recentCalcs().length, 6);
});

test('cálculos do fresamento: 5 últimos, sem repetir, excluir um e limpar', () => {
  const calc = vc => ({ mode: 'rpm', inputs: { vc: String(vc), dc: '10' }, result: 'x' });
  for (let i = 1; i <= 7; i++) history.millingHistory.add(calc(i));
  assert.deepEqual(history.millingHistory.list().map(c => c.inputs.vc), ['7', '6', '5', '4', '3']);
  history.millingHistory.add(calc(5));
  assert.deepEqual(history.millingHistory.list().map(c => c.inputs.vc), ['5', '7', '6', '4', '3']);
  history.millingHistory.remove(history.millingHistory.list()[1].at);
  assert.equal(history.millingHistory.list().some(c => c.inputs.vc === '7'), false);
  history.millingHistory.clear();
  assert.deepEqual(history.millingHistory.list(), []);
});

test('avanço de fresamento tem histórico separado do fresamento', () => {
  history.millingHistory.add({ mode: 'rpm', inputs: { vc: '100', dc: '10' }, result: '3.183' });
  history.feedHistory.add({ mode: 'vf', inputs: { z: '4', rpm: '3000', fz: '0,1' }, result: '1.200' });
  assert.equal(history.millingHistory.list().length, 1);
  assert.deepEqual(history.feedHistory.list().map(c => c.result), ['1.200']);
});

test('removeRecentCalc e clearRecentCalcs', () => {
  history.addRecentCalc({ href: 'a.html', label: 'A' }); history.addRecentCalc({ href: 'b.html', label: 'B' });
  history.removeRecentCalc('a.html');
  assert.deepEqual(history.recentCalcs().map(c => c.href), ['b.html']);
  history.clearRecentCalcs();
  assert.deepEqual(history.recentCalcs(), []);
});

test('localStorage corrompido não quebra a leitura', () => {
  localStorage.setItem('uf_recent_calcs_v1', '{quebrado');
  assert.deepEqual(history.recentCalcs(), []);
});

test('armazenamento com formato errado não quebra e descarta registros inválidos', () => {
  for (const k of ['uf_recent_calcs_v1', 'uf_milling_history_v1']) localStorage.setItem(k, '{}');
  assert.doesNotThrow(() => history.addRecentCalc({ href: 'a.html', label: 'A' }));
  assert.doesNotThrow(() => history.millingHistory.add({ mode: 'rpm', inputs: { vc: '100' }, result: '1', at: 1 }));
  localStorage.setItem('uf_milling_history_v1', JSON.stringify([null, 5, { mode: 'rpm' }, { mode: 'rpm', inputs: { vc: '<b>' , dc: 3 }, result: '1', at: 1 }, { mode: 'rpm', inputs: { vc: '100' }, result: '1', at: 2 }]));
  assert.deepEqual(history.millingHistory.list().map(c => c.at), [2]);
  localStorage.setItem('uf_recent_calcs_v1', JSON.stringify([{ href: 'a.html' }, { href: 'b.html', label: 'B' }]));
  assert.deepEqual(history.recentCalcs().map(c => c.href), ['b.html']);
});
