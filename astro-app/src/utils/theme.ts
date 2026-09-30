import css from '../styles/global.css?raw';

/** Reads a color token from the @theme block in global.css, for places CSS can't reach (meta tags, manifest). */
function colorToken(name: string): string {
  const value = css.match(new RegExp(`--color-${name}:\\s*([^;]+);`))?.[1]?.trim();
  if (!value) throw new Error(`Missing --color-${name} in src/styles/global.css`);
  return value;
}

export const themeColor = colorToken('background');
