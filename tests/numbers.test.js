import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseNumberBR, parseMillimeters, parseInch, nearestFraction, formatNumber } from '../js/lib/numbers.js';

test('parseNumberBR: vírgula decimal e ponto de milhar', () => {
  assert.equal(parseNumberBR('0,10'), 0.1);
  assert.equal(parseNumberBR('12,7'), 12.7);
  assert.equal(parseNumberBR('3.180'), 3180);
  assert.equal(parseNumberBR('1.000'), 1000);
  assert.equal(parseNumberBR('1.000,5'), 1000.5);
  // Decisão de produto: nas calculadoras, ponto seguido de 3 dígitos é milhar.
  assert.equal(parseNumberBR('12.700'), 12700);
  assert.equal(parseNumberBR(' 3180 '), 3180);
});

test('parseNumberBR: ponto decimal quando não pode ser milhar', () => {
  assert.equal(parseNumberBR('12.7'), 12.7);
  assert.equal(parseNumberBR('0.10'), 0.1);
  assert.equal(parseNumberBR('0.500'), 0.5);
  assert.equal(parseNumberBR('.5'), 0.5);
});

test('parseNumberBR: recusa entradas inválidas em vez de truncar', () => {
  for (const v of ['10abc', '1,2,3', '1.2.3', 'abc', '']) assert.equal(parseNumberBR(v, NaN), NaN, v);
  assert.equal(parseNumberBR('', 0), 0);
  assert.equal(parseNumberBR(null, -1), -1);
  assert.equal(parseNumberBR(Infinity, 0), 0);
  assert.equal(parseNumberBR(42), 42);
});

test('parseMillimeters: ponto é sempre decimal', () => {
  assert.equal(parseMillimeters('12,7'), 12.7);
  assert.equal(parseMillimeters('12.700'), 12.7);
  assert.equal(parseMillimeters('25,4 mm'), 25.4);
  assert.equal(parseMillimeters('10'), 10);
  for (const v of ['', 'abc', '1,2,3', '1.000,5']) assert.ok(Number.isNaN(parseMillimeters(v)), v);
});

test('parseInch: decimal, fração e fração mista', () => {
  assert.equal(parseInch('1/2'), 0.5);
  assert.equal(parseInch('3/8″'), 0.375);
  assert.equal(parseInch('1/2”'), 0.5);
  assert.equal(parseInch('1/2"'), 0.5);
  assert.equal(parseInch('1 1/2'), 1.5);
  assert.equal(parseInch('1-1/2'), 1.5);
  assert.equal(parseInch('0,5'), 0.5);
  assert.equal(parseInch('2'), 2);
  for (const v of ['', '1/0', 'abc', '1/2/3']) assert.ok(Number.isNaN(parseInch(v)), v);
});

test('nearestFraction: frações comuns até 1/64″', () => {
  const t = x => nearestFraction(x)?.text ?? null;
  assert.equal(t(0.5), '1/2″');
  assert.equal(t(12.7 / 25.4), '1/2″');
  assert.equal(t(6.35 / 25.4), '1/4″');
  assert.equal(t(1), '1″');
  assert.equal(t(1.5), '1 1/2″');
  assert.equal(t(1 / 64), '1/64″');
  assert.equal(t(10 / 25.4), null);
  assert.equal(nearestFraction(12.7 / 25.4).exact, true);
});

test('nearestFraction: aproximação aparece como aproximada e nunca vira 0″', () => {
  const f = nearestFraction(12.71 / 25.4);
  assert.equal(f.text, '1/2″');
  assert.equal(f.exact, false);
  assert.ok(Math.abs(f.diffMm + 0.01) < 1e-9, 'a fração é 0,01 mm menor que a medida');
  assert.equal(nearestFraction(0.01 / 25.4), null);
  assert.equal(nearestFraction(0), null);
});

test('formatNumber: padrão pt-BR', () => {
  assert.equal(formatNumber(3183.0988, 0, 0), '3.183');
  assert.equal(formatNumber(99.9, 1, 1), '99,9');
  assert.equal(formatNumber(150, 1, 1), '150,0');
  assert.equal(formatNumber(0.0833333, 3, 3), '0,083');
  assert.equal(formatNumber(12.7, 3), '12,7');
});
