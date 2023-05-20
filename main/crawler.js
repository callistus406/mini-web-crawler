const { JSDOM } = require('jsdom');

const normalizeURL = (input) => {
  const urlObj = new URL(input);

  const url = `${urlObj.host}${urlObj.pathname}`;

  if (url.length > 0 && url.slice(-1) === '/') return url.slice(0, -1);
  return url;
};

// console.log(normalizeURL('http://capacitybay.org'));

const fetchUrlFromHtmlBody = (html, baseURL) => {
  const urls = [];
  // put the html in a object

  const dom = new JSDOM(html);
  // get all anchor tags
  const anchorTags = dom.window.document.querySelectorAll('a');

  for (const anchorTag of anchorTags) {
    if (anchorTag.href.slice(0, 1) === '/') {
      try {
        urls.push(new URL(anchorTag.href, baseURL).href);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        urls.push(new URL(anchorTag.href).href);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return urls;
};

console.log(
  fetchUrlFromHtmlBody(
    `
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
`,
    'http://capacitybay.org'
  )
);

const crawlPage = async (baseURL, currentURL, pages) => {
  console.log(`crawling: ${currentURL}`);

  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(baseURL);

  try {
    const response = await fetch(currentURL);

    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log('non-html response:' + contentType);
      return;
    }

    const result = await response.text();
  } catch (error) {
    console.log(error.message);
  }

  console.log(anchorTags);
};

module.exports = { normalizeURL, fetchUrlFromHtmlBody };
crawlPage('http://blog.boot.dev');
