import { addRecentCalc, recentCalcs, removeRecentCalc, clearRecentCalcs, millingHistory, feedHistory } from '../lib/history.js';
import { setupCalcHistory } from '../lib/calc-history.js';
import { twoTapButton } from '../lib/confirm.js';
import { describeMillingCalc, describeFeedCalc } from '../lib/milling-calcs.js';

const labels = {
  'fresamento.html':'Fresamento / Furação','torneamento.html':'Torneamento',
  'fresamento.html?calc=rpm':'Descobrir RPM','fresamento.html?calc=vc':'Velocidade de corte',
  'fresamento.html?calc=vf':'Avanço por minuto','avanco-fresamento.html':'Avanço por faca',
  'conversoes.html':'Conversões'
};
document.querySelectorAll('.hub-operation-grid a,.calculator-shortcuts a').forEach(a => a.addEventListener('click', () => {
  const href = a.getAttribute('href');
  addRecentCalc({href, label: labels[href] || a.querySelector('b')?.textContent || 'Cálculo'});
}));
// Consultados recentemente: atalhos das calculadoras abertas por último.
// Só aceita links para páginas do próprio app (ex.: fresamento.html?calc=rpm).
const SAFE_HREF = /^[a-z0-9-]+\.html(\?[\w=&%.,-]*)?$/;
function renderRecent() {
  const recent = recentCalcs().filter(c => SAFE_HREF.test(c.href)).slice(0, 4), sec = document.querySelector('#recentCalcs'), list = document.querySelector('#recentCalcList');
  sec.hidden = !recent.length;
  list.innerHTML = '';
  recent.forEach(c => {
    const wrap = document.createElement('div'); wrap.className = 'recent-calc-wrap';
    const a = document.createElement('a');
    a.href = c.href;
    for (const [tag, text] of [['span', '🕘'], ['b', c.label], ['small', 'Abrir novamente']]) {
      const el = document.createElement(tag); el.textContent = text; a.appendChild(el);
    }
    a.addEventListener('click', () => addRecentCalc(c));
    const del = document.createElement('button'); del.type = 'button'; del.className = 'saved-delete';
    del.textContent = '🗑'; del.setAttribute('aria-label', `Tirar dos recentes: ${c.label}`);
    del.onclick = () => { removeRecentCalc(c.href); renderRecent(); };
    wrap.append(a, del); list.appendChild(wrap);
  });
}
twoTapButton(document.querySelector('#recentCalcsClear'), () => { clearRecentCalcs(); renderRecent(); });
renderRecent();

// Últimos cálculos: fresamento e avanço juntos, os 5 mais novos. Tocar abre a página e refaz a conta.
const PAGES = { milling: 'fresamento.html', feed: 'avanco-fresamento.html' };
const STORES = { milling: millingHistory, feed: feedHistory };
const allCalcs = {
  list: () => Object.entries(STORES).flatMap(([source, st]) => st.list().map(c => ({ ...c, source })))
    .sort((a, b) => b.at - a.at).slice(0, 5),
  remove: at => Object.values(STORES).forEach(st => st.remove(at)),
  clear: () => Object.values(STORES).forEach(st => st.clear())
};
setupCalcHistory({
  store: allCalcs,
  describe: c => {
    const info = c.source === 'feed' ? describeFeedCalc(c) : describeMillingCalc(c);
    return info && { ...info, title: `${c.source === 'feed' ? 'Avanço de fresamento' : 'Fresamento'} · ${info.title}` };
  },
  onOpen: c => { location.href = `${PAGES[c.source]}?refazer=${c.at}`; }
});
