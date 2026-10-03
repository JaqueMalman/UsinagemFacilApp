import { addRecentCalc, recentCalcs } from './js/lib/history.js';

const labels = {
  'fresamento.html':'Fresamento / Furação','torneamento.html':'Torneamento',
  'fresamento.html?calc=rpm':'Descobrir RPM','fresamento.html?calc=vc':'Velocidade de corte',
  'fresamento.html?calc=vf':'Avanço por minuto','avanco-fresamento.html':'Avanço por faca',
  'conversoes.html':'Conversões'
};
document.querySelectorAll('.hub-operation-grid a,.calculator-shortcuts a').forEach(a => a.addEventListener('click', () => {
  const href = a.getAttribute('href');
  addRecentCalc({href, label: labels[href] || a.querySelector('b')?.textContent || 'Cálculo'});
}));
const recent = recentCalcs(), sec = document.querySelector('#recentCalcs'), list = document.querySelector('#recentCalcList');
if(recent.length && sec && list){
  sec.hidden = false;
  recent.slice(0, 4).forEach(c => {
    const a = document.createElement('a');
    a.href = c.href;
    a.innerHTML = `<span>🕘</span><b>${c.label}</b><small>Abrir novamente</small>`;
    a.addEventListener('click', () => addRecentCalc(c));
    list.appendChild(a);
  });
}
