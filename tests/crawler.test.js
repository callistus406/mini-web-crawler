const { test, expect, describe } = require('@jest/globals');
const { normalizeURL } = require('../main/crawler');
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
