import { normalizeThread, debounce } from '../lib/text.js';
import { threadLabel, threadDetailUrl } from '../lib/threads.js';
import * as history from '../lib/history.js';

const allThreads = window.DB?.roscas || [];
const typeButtons = [...document.querySelectorAll('.thread-type:not(.disabled)')];
const results = document.querySelector('#threadResults');
const search = document.querySelector('#threadSearch');
const clear = document.querySelector('#clearThread');
const feedback = document.querySelector('#threadFeedback');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#emptyThread');
const sheet = document.querySelector('#threadSheet');
let activeType = typeButtons[0]?.dataset.filter || '';

function renderSaved(){
  const sec = document.querySelector('#savedThreads'), box = document.querySelector('#savedThreadList');
  if(!sec || !box) return;
  const fav = history.favorites().map(x => ({...x, _fav:true}));
  const rec = history.recentThreads().filter(r => !fav.some(f => f.tipo === r.tipo && f.passo === r.passo));
  const items = [...fav, ...rec].slice(0, 8);
  box.innerHTML = ''; sec.hidden = !items.length;
  items.forEach(r => {
    const b = document.createElement('button');
    b.className = 'saved-thread-chip'; b.type = 'button';
    b.innerHTML = `<span>${r._fav ? '⭐' : '🕘'}</span><b>${threadLabel(r)}</b><small>${r.tipo}</small>`;
    b.onclick = () => openDetail(r);
    box.appendChild(b);
  });
}

function render(){
  const q = normalizeThread(search.value);
  clear.style.visibility = q ? 'visible' : 'hidden';
  const rows = q
    ? allThreads.filter(r => normalizeThread(threadLabel(r)).includes(q) || normalizeThread(r.passo).includes(q) || normalizeThread(r.tipo).includes(q))
    : allThreads.filter(r => r.tipo === activeType);
  results.innerHTML = '';
  count.textContent = `${rows.length} medida${rows.length === 1 ? '' : 's'}`;
  empty.hidden = rows.length > 0;
  rows.forEach(r => {
    const wrap = document.createElement('div'); wrap.className = 'thread-result-wrap';
    const b = document.createElement('button'); b.className = 'thread-result'; b.type = 'button';
    b.innerHTML = `<b>${threadLabel(r)}</b><small>${r.tipo}</small><div class="drill-mini">${r.broca ? `🕳 Broca ${r.broca} mm` : '🟡 Broca pendente de validação WestTools'}</div><span class="go">›</span>`;
    b.onclick = () => openDetail(r);
    const star = document.createElement('button'); star.className = 'favorite-star'; star.type = 'button';
    star.setAttribute('aria-label', 'Favoritar rosca');
    star.textContent = history.isFavorite(r) ? '★' : '☆';
    star.onclick = e => { e.stopPropagation(); star.textContent = history.toggleFavorite(r) ? '★' : '☆'; renderSaved(); };
    wrap.append(b, star); results.appendChild(wrap);
  });
  feedback.textContent = q ? (rows.length ? 'Toque na medida para ver qual broca usar.' : 'Não encontrei essa rosca nos dados cadastrados.') : '';
}

function openDetail(r){ history.addRecentThread(r); location.href = threadDetailUrl(r); }
function closeSheet(){ sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

typeButtons.forEach(b => b.addEventListener('click', () => {
  typeButtons.forEach(x => x.classList.remove('active')); b.classList.add('active');
  activeType = b.dataset.filter; search.value = ''; render();
}));
search.addEventListener('input', debounce(render, 100));
clear.addEventListener('click', () => { search.value = ''; render(); search.focus(); });
document.querySelector('#sheetClose').onclick = closeSheet;
document.querySelector('#sheetBackdrop').onclick = closeSheet;
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeSheet(); });
render(); renderSaved();
