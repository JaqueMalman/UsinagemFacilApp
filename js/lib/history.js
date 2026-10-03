// Favoritos e histórico recente, salvos só no aparelho (localStorage).
const K = { fav: 'uf_thread_favorites_v1', recentT: 'uf_recent_threads_v1', recentC: 'uf_recent_calcs_v1' };
const read = k => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) { return []; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const key = t => `${t.tipo}|${t.passo}`;

export const favorites = () => read(K.fav);
export const recentThreads = () => read(K.recentT);
export const recentCalcs = () => read(K.recentC);

// Retorna true se a rosca passou a ser favorita.
export function toggleFavorite(t) {
  const a = read(K.fav), k = key(t);
  const i = a.findIndex(x => key(x) === k);
  if (i >= 0) a.splice(i, 1); else a.unshift({ tipo: t.tipo, passo: t.passo, broca: t.broca || null });
  write(K.fav, a.slice(0, 20));
  return i < 0;
}

export function isFavorite(t) { return read(K.fav).some(x => key(x) === key(t)); }

export function addRecentThread(t) {
  const a = read(K.recentT).filter(x => key(x) !== key(t));
  a.unshift({ tipo: t.tipo, passo: t.passo, broca: t.broca || null, at: Date.now() });
  write(K.recentT, a.slice(0, 8));
}

export function addRecentCalc(c) {
  const a = read(K.recentC).filter(x => x.href !== c.href);
  a.unshift({ ...c, at: Date.now() });
  write(K.recentC, a.slice(0, 6));
}
