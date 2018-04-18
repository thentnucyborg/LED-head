const hexToRGBA = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
  a: parseInt(hex.slice(7, 9), 16),
});

const hexToRGB = (hex) => {
  let alpha = parseInt(hex.slice(7, 9), 16) / 255

  return {
    r: parseInt(hex.slice(1, 3), 16) * alpha,
    g: parseInt(hex.slice(3, 5), 16) * alpha,
    b: parseInt(hex.slice(5, 7), 16) * alpha,
  }
};


const RGBtoString = ({ r, g, b, a }) => {
  const string = `rgba(${r}, ${g}, ${b}, ${a/256})`;
  return string;
};

const toHex = (c) => {return `00${c.toString(16)}`.slice(-2)}

const RGBAToHex = ({ r, g, b, a }) => {
  return "#" + toHex(r) + toHex(g) + toHex(b) + toHex(a)
}


module.exports = { hexToRGB, hexToRGBA, RGBtoString, RGBAToHex };
