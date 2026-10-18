import { test } from 'node:test';
import assert from 'node:assert/strict';
import { whatsappUrl, calcText } from '../js/lib/share.js';
import { fromCalc, nextSummary, summaryText } from '../js/lib/result-summary.js';

test('texto do cálculo: título, valores informados e resultado, um por linha', () => {
  assert.equal(calcText('Fresamento · Descobrir RPM', ['Velocidade de corte: 100 m/min', 'Diâmetro da ferramenta: 10 mm'], '3.183 RPM'),
    'Usinagem Fácil · Fresamento · Descobrir RPM\nVelocidade de corte: 100 m/min\nDiâmetro da ferramenta: 10 mm\nResultado: 3.183 RPM');
});

test('link do WhatsApp leva o texto codificado', () => {
  assert.equal(whatsappUrl('3.183 RPM\nØ 10 mm'), 'https://wa.me/?text=3.183%20RPM%0A%C3%98%2010%20mm');
});

test('fromCalc: RPM do cálculo e avanço do resultado (vf) ou do campo vf (Fz)', () => {
  assert.deepEqual(fromCalc({ mode: 'rpm', inputs: {}, value: 3183.1, rpm: 3183.1 }), { rpm: 3183.1, vf: undefined });
  assert.deepEqual(fromCalc({ mode: 'vf', inputs: { n: '3180', f: '0,1' }, value: 318, rpm: 3180 }), { rpm: 3180, vf: 318 });
  assert.deepEqual(fromCalc({ mode: 'fz', inputs: { vf: '1.000', n: '3000', z: '4' }, value: 0.083, rpm: 3000 }), { rpm: 3000, vf: 1000 });
  assert.equal(fromCalc({ mode: 'vc', inputs: { dc: '10', n: '3180' }, value: 99.9, rpm: 3180 }).vf, undefined);
});

test('resumo junta RPM e avanço calculados com a mesma rotação', () => {
  let s = nextSummary({}, { rpm: 3183.1 });
  assert.equal(summaryText(s), '3.183 RPM · — mm/min');
  s = nextSummary(s, { rpm: 3183, vf: 318 });
  assert.equal(summaryText(s), '3.183 RPM · 318 mm/min');
  assert.equal(s.stale, false);
});

test('trocar o RPM tira o avanço calculado com a rotação antiga', () => {
  let s = nextSummary({}, { rpm: 3180, vf: 318 });
  s = nextSummary(s, { rpm: 5000 });
  assert.equal(summaryText(s), '5.000 RPM · — mm/min');
  assert.equal(s.stale, true);
  s = nextSummary(s, { rpm: 5000, vf: 500 });
  assert.equal(summaryText(s), '5.000 RPM · 500 mm/min');
  assert.equal(s.stale, false);
});

test('mesmo RPM (ex.: cálculo de Vc) mantém o avanço', () => {
  let s = nextSummary({}, { rpm: 3180, vf: 318 });
  s = nextSummary(s, { rpm: 3180 });
  assert.equal(summaryText(s), '3.180 RPM · 318 mm/min');
});
