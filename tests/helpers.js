// localStorage em memória para testar módulos que salvam no aparelho.
export function installLocalStorage() {
  const data = new Map();
  const storage = {
    getItem: k => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: k => data.delete(k),
    clear: () => data.clear(),
  };
  globalThis.localStorage = storage;
  return storage;
}

// Carrega technical-data.js e data.js (scripts clássicos que definem window.TECHNICAL_DATA e window.DB).
export async function loadData() {
  globalThis.window = globalThis;
  await import('../data/technical-data.js');
  await import('../data/data.js');
  return { TECHNICAL_DATA: globalThis.TECHNICAL_DATA, DB: globalThis.DB };
}
