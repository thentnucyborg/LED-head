const wave = (i) => Math.sin(i) / 2 * 0.5;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

/* 
* Usage
* const counter = generator(0, 1);
* counter.next().value
*/
function* generator(i=0, increment=0.05) {
  while(true) yield i += increment;
}

module.exports = { wave, generator, getRandomInt };
