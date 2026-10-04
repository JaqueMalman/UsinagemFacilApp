import { parseNumberBR, formatNumber } from '../lib/numbers.js';
import { feedFromTooth } from '../lib/formulas.js';
import { rpmMessage, renderAlert } from '../lib/safety.js';
import { feedHistory } from '../lib/history.js';
import { setupCalcHistory } from '../lib/calc-history.js';
import { describeFeedCalc } from '../lib/milling-calcs.js';

let z = 4;
const picker = document.querySelector('#teethPicker');
const help = document.querySelector('#teethHelp');
const result = document.querySelector('#feedResult');
const summary = document.querySelector('#feedSummary');
const error = document.querySelector('#feedError');
const alertSlot = document.querySelector('#feedSafetyAlert');
const formula = document.querySelector('#feedFormula');
const toggle = document.querySelector('#toggleFeedFormula');

function setTeeth(n) {
  z = n;
  picker.querySelectorAll('button').forEach(x => { const on = Number(x.dataset.z) === z; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
}
picker.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => setTeeth(Number(btn.dataset.z))));
document.querySelector('#dontKnow').onclick = () => { help.hidden = !help.hidden; };

function calculate() {
  const rpmText = document.querySelector('#rpm').value, fzText = document.querySelector('#fz').value;
  const n = parseNumberBR(rpmText, 0);
  const fz = parseNumberBR(fzText, 0);
  document.querySelector('#rpm').setAttribute('aria-invalid', String(!(n > 0)));
  document.querySelector('#fz').setAttribute('aria-invalid', String(!(fz > 0)));
  if (!(n > 0) || !(fz > 0)) {
    error.textContent = 'Preencha RPM e avanço por faca com valores maiores que zero.';
    result.classList.add('empty'); result.querySelector('strong').textContent = '—';
    summary.textContent = 'Preencha os dados acima.';
    renderAlert(alertSlot, null);
    return;
  }
  const value = feedFromTooth(n, z, fz);
  if (!Number.isFinite(value)) {
    error.textContent = 'Não foi possível calcular. Confira os valores.';
    result.classList.add('empty'); result.querySelector('strong').textContent = '—';
    renderAlert(alertSlot, null);
    return;
  }
  error.textContent = ''; result.classList.remove('empty');
  renderAlert(alertSlot, rpmMessage(n));
  const vf = formatNumber(value, 0);
  result.querySelector('strong').textContent = vf;
  summary.textContent = `Cálculo: ${formatNumber(n)} RPM × ${z} facas × ${formatNumber(fz)} mm/faca.`;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  feedHistory.add({ mode: 'vf', inputs: { z: String(z), rpm: rpmText, fz: fzText }, result: vf });
  refreshHistory();
}
document.querySelector('#calculateFeed').onclick = calculate;
for (const id of ['#rpm', '#fz']) document.querySelector(id).addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });

// Últimos cálculos: tocar no card preenche facas, RPM e fz e refaz a conta.
const refreshHistory = setupCalcHistory({
  store: feedHistory,
  describe: describeFeedCalc,
  onOpen: openSaved
});

// Abre um cálculo salvo: pelo card desta página ou vindo da tela Calculadoras (?refazer=<at>).
function openSaved(c) {
  setTeeth(Number(c.inputs.z));
  document.querySelector('#rpm').value = c.inputs.rpm;
  document.querySelector('#fz').value = c.inputs.fz;
  calculate();
}
const redo = feedHistory.list().find(c => String(c.at) === new URLSearchParams(location.search).get('refazer'));
if (redo) openSaved(redo);
toggle.onclick = () => { formula.hidden = !formula.hidden; toggle.textContent = formula.hidden ? 'ⓘ Ver como é calculado' : 'ⓘ Ocultar fórmula'; };
