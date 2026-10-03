// Consistência dos dados técnicos: pega erros de digitação ao cadastrar ou validar roscas.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadData } from './helpers.js';

const { TECHNICAL_DATA: T, DB } = await loadData();
const metric = T.threads.filter(t => t.familia.startsWith('metric'));

test('ids e designações não se repetem', () => {
  const ids = T.threads.map(t => t.id);
  assert.deepEqual(ids.filter((x, i) => ids.indexOf(x) !== i), []);
  const des = T.threads.map(t => `${t.familia}|${t.designacao}`);
  assert.deepEqual(des.filter((x, i) => des.indexOf(x) !== i), []);
});

test('toda rosca pertence a uma família cadastrada e tem passo positivo', () => {
  for (const t of T.threads) {
    assert.ok(T.families[t.familia], `${t.designacao}: família ${t.familia}`);
    assert.ok(t.passoMm > 0, `${t.designacao}: passo ${t.passoMm}`);
    assert.ok(t.tipo, `${t.designacao}: sem tipo`);
  }
});

test('designação métrica bate com diâmetro nominal e passo', () => {
  for (const t of metric) {
    const m = t.designacao.match(/^M(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$/);
    assert.ok(m, `designação fora do padrão: ${t.designacao}`);
    assert.equal(Number(m[1]), t.diametroNominalMm, t.designacao);
    assert.equal(Number(m[2]), t.passoMm, t.designacao);
  }
});

test('broca métrica fica perto de diâmetro − passo (até 0,1 passo de diferença)', () => {
  for (const t of metric.filter(t => t.brocaMm != null)) {
    const esperado = t.diametroNominalMm - t.passoMm;
    assert.ok(Math.abs(t.brocaMm - esperado) <= 0.1 * t.passoMm + 1e-9,
      `${t.designacao}: broca ${t.brocaMm} mm, esperado ≈ ${esperado.toFixed(2)} mm`);
  }
});

test('broca pendente nunca é inventada: sem valor, sem fonte WestTools', () => {
  for (const t of T.threads.filter(t => t.brocaMm == null)) {
    assert.match(t.fontes.broca, /PENDENTE/, t.designacao);
  }
});

test('DB.roscas espelha os dados técnicos no formato das telas', () => {
  assert.equal(DB.roscas.length, T.threads.length);
  const m8 = DB.roscas.find(r => r.technical.designacao === 'M8x1.25');
  assert.equal(m8.passo, '8x1,25');
  assert.equal(m8.broca, m8.technical.brocaMm.toFixed(2).replace('.', ','));
  const unc = DB.roscas.find(r => r.technical.familia === 'unc');
  assert.equal(unc.passo, unc.technical.designacao);
  assert.equal(unc.broca, null);
});

test('tabela de conversão: n/64″ × 25,4 arredondado a 3 casas', () => {
  assert.equal(DB.conversao.length, 64);
  DB.conversao.forEach((c, i) => {
    const [n, d] = c.polegada.split('/').map(Number);
    const milesimos = Math.round(((d ? n / d : n) * 25400));
    assert.equal(c.milimetros, (milesimos / 1000).toFixed(3).replace('.', ','), c.polegada);
    assert.equal((d ? n / d : n), (i + 1) / 64, `ordem: ${c.polegada}`);
  });
});
