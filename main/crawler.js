const normalizeURL = (input) => {
  const urlObj = new URL(input);

  const url = `${urlObj.host}${urlObj.pathname}`;

  if (url.length > 0 && url.slice(-1) === '/') return url.slice(0, -1);
  return url;
};

// console.log(normalizeURL('http://capacitybay.org'));

module.exports = { normalizeURL };
