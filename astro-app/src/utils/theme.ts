import css from '../styles/global.css?raw';

export type Theme = 'light' | 'dark';
/** The Settings choice: a fixed theme, or the visitor's device setting. */
export type SiteTheme = Theme | 'system';

/** A hex or oklch() color as hex: meta tags and manifests aren't read by browsers alone, so they get the safe format. */
function toHex(color: string): string {
  if (/^#[\da-f]{3,8}$/i.test(color)) return color;
  const match = color.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)(%?)\s+(-?[\d.]+|none)(?:deg)?\s*(?:\/[^)]*)?\)$/i);
  if (!match) throw new Error(`Unsupported color "${color}" in src/styles/global.css: use hex or oklch()`);
  const [, l, lPercent, c, cPercent, h] = match;
  const lightness = Number(l) / (lPercent ? 100 : 1);
  const chroma = Number(c) * (cPercent ? 0.4 / 100 : 1);
  const hue = h === 'none' ? 0 : (Number(h) * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);

  // OKLab to linear sRGB (Björn Ottosson's matrices), then gamma-encoded and clipped to the sRGB gamut.
  const [L, M, S] = [
    lightness + 0.3963377774 * a + 0.2158037573 * b,
    lightness - 0.1055613458 * a - 0.0638541728 * b,
    lightness - 0.0894841775 * a - 1.291485548 * b,
  ].map(v => v ** 3);
  const rgb = [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
  return `#${rgb
    .map(v => {
      const encoded = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
      return Math.round(Math.min(1, Math.max(0, encoded)) * 255)
        .toString(16)
        .padStart(2, '0');
    })
    .join('')}`;
}

/** Reads a color token from the @theme block in global.css, for places CSS can't reach (meta tags, manifest). */
function colorToken(name: string): Record<Theme, string> {
  const value = css.match(new RegExp(`--color-${name}:\\s*([^;]+);`))?.[1]?.trim();
  if (!value) throw new Error(`Missing --color-${name} in src/styles/global.css`);
  // light-dark(<light>, <dark>), or one color for both themes.
  const [light, dark = light] = value
    .match(/^light-dark\(([^,]+),([^,]+)\)$/)
    ?.slice(1)
    .map(color => toHex(color.trim())) ?? [toHex(value)];
  return { light, dark };
}

export const themeColors = colorToken('background');

/** Where only one theme can be given (manifest, theme-color before the theme script runs), System counts as light. */
export const fixedTheme = (theme: SiteTheme): Theme => (theme === 'dark' ? 'dark' : 'light');
