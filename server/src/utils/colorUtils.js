
const hexToRGB = (hex) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
  a: parseInt(hex.slice(7, 9), 16),
});

const RGBtoString = ({ r, g, b, a }) => {
  const string = `rgba(${r}, ${g}, ${b}, ${a/256})`;
  return string;
};

module.exports = { hexToRGB, RGBtoString };
