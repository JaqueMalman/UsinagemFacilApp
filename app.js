import { normalizeSearch, debounce } from './js/lib/text.js';
import { threadLabel, threadDetailUrl } from './js/lib/threads.js';

const search = document.querySelector('#search');
const clear = document.querySelector('#clearSearch');
const feedback = document.querySelector('#searchFeedback');
const cards = [...document.querySelectorAll('.action-card')];

function filterHome(){
  const q = normalizeSearch(search.value.trim());
  clear.style.visibility = q ? 'visible' : 'hidden';
  let found = 0;
  cards.forEach(card => {
    const match = !q || normalizeSearch(card.dataset.keywords + ' ' + card.innerText).includes(q);
    card.classList.toggle('is-hidden', !match);
    card.classList.toggle('highlight', !!q && match);
    if(match) found++;
  });
  feedback.textContent = q ? (found ? `${found} opção(ões) relacionada(s) encontrada(s).` : 'Não encontrei. Tente “rosca”, “RPM”, “broca” ou “polegada”.') : '';
}
search.addEventListener('input', debounce(filterHome, 100));
clear.addEventListener('click', () => {search.value=''; filterHome(); search.focus();});
// Atalhos de rosca leem nome, broca e link dos dados técnicos (data-thread = designação).
// Sem a rosca nos dados, o atalho mantém o texto neutro do HTML e leva à lista de roscas.
document.querySelectorAll('.quick-card[data-thread]').forEach(card => {
  const row = (window.DB?.roscas || []).find(r => r.technical.designacao === card.dataset.thread);
  if(!row) return;
  card.dataset.href = threadDetailUrl(row);
  card.querySelector('b').textContent = threadLabel(row);
  card.querySelector('small').textContent = row.broca ? `Broca ${row.broca} mm` : 'Broca pendente';
});
document.querySelectorAll('.action-card, .quick-card').forEach(card => card.addEventListener('click', () => { if(card.dataset.href) location.href=card.dataset.href; }));
