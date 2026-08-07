export type FeedbackVisualSeed = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  twinkleDuration: number;
  twinkleDelay: number;
  driftDuration: number;
  driftX: number;
  driftY: number;
};

function hashId(id: string) {
  let hash = 2166136261;
  for (let index = 0; index < id.length; index += 1) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function unit(hash: number, salt: number) {
  const mixed = Math.imul(hash ^ Math.imul(salt + 1, 0x9e3779b1), 0x85ebca6b) >>> 0;
  return mixed / 4294967295;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** A stable four-column lattice with per-ID jitter prevents random clumps and scales past the demo set. */
export function feedbackVisualSeed(id: string, index: number, total: number): FeedbackVisualSeed {
  const hash = hashId(id);
  const columns = 4;
  const rows = Math.max(1, Math.ceil(total / columns));
  const column = index % columns;
  const row = Math.floor(index / columns);
  const x = clamp(((column + 0.5) / columns) * 100 + (unit(hash, 1) - 0.5) * 10, 7, 93);
  const y = clamp(((row + 0.5) / rows) * 100 + (unit(hash, 2) - 0.5) * (22 / rows), 8, 92);

  return {
    x,
    y,
    scale: 0.78 + unit(hash, 3) * 0.64,
    rotation: -22 + unit(hash, 4) * 44,
    twinkleDuration: 3.8 + unit(hash, 5) * 4.1,
    twinkleDelay: -unit(hash, 6) * 6.5,
    driftDuration: 9 + unit(hash, 7) * 10,
    driftX: -7 + unit(hash, 8) * 14,
    driftY: -7 + unit(hash, 9) * 14
  };
}
