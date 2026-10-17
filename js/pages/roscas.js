import { normalizeThread, debounce } from '../lib/text.js';
import { threadLabel, threadDetailUrl } from '../lib/threads.js';

const allThreads = window.DB?.roscas || [];
const typeButtons = [...document.querySelectorAll('.thread-type:not(.disabled)')];
const results = document.querySelector('#threadResults');
const search = document.querySelector('#threadSearch');
const clear = document.querySelector('#clearThread');
const feedback = document.querySelector('#threadFeedback');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#emptyThread');
const sheet = document.querySelector('#threadSheet');
const stepTypes = document.querySelector('#stepTypes');
const stepSizes = document.querySelector('#stepSizes');
const chosen = document.querySelector('#stepChosen');
// Etapas: sem tipo escolhido mostra a etapa 1 (tipos); com tipo ou busca, a etapa 2 (medidas).
// O tipo fica no histórico do navegador: o "voltar" do celular volta à etapa 1, e quem volta
// do detalhe da rosca reencontra a lista de medidas.
const validType = t => typeButtons.some(b => b.dataset.filter === t) ? t : '';
let activeType = validType(history.state?.tipo);

function render(){
  const q = normalizeThread(search.value);
  clear.style.visibility = q ? 'visible' : 'hidden';
  const rows = q
    ? allThreads.filter(r => normalizeThread(threadLabel(r)).includes(q) || normalizeThread(r.passo).includes(q) || normalizeThread(r.tipo).includes(q))
    : allThreads.filter(r => r.tipo === activeType);
  const showSizes = Boolean(q || activeType);
  stepTypes.hidden = showSizes; stepSizes.hidden = !showSizes;
  typeButtons.forEach(x => { x.classList.toggle('active', x.dataset.filter === activeType); x.setAttribute('aria-pressed', String(x.dataset.filter === activeType)); });
  const typeName = typeButtons.find(x => x.dataset.filter === activeType)?.querySelector('b').textContent;
  chosen.replaceChildren(q ? 'Busca: ' : 'Tipo: ', Object.assign(document.createElement('b'), { textContent: q ? search.value.trim() : typeName || '' }));
  results.innerHTML = '';
  count.textContent = `${rows.length} medida${rows.length === 1 ? '' : 's'}`;
  empty.hidden = rows.length > 0;
  rows.forEach(r => {
    const b = document.createElement('button'); b.className = 'thread-result'; b.type = 'button';
    b.innerHTML = `<b>${threadLabel(r)}</b><small>${r.tipo}</small><div class="drill-mini">${r.broca ? `🕳 Broca ${r.broca} mm` : '🟡 Broca pendente de validação WestTools'}</div><span class="go">›</span>`;
    b.onclick = () => { location.href = threadDetailUrl(r); };
    results.appendChild(b);
  });
  feedback.textContent = q ? (rows.length ? 'Toque na medida para ver qual broca usar.' : 'Não encontrei essa rosca nos dados cadastrados.') : '';
}

function closeSheet(){ sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

// Depois de trocar de etapa, leva a etapa visível para o topo e põe o foco nela.
function showStep(){
  const step = stepSizes.hidden ? stepTypes : stepSizes;
  (step === stepSizes ? document.querySelector('#stepBack') : typeButtons.find(x => x.dataset.filter === activeType) || typeButtons[0])?.focus({ preventScroll: true });
  step.scrollIntoView({ block: 'start' });
}

typeButtons.forEach(b => b.addEventListener('click', () => {
  activeType = b.dataset.filter; search.value = '';
  history.pushState({ tipo: activeType }, '');
  render(); showStep();
}));
document.querySelector('#stepBack').addEventListener('click', () => {
  search.value = '';
  if (history.state?.tipo) { history.back(); return; } // o popstate redesenha
  activeType = ''; render(); showStep();
});
window.addEventListener('popstate', e => {
  activeType = validType(e.state?.tipo); search.value = ''; render(); showStep();
});
search.addEventListener('input', debounce(render, 100));
clear.addEventListener('click', () => { search.value = ''; render(); search.focus(); });
document.querySelector('#sheetClose').onclick = closeSheet;
document.querySelector('#sheetBackdrop').onclick = closeSheet;
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeSheet(); });
render();
