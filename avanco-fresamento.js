import { parseNumberBR, formatNumber } from './js/lib/numbers.js';
import { feedFromTooth } from './js/lib/formulas.js';
import { rpmMessage, renderAlert } from './js/lib/safety.js';

let z = 4;
const picker = document.querySelector('#teethPicker');
const help = document.querySelector('#teethHelp');
const result = document.querySelector('#feedResult');
const summary = document.querySelector('#feedSummary');
const error = document.querySelector('#feedError');
const alertSlot = document.querySelector('#feedSafetyAlert');
const formula = document.querySelector('#feedFormula');
const toggle = document.querySelector('#toggleFeedFormula');

picker.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
  picker.querySelectorAll('button').forEach(x => x.classList.remove('active'));
  btn.classList.add('active'); z = Number(btn.dataset.z);
}));
document.querySelector('#dontKnow').onclick = () => { help.hidden = !help.hidden; };

document.querySelector('#calculateFeed').onclick = () => {
  const n = parseNumberBR(document.querySelector('#rpm').value, 0);
  const fz = parseNumberBR(document.querySelector('#fz').value, 0);
  if (!(n > 0) || !(fz > 0)) {
    error.textContent = 'Preencha RPM e avanço por faca com valores maiores que zero.';
    result.classList.add('empty'); result.querySelector('strong').textContent = '—';
    summary.textContent = 'Preencha os dados acima.';
    renderAlert(alertSlot, null);
    return;
  }
  error.textContent = ''; result.classList.remove('empty');
  renderAlert(alertSlot, rpmMessage(n));
  result.querySelector('strong').textContent = formatNumber(feedFromTooth(n, z, fz), 0);
  summary.textContent = `Cálculo: ${formatNumber(n)} RPM × ${z} facas × ${formatNumber(fz)} mm/faca.`;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
toggle.onclick = () => { formula.hidden = !formula.hidden; toggle.textContent = formula.hidden ? 'ⓘ Ver como foi calculado' : 'ⓘ Ocultar fórmula'; };
