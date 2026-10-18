// "Seu resultado": junta o último RPM e o último avanço por minuto calculados na página
// (ex.: 3.183 RPM · 318 mm/min). Fica guardado só enquanto a aba estiver aberta.
import { parseNumberBR, formatNumber } from './numbers.js';

// RPM e avanço que um cálculo de createCalculator fornece. A rotação vem do resultado
// (modo RPM) ou do campo n; o avanço, do resultado (modo vf) ou do campo vf (modo Fz).
export function fromCalc(entry) {
  const vf = entry.mode === 'vf' ? entry.value : entry.mode === 'fz' ? parseNumberBR(entry.inputs.vf, NaN) : undefined;
  return { rpm: entry.rpm, vf };
}

// Próximo estado. O avanço vale para a rotação com que foi calculado: se o RPM mudar,
// o avanço antigo sai (stale = true) para não juntar números que não combinam.
export function nextSummary(state, { rpm, vf }) {
  const s = { ...state, stale: false };
  if (Number.isFinite(rpm)) {
    const r = Math.round(rpm);
    if (r !== s.rpm) {
      s.rpm = r;
      if (s.vf != null && s.vfRpm !== r) { s.vf = null; s.stale = true; }
    }
  }
  if (Number.isFinite(vf)) { s.vf = vf; s.vfRpm = s.rpm; }
  return s;
}

export function summaryText(s) {
  return `${s.rpm != null ? formatNumber(s.rpm, 0) : '—'} RPM · ${s.vf != null ? formatNumber(s.vf, 0) : '—'} mm/min`;
}

function summaryHint(s) {
  if (s.stale) return 'A rotação mudou: calcule o avanço por minuto de novo.';
  if (s.rpm == null) return 'Calcule também o RPM.';
  if (s.vf == null) return 'Calcule também o avanço por minuto.';
  return 'Rotação e avanço do mesmo cálculo.';
}

const load = key => { try { return JSON.parse(sessionStorage.getItem(key)) || {}; } catch (_) { return {}; } };
const save = (key, s) => { try { sessionStorage.setItem(key, JSON.stringify(s)); } catch (_) {} };

// box: <section> com <strong>, <p> e o botão "Limpar". Retorna update(entry) para o onCalculate.
export function setupResultSummary(box, key) {
  let state = load(key);
  function render() {
    box.hidden = state.rpm == null && state.vf == null;
    box.querySelector('strong').textContent = summaryText(state);
    box.querySelector('p').textContent = summaryHint(state);
  }
  box.querySelector('button').onclick = () => { state = {}; save(key, state); render(); };
  render();
  return entry => { state = nextSummary(state, fromCalc(entry)); save(key, state); render(); };
}
