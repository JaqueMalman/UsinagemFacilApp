const allThreads = (window.DB && window.DB.roscas) || [];
const typeButtons = [...document.querySelectorAll('.thread-type:not(.disabled)')];
const results = document.querySelector('#threadResults');
const search = document.querySelector('#threadSearch');
const clear = document.querySelector('#clearThread');
const feedback = document.querySelector('#threadFeedback');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#emptyThread');
const sheet = document.querySelector('#threadSheet');
let activeType = typeButtons[0]?.dataset.filter || '';
function norm(s=''){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[×x]/g,'x').replace(/\s+/g,'').replace(/\./g,',');}
function label(row){const p=row.passo; return row.tipo.startsWith('M ') ? `M${p.replace('x',' × ')}` : p.replace('x',' × ');}
function renderSaved(){
 const H=window.UFHistory,sec=document.querySelector('#savedThreads'),box=document.querySelector('#savedThreadList'); if(!H||!sec||!box)return;
 const fav=H.favorites().map(x=>({...x,_fav:true})), rec=H.recentThreads().filter(r=>!fav.some(f=>f.tipo===r.tipo&&f.passo===r.passo)); const items=[...fav,...rec].slice(0,8);
 box.innerHTML='';sec.hidden=!items.length; items.forEach(r=>{const b=document.createElement('button');b.className='saved-thread-chip';b.innerHTML=`<span>${r._fav?'⭐':'🕘'}</span><b>${label(r)}</b><small>${r.tipo}</small>`;b.onclick=()=>openSheet(r);box.appendChild(b);});
}
function render(){
 const q=norm(search.value); clear.style.visibility=q?'visible':'hidden';
 let rows=allThreads.filter(r=>r.tipo===activeType);
 if(q) rows=allThreads.filter(r=>norm(label(r)).includes(q)||norm(r.passo).includes(q)||norm(r.tipo).includes(q));
 results.innerHTML=''; count.textContent=`${rows.length} medida${rows.length===1?'':'s'}`; empty.hidden=rows.length>0;
 rows.forEach(r=>{const wrap=document.createElement('div');wrap.className='thread-result-wrap';const b=document.createElement('button'); b.className='thread-result'; b.innerHTML=`<b>${label(r)}</b><small>${r.tipo}</small><div class="drill-mini">${r.broca ? `🕳 Broca ${r.broca} mm` : '🟡 Broca pendente de validação WestTools'}</div><span class="go">›</span>`; b.onclick=()=>openSheet(r); const star=document.createElement('button');star.className='favorite-star';star.setAttribute('aria-label','Favoritar rosca');star.textContent=(window.UFHistory&&UFHistory.isFavorite(r))?'★':'☆';star.onclick=e=>{e.stopPropagation();if(window.UFHistory){const on=UFHistory.toggleFavorite(r);star.textContent=on?'★':'☆';renderSaved();}};wrap.append(b,star);results.appendChild(wrap);});
 feedback.textContent=q ? (rows.length?'Toque na medida para ver qual broca usar.':'Não encontrei essa rosca nos dados cadastrados.') : '';
}
function openSheet(r){if(window.UFHistory)UFHistory.addRecentThread(r);location.href=`detalhe-rosca.html?passo=${encodeURIComponent(r.passo)}&tipo=${encodeURIComponent(r.tipo)}`;}
function closeSheet(){sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');document.body.style.overflow='';}
typeButtons.forEach(b=>b.addEventListener('click',()=>{typeButtons.forEach(x=>x.classList.remove('active'));b.classList.add('active');activeType=b.dataset.filter;search.value='';render();}));
search.addEventListener('input',window.UFPerformance ? UFPerformance.debounce(render, 100) : render);clear.addEventListener('click',()=>{search.value='';render();search.focus();});document.querySelector('#sheetClose').onclick=closeSheet;document.querySelector('#sheetBackdrop').onclick=closeSheet;document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet();});render();renderSaved();
