const { test, expect, describe } = require('@jest/globals');
const { normalizeURL, fetchUrlFromHtmlBody } = require('../main/crawler');
describe('test block for URL formatting', () => {
  // this test checks for protocol in url
  test('normalize protocol ', () => {
    const testInput = 'https://capacitybay.org';
    const result = normalizeURL(testInput);
    const expectedOutput = 'capacitybay.org';
    expect(result).toEqual(expectedOutput);
  });

  //   ==========================

  test('normalize trailing slash', () => {
    const testInput = 'https://capacitybay.org/link';
    const result = normalizeURL(testInput);
    const expectedOutput = 'capacitybay.org/link';
    expect(result).toEqual(expectedOutput);
  });
  //   ==========================

  test('normalize letter cases', () => {
    const testInput = 'https://CApacitybay.org/link';
    const result = normalizeURL(testInput);
    const expectedOutput = 'capacitybay.org/link';
    expect(result).toEqual(expectedOutput);
  });
  //   ==========================

  test('normalize protocol ', () => {
    const testInput = 'http://CApacitybay.org/link';
    const result = normalizeURL(testInput);
    const expectedOutput = 'capacitybay.org/link';
    expect(result).toEqual(expectedOutput);
  });
});

const html = `
<html>
<body>
<a href="http://capacitybay.org">
home
</a>
<a href="http://capacitybay.org/about">
about
</a>
<a href="/contact">
contact
</a>
</body>
</html>
`;

describe('test block for normalizing html links', () => {
  test('test absolute urls and crawled page', () => {
    const testInputUrl = 'http://CApacitybay.org/link';
    const testInputHtml = html;
    const result = fetchUrlFromHtmlBody(testInputHtml, testInputUrl);
    const expectedOutput = [
      'http://capacitybay.org/',
      'http://capacitybay.org/about',
      'http://capacitybay.org/contact',
    ];
    expect(result).toEqual(expectedOutput);
  });
  //   ======================================================
  test('test relative urls and crawled page', () => {
    const testInputUrl = 'http://Capacitybay.org/link';
    const testInputHtml = html;
    const result = fetchUrlFromHtmlBody(testInputHtml, testInputUrl);
    const expectedOutput = [
      'http://capacitybay.org/',
      'http://capacitybay.org/about',
      'http://capacitybay.org/contact',
    ];
    expect(result).toEqual(expectedOutput);
  });
  //   ==================================================
  test('test both  url pattern and crawled page', () => {
    const testInputUrl = 'http://Capacitybay.org/link';
    const testInputHtml = html;
    const result = fetchUrlFromHtmlBody(testInputHtml, testInputUrl);
    const expectedOutput = [
      'http://capacitybay.org/',
      'http://capacitybay.org/about',
      'http://capacitybay.org/contact',
    ];
    expect(result).toEqual(expectedOutput);
  });
  //   ===================================================
  test('test to handle errors', () => {
    const testInputUrl = 'http://Capacitybay.org/link';
    const testInputHtml = `<html><body> <a href="app/pop"></a></body></html>`;
    const result = fetchUrlFromHtmlBody(testInputHtml, testInputUrl);
    const expectedOutput = [];
    expect(result).toEqual(expectedOutput);
  });
});
