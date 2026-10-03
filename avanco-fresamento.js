let z = 4;
const picker = document.querySelector('#teethPicker');
const help = document.querySelector('#teethHelp');
const result = document.querySelector('#feedResult');
const error = document.querySelector('#feedError');
const formula = document.querySelector('#feedFormula');
const toggle = document.querySelector('#toggleFeedFormula');
function number(v){ return window.UsinagemSafety?.sanitizeInput(v, 0) ?? 0; }
function br(v){ return v.toLocaleString('pt-BR',{maximumFractionDigits:0}); }
picker.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
  picker.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active'); z=Number(btn.dataset.z);
}));
document.querySelector('#dontKnow').onclick=()=>{help.hidden=!help.hidden;};
document.querySelector('#calculateFeed').onclick=()=>{
  const n=number(document.querySelector('#rpm').value), fz=number(document.querySelector('#fz').value);
  if(!Number.isFinite(n)||n<=0||!Number.isFinite(fz)||fz<=0){error.textContent='Preencha RPM e avanço por faca com valores maiores que zero.';return;}
  const vf=n*z*fz; error.textContent=''; result.classList.remove('empty');
  window.UsinagemSafety?.render(document.querySelector('#feedSafetyAlert'), window.UsinagemSafety?.rpmMessage(n));
  result.querySelector('strong').textContent=br(vf);
  document.querySelector('#feedSummary').textContent=`Cálculo: ${n.toLocaleString('pt-BR')} RPM × ${z} facas × ${fz.toLocaleString('pt-BR')} mm/faca.`;
  result.scrollIntoView({behavior:'smooth',block:'center'});
};
toggle.onclick=()=>{formula.hidden=!formula.hidden;toggle.textContent=formula.hidden?'ⓘ Ver como foi calculado':'ⓘ Ocultar fórmula';};
