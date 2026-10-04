// Leitura e formatação de números digitados pelo operador.

// Padrão brasileiro: vírgula decimal e ponto de milhar (1.000 / 1.000,5 / 3.180).
// Entradas com caracteres inválidos são recusadas em vez de truncadas.
export function parseNumberBR(value, fallback = 0) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : fallback;
  let s = String(value ?? '').replace(/\s/g, '');
  if (!s) return fallback;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^[1-9]\d{0,2}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return fallback;
  const parsed = Number(s);
  return Number.isFinite(parsed) ? parsed : fallback;
}

// Medida em mm: ponto e vírgula são sempre decimais (12.700 = 12,7 mm). Aceita o sufixo "mm".
export function parseMillimeters(value) {
  const s = String(value ?? '').trim().replace(/\s*mm$/i, '').replace(',', '.');
  return /^(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s) : NaN;
}

// Polegada: decimal (0,5), fração (1/2) ou fração mista (1 1/2 ou 1-1/2), com ou sem aspas.
export function parseInch(value) {
  const s = String(value ?? '').trim().replace(/[″"”]/g, '').replace(/,/g, '.').trim();
  if (!s) return NaN;
  const m = s.match(/^(?:(\d+)[\s-]+)?(\d+)\/(\d+)$/);
  if (m) {
    const den = Number(m[3]);
    return den ? Number(m[1] || 0) + Number(m[2]) / den : NaN;
  }
  return /^(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s) : NaN;
}

// Fração comum (até 1/64″) mais próxima da medida em polegadas, se a diferença for no
// máximo 0,0008″ (≈ 0,02 mm). Retorna { text, exact, diffMm } ou null. Nunca sugere 0″
// para uma medida positiva. diffMm = fração − medida, em mm (positivo: a fração é maior).
export function nearestFraction(inches) {
  let best = null, diff = Infinity;
  for (const den of [2, 4, 8, 16, 32, 64]) {
    const num = Math.round(inches * den), d = Math.abs(num / den - inches);
    if (d < diff) { diff = d; best = [num, den]; }
  }
  if (diff > 0.0008 || !best || best[0] <= 0) return null;
  let [n, d] = best;
  const diffMm = (n / d - inches) * 25.4;
  const gcd = (a, b) => b ? gcd(b, a % b) : a, g = gcd(n, d);
  n /= g; d /= g;
  const whole = Math.floor(n / d), rem = n % d;
  const text = d === 1 ? `${n}″` : whole ? `${whole} ${rem}/${d}″` : `${rem}/${d}″`;
  return { text, exact: Math.abs(diffMm) < 0.0005, diffMm };
}

export function formatNumber(value, maxDecimals = 3, minDecimals = 0) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: minDecimals, maximumFractionDigits: maxDecimals });
}
