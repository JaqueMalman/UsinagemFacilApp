import { createCalculator } from '../lib/calculator.js';
import { millingDefs as defs, describeMillingCalc } from '../lib/milling-calcs.js';
import { millingHistory } from '../lib/history.js';
import { setupCalcHistory } from '../lib/calc-history.js';

const calculator = createCalculator({
  defs,
  panel: document.querySelector('#calcPanel'),
  formulaBox: document.querySelector('#formulaBox'),
  formulaToggle: document.querySelector('#toggleFormula'),
  optionButtons: [...document.querySelectorAll('.milling-option')],
  ids: { input: id => id, button: 'doCalc', result: 'result', error: 'calcError', alert: 'safetyAlert' },
  formulaLabels: { show: 'ⓘ Ver como é calculado' },
  onCalculate: entry => { millingHistory.add(entry); refreshHistory(); }
});

const refreshHistory = setupCalcHistory({
  store: millingHistory,
  describe: describeMillingCalc,
  onOpen: openSaved
});

// Abre um cálculo salvo: pelo card desta página ou vindo da tela Calculadoras (?refazer=<at>).
function openSaved(c) { calculator.load(c); document.querySelector('#calcPanel').scrollIntoView({ behavior: 'smooth' }); }
const redo = millingHistory.list().find(c => String(c.at) === new URLSearchParams(location.search).get('refazer'));
if (redo) openSaved(redo);

document.querySelector('#diameterHelp').onclick = () => {
  const box = document.querySelector('#diameterHelpBox');
  box.hidden = !box.hidden;
};
