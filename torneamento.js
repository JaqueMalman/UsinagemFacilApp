import { createCalculator } from './js/lib/calculator.js';
import { rpm, cuttingSpeed, feedPerMinute } from './js/lib/formulas.js';

createCalculator({
  defs: {
    rpm: {
      title:'Descobrir RPM da peça',
      intro:'Informe o diâmetro da peça e a velocidade de corte.',
      fields:[['vc','Velocidade de corte','m/min','Ex.: 150'],['d','Diâmetro da peça','mm','Ex.: 50']],
      result:'Rotação da peça', unit:'RPM', formula:'n = Vc × 1000 ÷ (π × D)',
      calc:v => rpm(v.vc, v.d), decimals:0,
      hint:'Ajuste a rotação da máquina considerando os valores disponíveis no equipamento.'
    },
    vf: {
      title:'Descobrir avanço por minuto',
      intro:'Informe a rotação e o avanço por volta.',
      fields:[['n','Rotação da peça','RPM','Ex.: 955'],['f','Avanço por volta','mm/rot','Ex.: 0,20']],
      result:'Avanço por minuto', unit:'mm/min', formula:'vf = n × f',
      calc:v => feedPerMinute(v.n, v.f), decimals:0,
      hint:'Resultado calculado a partir do avanço por volta informado.'
    },
    vc: {
      title:'Descobrir velocidade de corte',
      intro:'Informe o diâmetro da peça e a rotação.',
      fields:[['d','Diâmetro da peça','mm','Ex.: 50'],['n','Rotação da peça','RPM','Ex.: 955']],
      result:'Velocidade de corte', unit:'m/min', formula:'Vc = π × D × n ÷ 1000',
      calc:v => cuttingSpeed(v.d, v.n), decimals:1,
      hint:'Compare o resultado com a recomendação da ferramenta ou do catálogo.'
    }
  },
  panel: document.querySelector('#turningCalc'),
  formulaBox: document.querySelector('#turningFormulaBox'),
  formulaToggle: document.querySelector('#toggleTurningFormula'),
  optionButtons: [...document.querySelectorAll('.turning-option')],
  ids: { input: id => 'turn-' + id, button: 'doTurningCalc', result: 'turningResult', error: 'turningError', alert: 'turningSafetyAlert' },
  classes: { badge: 'turning-badge', button: 'turning-calc-btn', result: 'turning-result' }
});

document.querySelector('#diameterHelp').onclick = () => {
  const box = document.querySelector('#diameterHelpBox');
  box.hidden = !box.hidden;
};
