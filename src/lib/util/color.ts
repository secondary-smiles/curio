interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
function luminance(color: RGBColor) {
  let a = [color.r, color.g, color.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(first: RGBColor, second: RGBColor) {
  const firstLum = luminance(first);
  const secondLum = luminance(second);

  const brightest = Math.max(firstLum, secondLum);
  const darkest = Math.min(firstLum, secondLum);

  return (brightest + 0.05) / (darkest + 0.05);
}

export type { RGBColor }
export { contrast }
