import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { installLocalStorage } from './helpers.js';
import * as history from '../js/lib/history.js';

const m8 = { tipo: 'M Rosca ISO Métrica Grossa 60°', passo: '8x1,25', broca: '6,75' };
const m10 = { tipo: 'M Rosca ISO Métrica Grossa 60°', passo: '10x1,50', broca: '8,50' };

beforeEach(() => installLocalStorage());

test('toggleFavorite liga e desliga', () => {
  assert.equal(history.isFavorite(m8), false);
  assert.equal(history.toggleFavorite(m8), true);
  assert.equal(history.isFavorite(m8), true);
  assert.equal(history.toggleFavorite(m8), false);
  assert.deepEqual(history.favorites(), []);
});

test('favoritos ficam limitados a 20, mais recente primeiro', () => {
  for (let i = 0; i < 25; i++) history.toggleFavorite({ tipo: 'T', passo: String(i) });
  const fav = history.favorites();
  assert.equal(fav.length, 20);
  assert.equal(fav[0].passo, '24');
});

test('roscas recentes sem duplicatas e limitadas a 8', () => {
  history.addRecentThread(m8); history.addRecentThread(m10); history.addRecentThread(m8);
  assert.deepEqual(history.recentThreads().map(r => r.passo), ['8x1,25', '10x1,50']);
  for (let i = 0; i < 10; i++) history.addRecentThread({ tipo: 'T', passo: String(i) });
  assert.equal(history.recentThreads().length, 8);
});

test('removeRecentThread tira só a rosca escolhida', () => {
  history.addRecentThread(m8); history.addRecentThread(m10);
  history.removeRecentThread(m8);
  assert.deepEqual(history.recentThreads().map(r => r.passo), ['10x1,50']);
});

test('clearThreads apaga favoritos e recentes, mas não os cálculos', () => {
  history.toggleFavorite(m8); history.addRecentThread(m10); history.addRecentCalc({ href: 'a.html', label: 'A' });
  history.clearThreads();
  assert.deepEqual(history.favorites(), []);
  assert.deepEqual(history.recentThreads(), []);
  assert.equal(history.recentCalcs().length, 1);
});

test('cálculos recentes limitados a 6, sem repetir o mesmo link', () => {
  history.addRecentCalc({ href: 'a.html', label: 'A' });
  history.addRecentCalc({ href: 'a.html', label: 'A' });
  assert.equal(history.recentCalcs().length, 1);
  for (let i = 0; i < 10; i++) history.addRecentCalc({ href: `${i}.html`, label: String(i) });
  assert.equal(history.recentCalcs().length, 6);
});

test('localStorage corrompido não quebra a leitura', () => {
  localStorage.setItem('uf_thread_favorites_v1', '{quebrado');
  assert.deepEqual(history.favorites(), []);
});
