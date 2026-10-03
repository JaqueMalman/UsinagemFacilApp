import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rpm, cuttingSpeed, feedPerMinute, feedPerTooth, feedFromTooth } from '../js/lib/formulas.js';

const close = (actual, expected, tol = 1e-9) => assert.ok(Math.abs(actual - expected) <= tol, `${actual} ≠ ${expected}`);

test('rpm: n = Vc × 1000 ÷ (π × D)', () => {
  close(rpm(100, 10), 3183.0988618379, 1e-6);
  close(rpm(150, 50), 954.9296585514, 1e-6);
});

test('cuttingSpeed é o inverso de rpm', () => {
  close(cuttingSpeed(10, 3180), 99.9026463, 1e-6);
  for (const [vc, d] of [[100, 10], [150, 50], [80, 6.35]]) close(cuttingSpeed(d, rpm(vc, d)), vc);
});

test('avanços: vf = n × f, fz = vf ÷ (n × z), vf = n × z × fz', () => {
  close(feedPerMinute(3180, 0.1), 318);
  close(feedPerTooth(1000, 3000, 4), 1000 / 12000);
  close(feedFromTooth(3000, 4, 0.1), 1200);
  close(feedPerTooth(feedFromTooth(2500, 3, 0.05), 2500, 3), 0.05);
});
