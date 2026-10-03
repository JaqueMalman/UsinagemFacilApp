const turningPanel = document.querySelector('#turningCalc');
const turningFormulaBox = document.querySelector('#turningFormulaBox');
const toggleTurningFormula = document.querySelector('#toggleTurningFormula');
let turningMode = 'rpm';

const turningDefs = {
  rpm: {
    title:'Descobrir RPM da peça',
    intro:'Informe o diâmetro da peça e a velocidade de corte.',
    fields:[['vc','Velocidade de corte','m/min','Ex.: 150'],['d','Diâmetro da peça','mm','Ex.: 50']],
    result:'Rotação da peça', unit:'RPM', formula:'n = Vc × 1000 ÷ (π × D)',
    calc:v => (v.vc*1000)/(Math.PI*v.d), decimals:0,
    hint:'Ajuste a rotação da máquina considerando os valores disponíveis no equipamento.'
  },
  vf: {
    title:'Descobrir avanço por minuto',
    intro:'Informe a rotação e o avanço por volta.',
    fields:[['n','Rotação da peça','RPM','Ex.: 955'],['f','Avanço por volta','mm/rot','Ex.: 0,20']],
    result:'Avanço por minuto', unit:'mm/min', formula:'vf = n × f',
    calc:v => v.n*v.f, decimals:0,
    hint:'Resultado calculado a partir do avanço por volta informado.'
  },
  vc: {
    title:'Descobrir velocidade de corte',
    intro:'Informe o diâmetro da peça e a rotação.',
    fields:[['d','Diâmetro da peça','mm','Ex.: 50'],['n','Rotação da peça','RPM','Ex.: 955']],
    result:'Velocidade de corte', unit:'m/min', formula:'Vc = π × D × n ÷ 1000',
    calc:v => (Math.PI*v.d*v.n)/1000, decimals:1,
    hint:'Compare o resultado com a recomendação da ferramenta ou do catálogo.'
  }
};

function tNum(value){ return window.UsinagemSafety?.sanitizeInput(value, 0) ?? 0; }
function tFormat(value, decimals){ return value.toLocaleString('pt-BR',{minimumFractionDigits:decimals,maximumFractionDigits:decimals}); }

function renderTurning(){
  const d = turningDefs[turningMode];
  turningPanel.innerHTML = `
    <div class="calc-simple-head">
      <span class="step-badge turning-badge">CALCULAR</span>
      <h2>${d.title}</h2>
      <p>${d.intro}</p>
    </div>
    <div class="simple-fields">
      ${d.fields.map(([id,label,unit,placeholder]) => `
        <label class="simple-field">
          <span>${label}</span>
          <div><input inputmode="decimal" id="turn-${id}" placeholder="${placeholder}" aria-label="${label}"><b>${unit}</b></div>
        </label>`).join('')}
    </div>
    <button class="big-calc-btn turning-calc-btn" id="doTurningCalc">🧮 CALCULAR</button>
    <div aria-live="polite" aria-atomic="true" class="big-result turning-result empty" id="turningResult">
      <small>${d.result}</small><strong>—</strong><span>${d.unit}</span><p>${d.hint}</p>
    </div>
    <div class="calc-error" id="turningError"></div><div class="safety-slot" id="turningSafetyAlert" hidden></div>`;

  turningFormulaBox.innerHTML = `<b>Fórmula da tabela técnica</b><p>${d.formula}</p><small>π = 3,1416</small>`;
  turningFormulaBox.hidden = true;
  toggleTurningFormula.textContent = 'ⓘ Ver como foi calculado';
  document.querySelector('#doTurningCalc').onclick = calculateTurning;
}

function calculateTurning(){
  const d = turningDefs[turningMode];
  const vals = {};
  const error = document.querySelector('#turningError');
  for(const [id] of d.fields){
    vals[id] = tNum(document.querySelector('#turn-'+id).value);
    if(!Number.isFinite(vals[id]) || vals[id] <= 0){
      error.textContent = 'Preencha todos os campos com valores maiores que zero.';
      return;
    }
  }
  const out = d.calc(vals);
  if(!Number.isFinite(out)){
    error.textContent = 'Não foi possível calcular. Confira os valores.';
    return;
  }
  error.textContent = '';
  const result = document.querySelector('#turningResult');
  result.classList.remove('empty');
  result.querySelector('strong').textContent = tFormat(out,d.decimals);
  const rpm = turningMode === 'rpm' ? out : vals.n;
  window.UsinagemSafety?.render(document.querySelector('#turningSafetyAlert'), window.UsinagemSafety?.rpmMessage(rpm));
}

document.querySelectorAll('.turning-option').forEach(button => {
  button.onclick = () => {
    document.querySelectorAll('.turning-option').forEach(x => x.classList.remove('active'));
    button.classList.add('active');
    turningMode = button.dataset.calc;
    renderTurning();
  };
});

toggleTurningFormula.onclick = () => {
  turningFormulaBox.hidden = !turningFormulaBox.hidden;
  toggleTurningFormula.textContent = turningFormulaBox.hidden ? 'ⓘ Ver como foi calculado' : 'ⓘ Ocultar fórmula';
};

document.querySelector('#diameterHelp').onclick = () => {
  const box = document.querySelector('#diameterHelpBox');
  box.hidden = !box.hidden;
};

const requestedTurningMode = new URLSearchParams(location.search).get('calc');
if (requestedTurningMode && turningDefs[requestedTurningMode]) {
  turningMode = requestedTurningMode;
  document.querySelectorAll('.turning-option').forEach(x => x.classList.toggle('active', x.dataset.calc === turningMode));
}
renderTurning();
