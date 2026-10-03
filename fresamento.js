const panel = document.querySelector('#calcPanel');
const formulaBox = document.querySelector('#formulaBox');
const toggleFormula = document.querySelector('#toggleFormula');
let mode = 'rpm';

const defs = {
  rpm: {
    title:'Descobrir RPM', intro:'Informe o diâmetro da ferramenta e a velocidade de corte.',
    fields:[['vc','Velocidade de corte','m/min','Ex.: 100'],['dc','Diâmetro da ferramenta','mm','Ex.: 10']],
    result:'RPM', unit:'RPM', formula:'n = Vc × 1000 ÷ (π × Dc)',
    calc:v => (v.vc*1000)/(Math.PI*v.dc), decimals:0
  },
  vf: {
    title:'Descobrir avanço por minuto', intro:'Informe RPM e avanço por rotação.',
    fields:[['n','Rotação','RPM','Ex.: 3180'],['f','Avanço por rotação','mm/rot','Ex.: 0,10']],
    result:'Avanço por minuto', unit:'mm/min', formula:'vf = n × f',
    calc:v => v.n*v.f, decimals:0
  },
  fz: {
    title:'Descobrir avanço por faca', intro:'Informe avanço por minuto, RPM e número de facas.',
    fields:[['vf','Avanço por minuto','mm/min','Ex.: 1000'],['n','Rotação','RPM','Ex.: 3000'],['z','Número de facas','facas','Ex.: 4']],
    result:'Avanço por faca', unit:'mm/faca', formula:'fz = vf ÷ (n × z)',
    calc:v => v.vf/(v.n*v.z), decimals:3
  },
  vc: {
    title:'Descobrir velocidade de corte', intro:'Informe o diâmetro da ferramenta e o RPM.',
    fields:[['dc','Diâmetro da ferramenta','mm','Ex.: 10'],['n','Rotação','RPM','Ex.: 3180']],
    result:'Velocidade de corte', unit:'m/min', formula:'Vc = π × Dc × n ÷ 1000',
    calc:v => (Math.PI*v.dc*v.n)/1000, decimals:1
  }
};
function num(x){ return window.UsinagemSafety?.sanitizeInput(x, 0) ?? 0; }
function format(n,d){ return n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}); }
function render(){
  const d=defs[mode];
  panel.innerHTML=`<div class="calc-simple-head"><span class="step-badge">CALCULAR</span><h2>${d.title}</h2><p>${d.intro}</p></div>
  <div class="simple-fields">${d.fields.map(([id,label,unit,ph])=>`<label class="simple-field"><span>${label}</span><div><input inputmode="decimal" id="${id}" placeholder="${ph}"><b>${unit}</b></div></label>`).join('')}</div>
  <button class="big-calc-btn" id="doCalc">🧮 CALCULAR</button>
  <div aria-live="polite" aria-atomic="true" class="big-result empty" id="result"><small>${d.result}</small><strong>—</strong><span>${d.unit}</span></div>
  <div class="calc-error" id="calcError"></div><div class="safety-slot" id="safetyAlert" hidden></div>`;
  formulaBox.innerHTML=`<b>Fórmula da tabela técnica</b><p>${d.formula}</p><small>π = 3,1416</small>`;
  formulaBox.hidden=true; toggleFormula.textContent='ⓘ Ver como foi calculado';
  document.querySelector('#doCalc').onclick=calculate;
}
function showError(msg){
  document.querySelector('#calcError').textContent=msg;
  const box=document.querySelector('#result'); box.classList.add('empty'); box.querySelector('strong').textContent='—';
  window.UsinagemSafety?.render(document.querySelector('#safetyAlert'), null);
}
function calculate(){
  const d=defs[mode], vals={}, error=document.querySelector('#calcError');
  for(const [id] of d.fields){ vals[id]=num(document.querySelector('#'+id).value); if(!Number.isFinite(vals[id]) || vals[id]<=0){ showError('Preencha todos os campos com valores maiores que zero.'); return; }}
  const out=d.calc(vals); if(!Number.isFinite(out)){ showError('Não foi possível calcular. Confira os valores.'); return; }
  error.textContent=''; const box=document.querySelector('#result'); box.classList.remove('empty');
  box.querySelector('strong').textContent=format(out,d.decimals);
  const rpm = mode === 'rpm' ? out : vals.n;
  window.UsinagemSafety?.render(document.querySelector('#safetyAlert'), window.UsinagemSafety?.rpmMessage(rpm));
}
document.querySelectorAll('.milling-option').forEach(b=>b.onclick=()=>{document.querySelectorAll('.milling-option').forEach(x=>x.classList.remove('active'));b.classList.add('active');mode=b.dataset.calc;render();});
toggleFormula.onclick=()=>{formulaBox.hidden=!formulaBox.hidden;toggleFormula.textContent=formulaBox.hidden?'ⓘ Ver como foi calculado':'ⓘ Ocultar fórmula';};
const requestedMode = new URLSearchParams(location.search).get('calc');
if (requestedMode && defs[requestedMode]) {
  mode = requestedMode;
  document.querySelectorAll('.milling-option').forEach(x => x.classList.toggle('active', x.dataset.calc === mode));
}
render();
