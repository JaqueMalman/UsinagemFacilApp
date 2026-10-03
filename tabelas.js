(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const results = $('#tableResults'), empty = $('#tableEmpty'), title = $('#tableTitle'), count = $('#resultCount'), head = $('#columnHead');
  const search = $('#tableSearch'), clear = $('#clearTableSearch');
  let mode = 'metric-coarse';

  const norm = v => String(v ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s/g,'').replace(/,/g,'.').replace(/[×x]/g,'x').replace(/[”″"]/g,'');
  const fmtThread = p => 'M' + p.replace('x',' × ').replace(/(\d),(\d)/g,'$1,$2');

  function rowsForMode(){
    if(mode === 'metric-coarse') return (DB.roscas||[]).filter(x => x.tipo.includes('Métrica Grossa')).map(x => ({a:fmtThread(x.passo), b:x.broca?'Ø '+x.broca+' mm':'Pendente validação WestTools', key:x.passo+' '+(x.broca||''), passo:x.passo, tipo:x.tipo}));
    if(mode === 'metric-fine') return (DB.roscas||[]).filter(x => x.tipo.includes('Métrica Fina')).map(x => ({a:fmtThread(x.passo), b:x.broca?'Ø '+x.broca+' mm':'Pendente validação WestTools', key:x.passo+' '+(x.broca||''), passo:x.passo, tipo:x.tipo}));
    if(['unc','unf','bsp','bsw','npt'].includes(mode)) return ((TECHNICAL_DATA&&TECHNICAL_DATA.threads)||[]).filter(x=>x.familia===mode).map(x=>({a:x.designacao,b:x.brocaMm==null?'Pendente validação WestTools':'Ø '+String(x.brocaMm).replace('.',',')+' mm',key:x.designacao+' '+(x.passoMm||''),passo:x.designacao,tipo:x.tipo}));
    if(mode === 'conversion') return (DB.conversao||[]).map(x => ({a:x.pol || x.polegada || x.fracao || x.medida || Object.values(x)[0], b:(x.mm || x.milimetros || Object.values(x)[1])+' mm', key:Object.values(x).join(' ')}));
    return [];
  }

  function render(){
    const labels = {'metric-coarse':'Métrica grossa','metric-fine':'Métrica fina','unc':'UNC — Rosca unificada grossa','unf':'UNF — Rosca unificada fina','bsp':'BSP — Paralela / G','bsw':'BSW — Whitworth','npt':'NPT — Tubo cônica','conversion':'Polegada ↔ milímetro'};
    title.textContent = labels[mode];
    head.innerHTML = mode === 'conversion' ? '<span>POLEGADA</span><span>MILÍMETROS</span>' : '<span>ROSCA</span><span>BROCA PARA FURO</span>';
    const q = norm(search.value);
    const rows = rowsForMode().filter(r => !q || norm(r.a+' '+r.b+' '+r.key).includes(q));
    count.textContent = rows.length + (rows.length===1?' resultado':' resultados');
    results.innerHTML = rows.map((r,i) => `<button type="button" class="technical-row" data-row="${i}"><strong>${r.a}</strong><span>${r.b}</span></button>`).join('');
    results.querySelectorAll('.technical-row').forEach((btn,i)=>{ const r=rows[i]; if(r.passo&&r.tipo){ btn.setAttribute('aria-label',`Abrir detalhe ${r.a}`); btn.addEventListener('click',()=>{ location.href=`detalhe-rosca.html?passo=${encodeURIComponent(r.passo)}&tipo=${encodeURIComponent(r.tipo)}`; }); } else { btn.classList.add('noninteractive'); btn.setAttribute('aria-disabled','true'); } });
    empty.classList.toggle('is-hidden', rows.length !== 0);
    results.classList.toggle('is-hidden', rows.length === 0);
    clear.style.visibility = search.value ? 'visible':'hidden';
  }

  $$('.table-type:not(.disabled)').forEach(btn => btn.addEventListener('click', () => {
    $$('.table-type').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.type; render();
    document.querySelector('.table-results-section').scrollIntoView({behavior:'smooth',block:'start'});
  }));
  search.addEventListener('input', window.UFPerformance ? UFPerformance.debounce(render, 100) : render);
  clear.addEventListener('click', () => {search.value=''; search.focus(); render();});
  render();
})();
