// Texto para busca: minúsculo e sem acentos ("Furação" → "furacao").
export function normalizeSearch(text = '') {
  return String(text ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Forma canônica para comparar roscas: "M8 × 1,25", "m8x1.25" e "M8 x 1,25″" ficam iguais.
export function normalizeThread(text = '') {
  return normalizeSearch(text).replace(/×/g, 'x').replace(/\s+/g, '').replace(/,/g, '.').replace(/[”″"]/g, '');
}

export function debounce(fn, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}
