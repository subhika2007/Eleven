// Maps the free-text pack colours (e.g. "Teal Blue", "Coral Red Print") to simple colour families for filtering.
const FAMILIES = [
  ['Red', /red|coral/i],
  ['Orange', /orange/i],
  ['Pink', /pink|magenta/i],
  ['Maroon', /maroon/i],
  ['Blue', /blue|navy|teal/i],
  ['Green', /green|olive/i],
  ['Purple', /purple|lavender/i],
  ['Yellow', /yellow/i],
  ['Black', /black/i],
  ['Grey', /grey|gray/i],
  ['Beige', /beige/i],
  ['Multicolour', /assorted|multi/i],
];

export const coloursFamiliesOf = (product) => {
  const set = new Set();
  (product.colours || []).forEach((c) => FAMILIES.forEach(([name, re]) => re.test(c) && set.add(name)));
  return [...set];
};

export const ALL_FAMILIES = FAMILIES.map(([n]) => n);

export const FAMILY_HEX = {
  Red: '#d62839', Orange: '#f08a24', Pink: '#e8458b', Maroon: '#7a1230', Blue: '#2b4c9b', Green: '#4f8a3b',
  Purple: '#8f5bd0', Yellow: '#f4c92a', Black: '#222', Grey: '#9a9a9a', Beige: '#d9c3a0',
  Multicolour: 'conic-gradient(#e8458b,#f4c92a,#4f8a3b,#2b4c9b,#e8458b)',
};
