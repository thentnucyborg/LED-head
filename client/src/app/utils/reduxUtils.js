/* Returns an object of all props from given selectors. See selectors */
export const bindSelectorCreators = (selectors, state) => {
  let ret = {};
  Object.keys(selectors).forEach((item) => ret[item] = selectors[item](state));
  return ret;
};
