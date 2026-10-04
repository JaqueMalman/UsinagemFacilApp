import { parseInch, parseMillimeters, nearestFraction, formatNumber } from '../lib/numbers.js';

const $ = s => document.querySelector(s);
const modes = [...document.querySelectorAll('.conversion-mode')];
const input = $('#conversionInput'), inputTitle = $('#inputTitle'), inputHelp = $('#inputHelp'), inputUnit = $('#inputUnit');
const result = $('#conversionResult'), resultUnit = $('#resultUnit'), resultExtra = $('#resultExtra');
const error = $('#conversionError'), formulaText = $('#formulaText'), grid = $('#fractionGrid');
const fractions = ['1/16','1/8','3/16','1/4','5/16','3/8','7/16','1/2','9/16','5/8','11/16','3/4','7/8','1'];
const MODES = {
  'in-mm': { title:'Digite a medida em polegada', help:'Aceita frações como 1/2, 3/8 e também decimal.', placeholder:'Ex.: 1/2', from:'pol', to:'mm', formula:'mm = polegada × 25,4' },
  'mm-in': { title:'Digite a medida em milímetros', help:'Use vírgula ou ponto. Ex.: 12,7', placeholder:'Ex.: 12,7', from:'mm', to:'pol', formula:'polegada = mm ÷ 25,4' }
};
let mode = 'in-mm';

function clearResult() {
  result.classList.add('empty');
  result.querySelector('strong').textContent = '—';
  resultExtra.textContent = 'Digite uma medida acima.';
}

function setMode() {
  const m = MODES[mode];
  modes.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  input.value = ''; error.textContent = '';
  inputTitle.textContent = m.title; inputHelp.textContent = m.help; input.placeholder = m.placeholder;
  inputUnit.textContent = m.from; resultUnit.textContent = m.to; formulaText.textContent = m.formula;
  clearResult();
}

function convert() {
  error.textContent = '';
  const v = mode === 'in-mm' ? parseInch(input.value) : parseMillimeters(input.value);
  if (!Number.isFinite(v) || v <= 0) { error.textContent = 'Digite uma medida válida.'; clearResult(); return; }
  result.classList.remove('empty');
  if (mode === 'in-mm') {
    const mm = v * 25.4;
    result.querySelector('strong').textContent = formatNumber(mm, 3);
    resultExtra.textContent = `${input.value.trim().replace(/[″"”]/g, '')}″ corresponde a ${formatNumber(mm, 3)} mm.`;
  } else {
    const inch = v / 25.4, frac = nearestFraction(inch);
    result.querySelector('strong').textContent = formatNumber(inch, 5);
    resultExtra.textContent = frac ? `Fração equivalente: ${frac}` : 'Não coincide exatamente com uma fração comum até 1/64″.';
  }
}

grid.innerHTML = fractions.map(f => `<button data-f="${f}" type="button"><b>${f}″</b><small>${formatNumber(parseInch(f) * 25.4, 2)} mm</small></button>`).join('');
grid.querySelectorAll('button').forEach(b => b.onclick = () => {
  mode = 'in-mm'; setMode(); input.value = b.dataset.f; convert();
  window.scrollTo({ top: 220, behavior: 'smooth' });
});
modes.forEach(b => b.onclick = () => { mode = b.dataset.mode; setMode(); });
$('#convertBtn').onclick = convert;
input.addEventListener('keydown', e => { if (e.key === 'Enter') convert(); });
$('#toggleFormula').onclick = () => $('#formulaBox').classList.toggle('is-hidden');
