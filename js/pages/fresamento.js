import { createCalculator } from '../lib/calculator.js';
import { rpm, cuttingSpeed, feedPerMinute, feedPerTooth } from '../lib/formulas.js';

createCalculator({
  defs: {
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
  },
  panel: document.querySelector('#calcPanel'),
  formulaBox: document.querySelector('#formulaBox'),
  formulaToggle: document.querySelector('#toggleFormula'),
  optionButtons: [...document.querySelectorAll('.milling-option')],
  ids: { input: id => id, button: 'doCalc', result: 'result', error: 'calcError', alert: 'safetyAlert' }
});
