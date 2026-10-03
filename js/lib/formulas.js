// Fórmulas da tabela técnica. Diâmetros em mm, Vc em m/min, avanços em mm.
// No fresamento/furação o diâmetro é o da ferramenta (Dc); no torneamento, o da peça (D).

// n = Vc × 1000 ÷ (π × D)
export const rpm = (vc, d) => (vc * 1000) / (Math.PI * d);

// Vc = π × D × n ÷ 1000
export const cuttingSpeed = (d, n) => (Math.PI * d * n) / 1000;

// vf = n × f
export const feedPerMinute = (n, f) => n * f;

// fz = vf ÷ (n × z)
export const feedPerTooth = (vf, n, z) => vf / (n * z);

// vf = n × z × fz
export const feedFromTooth = (n, z, fz) => n * z * fz;
