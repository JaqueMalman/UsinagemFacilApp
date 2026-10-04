import { test } from 'node:test';
import assert from 'node:assert/strict';
import { solve } from '../js/lib/calculator.js';
import { rpm, feedPerTooth } from '../js/lib/formulas.js';

const rpmDef = { fields: [['vc'], ['dc']], unit: 'RPM', calc: v => rpm(v.vc, v.dc) };
const fzDef = { fields: [['vf'], ['n'], ['z']], unit: 'mm/faca', calc: v => feedPerTooth(v.vf, v.n, v.z), integerFields: ['z'] };

test('solve calcula com entradas no padrão brasileiro', () => {
  const r = solve(rpmDef, { vc: '100', dc: '10' });
  assert.ok(Math.abs(r.value - 3183.0989) < 1e-3);
  assert.equal(r.rpm, r.value, 'no modo RPM a rotação é o próprio resultado');
  const f = solve(fzDef, { vf: '1.000', n: '3.000', z: '4' });
  assert.ok(Math.abs(f.value - 0.08333) < 1e-4);
  assert.equal(f.rpm, 3000, 'nos outros modos a rotação vem do campo n');
});

test('solve recusa campos vazios, zero, negativos e texto', () => {
  for (const vc of ['', '0', '-5', 'abc', '10abc']) {
    assert.match(solve(rpmDef, { vc, dc: '10' }).error, /maiores que zero/, vc);
  }
});

test('solve recusa resultado não numérico', () => {
  const def = { fields: [['a']], unit: 'x', calc: () => Infinity };
  assert.match(solve(def, { a: '1' }).error, /Não foi possível calcular/);
});

test('solve exige número inteiro de facas', () => {
  for (const z of ['0,5', '2,5', '1.5']) assert.match(solve(fzDef, { vf: '1000', n: '3000', z }).error, /inteiro/, z);
  assert.ok(Number.isFinite(solve(fzDef, { vf: '1000', n: '3000', z: '3' }).value));
});

test('o modo de avanço por faca do fresamento declara as facas como inteiras', async () => {
  const { millingDefs } = await import('../js/lib/milling-calcs.js');
  assert.match(solve(millingDefs.fz, { vf: '1000', n: '3000', z: '0,5' }).error, /inteiro/);
});
