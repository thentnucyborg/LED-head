const hexToRGBA = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
  a: parseInt(hex.slice(7, 9), 16),
});

const hexToRGB = (hex, alpha=null) => {
  alpha = (alpha) ? alpha : parseInt(hex.slice(7, 9), 16) / 255;

  return {
    r: parseInt(hex.slice(1, 3), 16) * alpha,
    g: parseInt(hex.slice(3, 5), 16) * alpha,
    b: parseInt(hex.slice(5, 7), 16) * alpha,
  };
};


const RGBtoString = ({ r, g, b, a }) => (
  `rgba(${r}, ${g}, ${b}, ${a/256})`
);

const randomHex = () => (
  `#${Math.floor(Math.random()*16777215).toString(16)}${toHex(Math.random() * 255)}`
);

const toHex = (c) => (
  `00${c.toString(16)}`.slice(-2)
);

const RGBAToHex = ({ r, g, b, a }) => (
  `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`
);

module.exports = { hexToRGB, hexToRGBA, RGBtoString, RGBAToHex, randomHex, toHex};
