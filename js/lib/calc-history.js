// Seção "Últimos cálculos": cards com o resultado e os valores usados.
// Tocar no card refaz a conta (onOpen); a 🗑 tira só aquele; "Limpar tudo" pede dois toques.
import { twoTapButton } from './confirm.js';

/**
 * @param {object} o
 * @param {object} o.store      lista de history.js (millingHistory, feedHistory)
 * @param {Function} o.describe entrada → { title, result, inputs } em texto, ou null para esconder
 * @param {Function} o.onOpen   chamado com a entrada tocada
 * @param {string} [o.prefix]   prefixo dos ids da seção (padrão: calcHistory)
 * @returns {Function} refresh, para redesenhar depois de um cálculo novo
 */
export function setupCalcHistory({ store, describe, onOpen, prefix = 'calcHistory' }) {
  const sec = document.getElementById(prefix), list = document.getElementById(prefix + 'List');

  function refresh() {
    const items = store.list().map(c => [c, describe(c)]).filter(([, info]) => info);
    sec.hidden = !items.length;
    list.innerHTML = '';
    items.forEach(([c, info]) => {
      const row = document.createElement('div'); row.className = 'calc-history-item';
      const open = document.createElement('button'); open.type = 'button'; open.className = 'calc-history-open';
      open.innerHTML = `<small>${info.title}</small><b>${info.result}</b><span>${info.inputs}</span>`;
      open.onclick = () => onOpen(c);
      const del = document.createElement('button'); del.type = 'button'; del.className = 'saved-delete';
      del.textContent = '🗑'; del.setAttribute('aria-label', `Tirar do histórico: ${info.title} ${info.result}`);
      del.onclick = () => { store.remove(c.at); refresh(); };
      row.append(open, del); list.appendChild(row);
    });
  }

  twoTapButton(document.getElementById(prefix + 'Clear'), () => { store.clear(); refresh(); });
  refresh();
  return refresh;
}
