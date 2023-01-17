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

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
class ColorHash {
  colors: number[];

  constructor(data: string = "") {
    this.colors = [];

    this.hash(data);
  }

  hash(data: string) {
    this.colors = [];

    // Reduce uniformity by prepending arbitrary character
    data = "x" + data;

    let hash = 0;

    for (let i = 0; i < data.length; i++) {
      hash = data.charCodeAt(i) + ((hash << 5) - hash);
    }


    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      this.colors.push(value);
    }
  }

  rgb(data: string) {
    this.hash(data);

    return this.colors;
  }

  hex(data: string) {
    this.hash(data);

    function toHex(c: number) {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + toHex(this.colors[0]) + toHex(this.colors[1]) + toHex(this.colors[2]);
  }
}


export type { RGBColor }
export { contrast, ColorHash }
