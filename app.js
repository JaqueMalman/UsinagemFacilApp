const search = document.querySelector('#search');
const clear = document.querySelector('#clearSearch');
const feedback = document.querySelector('#searchFeedback');
const cards = [...document.querySelectorAll('.action-card')];

function normalize(text){return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function filterHome(){
  const q = normalize(search.value.trim());
  clear.style.visibility = q ? 'visible' : 'hidden';
  let found = 0;
  cards.forEach(card => {
    const match = !q || normalize(card.dataset.keywords + ' ' + card.innerText).includes(q);
    card.classList.toggle('is-hidden', !match);
    card.classList.toggle('highlight', !!q && match);
    if(match) found++;
  });
  feedback.textContent = q ? (found ? `${found} opção(ões) relacionada(s) encontrada(s).` : 'Não encontrei. Tente “rosca”, “RPM”, “broca” ou “polegada”.') : '';
}
search.addEventListener('input', window.UFPerformance ? UFPerformance.debounce(filterHome, 100) : filterHome);
clear.addEventListener('click', () => {search.value=''; filterHome(); search.focus();});
cards.forEach(card => card.addEventListener('click', () => { if(card.dataset.href) location.href=card.dataset.href; }));
document.querySelectorAll('.quick-card').forEach(card => card.addEventListener('click', () => { if(card.dataset.href) location.href=card.dataset.href; }));
