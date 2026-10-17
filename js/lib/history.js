// Histórico recente de cálculos, salvo só no aparelho (localStorage).
const K = { recentC: 'uf_recent_calcs_v1', milling: 'uf_milling_history_v1', feed: 'uf_feed_history_v1' };
// O armazenamento pode ter sido alterado ou vir de uma versão antiga: só aceita uma
// lista e descarta os registros que não têm o formato esperado (VALID).
const isText = v => typeof v === 'string' && v.length > 0;
const isCalc = x => isText(x?.mode) && x.inputs && typeof x.inputs === 'object' && !Array.isArray(x.inputs)
  && Object.values(x.inputs).every(v => typeof v === 'string') && typeof x.result === 'string' && Number.isFinite(x.at);
const isRecentCalc = x => isText(x?.href) && isText(x?.label);
const VALID = { [K.recentC]: isRecentCalc, [K.milling]: isCalc, [K.feed]: isCalc };

const read = k => {
  let v;
  try { v = JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) { return []; }
  return Array.isArray(v) ? v.filter(VALID[k]) : [];
};
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

export const recentCalcs = () => read(K.recentC);

export function removeRecentCalc(href) { write(K.recentC, read(K.recentC).filter(x => x.href !== href)); }
export function clearRecentCalcs() { write(K.recentC, []); }

export function addRecentCalc(c) {
  const a = read(K.recentC).filter(x => x.href !== c.href);
  a.unshift({ ...c, at: Date.now() });
  write(K.recentC, a.slice(0, 6));
}

// Últimos cálculos de uma calculadora: { mode, inputs: { campo: texto digitado }, result, at }.
// Guarda os 5 mais novos; o mesmo cálculo repetido sobe para o topo em vez de duplicar.
const sameCalc = (a, b) => a.mode === b.mode && JSON.stringify(a.inputs) === JSON.stringify(b.inputs);

function calcHistory(k) {
  return {
    list: () => read(k),
    add(c) {
      const a = read(k).filter(x => !sameCalc(x, c));
      a.unshift({ mode: c.mode, inputs: c.inputs, result: c.result, at: Date.now() });
      write(k, a.slice(0, 5));
    },
    remove(at) { write(k, read(k).filter(x => x.at !== at)); },
    clear() { write(k, []); }
  };
}

export const millingHistory = calcHistory(K.milling);
export const feedHistory = calcHistory(K.feed);
