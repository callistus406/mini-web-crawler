const { JSDOM } = require('jsdom');

const normalizeURL = (input) => {
  const urlObj = new URL(input);

  let url = `${urlObj.host}${urlObj.pathname}`;

  if (url.length > 0 && url.slice(-1) === '/') {
    url = url.slice(0, -1);
  }
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
        console.log(urls.push(new URL(anchorTag.href, baseURL).href));
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

const crawlPage = async (baseURL, currentURL, pages) => {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(baseURL);

  //   check if link is off site link
  //   console.log('currentURLObj.hostname, baseURLObj.hostname');
  console.log('----------------------');
  if (currentURLObj.hostname !== baseURLObj.hostname) {
    console.log('true');
    return pages;
  }

  // normalize url

  const normalizedURL = normalizeURL(currentURL);
  console.log(normalizedURL, currentURL);
  // don't recount already counted links

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  // set initial count to 1 // first time of crawling

  pages[normalizedURL] = 1;
  console.log(`crawling: ${currentURL}`);
  let htmlBody = '';

  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(`Got http error: status code: ${response.status}`);
      return pages;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log('non-html response:' + contentType);
      return pages;
    }

    htmlBody = await response.text();
  } catch (error) {
    console.log(`error : ${error}`);
  }

  const nextUrls = fetchUrlFromHtmlBody(htmlBody, baseURL);
  //   console.log('----------------------------');
  //   console.log(nextUrls);
  for (const nextUrl of nextUrls) {
    pages = await crawlPage(baseURL, nextUrl, pages);
  }

  return pages;
};

module.exports = { normalizeURL, fetchUrlFromHtmlBody, crawlPage };
