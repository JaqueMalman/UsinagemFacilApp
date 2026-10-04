import { normalizeThread, debounce } from '../lib/text.js';
import { threadLabel, threadDetailUrl } from '../lib/threads.js';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const results = $('#tableResults'), empty = $('#tableEmpty'), title = $('#tableTitle'), count = $('#resultCount'), head = $('#columnHead');
const search = $('#tableSearch'), clear = $('#clearTableSearch');
const LABELS = {'metric-coarse':'Métrica grossa','metric-fine':'Métrica fina','unc':'UNC — Rosca unificada grossa','unf':'UNF — Rosca unificada fina','bsp':'BSP — Paralela / G','bsw':'BSW — Whitworth','npt':'NPT — Tubo cônica','conversion':'Polegada ↔ milímetro'};
let mode = 'metric-coarse';

function rowsForMode(){
  if(mode === 'conversion') return (window.DB?.conversao || []).map(x => ({a:x.polegada, b:x.milimetros + ' mm', key:`${x.polegada} ${x.milimetros}`}));
  return (window.DB?.roscas || []).filter(x => x.technical.familia === mode).map(x => ({
    a: threadLabel(x),
    b: x.broca ? `Ø ${x.broca} mm` : 'Pendente validação WestTools',
    key: `${x.passo} ${x.broca || ''} ${x.technical.passoMm ?? ''}`,
    row: x
  }));
}

function render(){
  title.textContent = LABELS[mode];
  head.innerHTML = mode === 'conversion' ? '<span>POLEGADA</span><span>MILÍMETROS</span>' : '<span>ROSCA</span><span>BROCA PARA FURO</span>';
  const q = normalizeThread(search.value);
  const rows = rowsForMode().filter(r => !q || normalizeThread(`${r.a} ${r.b} ${r.key}`).includes(q));
  count.textContent = rows.length + (rows.length === 1 ? ' resultado' : ' resultados');
  results.innerHTML = rows.map(r => `<button type="button" class="technical-row"><strong>${r.a}</strong><span>${r.b}</span></button>`).join('');
  results.querySelectorAll('.technical-row').forEach((btn, i) => {
    const r = rows[i];
    if(r.row){
      btn.setAttribute('aria-label', `Abrir detalhe ${r.a}`);
      btn.addEventListener('click', () => { location.href = threadDetailUrl(r.row); });
    } else {
      btn.classList.add('noninteractive'); btn.setAttribute('aria-disabled', 'true');
    }
  });
  empty.classList.toggle('is-hidden', rows.length !== 0);
  results.classList.toggle('is-hidden', rows.length === 0);
  clear.style.visibility = search.value ? 'visible' : 'hidden';
}

$$('.table-type:not(.disabled)').forEach(btn => btn.addEventListener('click', () => {
  $$('.table-type').forEach(x => { x.classList.toggle('active', x === btn); if (!x.classList.contains('disabled')) x.setAttribute('aria-pressed', String(x === btn)); }); mode = btn.dataset.type; render();
  $('.table-results-section').scrollIntoView({behavior:'smooth', block:'start'});
}));
search.addEventListener('input', debounce(render, 100));
clear.addEventListener('click', () => { search.value = ''; search.focus(); render(); });
render();
