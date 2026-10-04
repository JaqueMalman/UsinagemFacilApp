import { createCalculator } from '../lib/calculator.js';
import { rpm, cuttingSpeed, feedPerMinute, feedPerTooth } from '../lib/formulas.js';
import * as history from '../lib/history.js';
import { twoTapButton } from '../lib/confirm.js';

const defs = {

    rpm: {
      title:'Descobrir RPM', intro:'Informe o diâmetro da ferramenta e a velocidade de corte.',
      fields:[['vc','Velocidade de corte','m/min','Ex.: 100'],['dc','Diâmetro da ferramenta','mm','Ex.: 10']],
      result:'RPM', unit:'RPM', formula:'n = Vc × 1000 ÷ (π × Dc)',
      calc:v => rpm(v.vc, v.dc), decimals:0
    },
    vf: {
      title:'Descobrir avanço por minuto', intro:'Informe RPM e avanço por rotação.',
      fields:[['n','Rotação','RPM','Ex.: 3180'],['f','Avanço por rotação','mm/rot','Ex.: 0,10']],
      result:'Avanço por minuto', unit:'mm/min', formula:'vf = n × f',
      calc:v => feedPerMinute(v.n, v.f), decimals:0
    },
    fz: {
      title:'Descobrir avanço por faca', intro:'Informe avanço por minuto, RPM e número de facas.',
      fields:[['vf','Avanço por minuto','mm/min','Ex.: 1000'],['n','Rotação','RPM','Ex.: 3000'],['z','Número de facas','facas','Ex.: 4']],
      result:'Avanço por faca', unit:'mm/faca', formula:'fz = vf ÷ (n × z)',
      calc:v => feedPerTooth(v.vf, v.n, v.z), decimals:3
    },
    vc: {
      title:'Descobrir velocidade de corte', intro:'Informe o diâmetro da ferramenta e o RPM.',
      fields:[['dc','Diâmetro da ferramenta','mm','Ex.: 10'],['n','Rotação','RPM','Ex.: 3180']],
      result:'Velocidade de corte', unit:'m/min', formula:'Vc = π × Dc × n ÷ 1000',
      calc:v => cuttingSpeed(v.dc, v.n), decimals:1
    }
};

const calculator = createCalculator({
  defs,
  panel: document.querySelector('#calcPanel'),
  formulaBox: document.querySelector('#formulaBox'),
  formulaToggle: document.querySelector('#toggleFormula'),
  optionButtons: [...document.querySelectorAll('.milling-option')],
  ids: { input: id => id, button: 'doCalc', result: 'result', error: 'calcError', alert: 'safetyAlert' },
  formulaLabels: { show: 'ⓘ Ver como é calculado' },
  onCalculate: entry => { history.addMillingCalc(entry); renderHistory(); }
});

// Últimos cálculos: tocar no card refaz a conta; a 🗑 tira só aquele.
function renderHistory() {
  const sec = document.querySelector('#calcHistory'), list = document.querySelector('#calcHistoryList');
  const items = history.millingCalcs().filter(c => defs[c.mode]);
  sec.hidden = !items.length;
  list.innerHTML = '';
  items.forEach(c => {
    const d = defs[c.mode];
    const row = document.createElement('div'); row.className = 'calc-history-item';
    const open = document.createElement('button'); open.type = 'button'; open.className = 'calc-history-open';
    const inputs = d.fields.map(([id, label, unit]) => `${label}: ${c.inputs[id]} ${unit}`).join(' · ');
    open.innerHTML = `<small>${d.result}</small><b>${c.result} ${d.unit}</b><span>${inputs}</span>`;
    open.onclick = () => { calculator.load(c); document.querySelector('#calcPanel').scrollIntoView({ behavior: 'smooth' }); };
    const del = document.createElement('button'); del.type = 'button'; del.className = 'saved-delete';
    del.textContent = '🗑'; del.setAttribute('aria-label', `Tirar do histórico: ${d.result} ${c.result} ${d.unit}`);
    del.onclick = () => { history.removeMillingCalc(c.at); renderHistory(); };
    row.append(open, del); list.appendChild(row);
  });
}
twoTapButton(document.querySelector('#clearHistory'), () => { history.clearMillingCalcs(); renderHistory(); });
renderHistory();

document.querySelector('#diameterHelp').onclick = () => {
  const box = document.querySelector('#diameterHelpBox');
  box.hidden = !box.hidden;
};
