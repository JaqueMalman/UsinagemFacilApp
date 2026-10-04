import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { installLocalStorage } from './helpers.js';
import { rpmLevel, rpmMessage, loadLimits } from '../js/lib/safety.js';

let storage;
beforeEach(() => { storage = installLocalStorage(); });

test('rpmLevel: nada até o limite, aviso acima, perigo acima de 1,5×', () => {
  assert.equal(rpmLevel(4000, 4000), null);
  assert.equal(rpmLevel(4001, 4000), 'warning');
  assert.equal(rpmLevel(6000, 4000), 'warning');
  assert.equal(rpmLevel(6001, 4000), 'danger');
  assert.equal(rpmLevel(NaN, 4000), null);
});

test('limite padrão é 4000 RPM e pode ser configurado', () => {
  assert.equal(loadLimits().rpmWarning, 4000);
  assert.equal(rpmLevel(5000), 'warning');
  storage.setItem('usinagemFacil.machineLimits.v1', JSON.stringify({ rpmWarning: 8000 }));
  assert.equal(rpmLevel(5000), null);
  assert.equal(rpmMessage(9000).limit, 8000);
});

test('limite salvo corrompido volta ao padrão', () => {
  storage.setItem('usinagemFacil.machineLimits.v1', '{quebrado');
  assert.equal(loadLimits().rpmWarning, 4000);
});

test('rpmMessage descreve a rotação e o limite', () => {
  assert.equal(rpmMessage(3000, 4000), null);
  const msg = rpmMessage(9549.3, 4000);
  assert.equal(msg.level, 'danger');
  assert.match(msg.text, /9\.549 RPM/);
  assert.match(msg.text, /4\.000 RPM/);
});
