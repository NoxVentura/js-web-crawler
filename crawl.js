import { JSDOM } from 'jsdom';

function normalizeURL(url) {
	const urlObj = new URL(url);

	if (urlObj.pathname.endsWith('/')) {
		urlObj.pathname = urlObj.pathname.slice(0, -1);
	}

	return `${urlObj.hostname}${urlObj.pathname}`;
}

function getURLsFromHTML(htmlBody, baseURL) {
	const jsdom = new JSDOM(htmlBody);
	const links = jsdom.window.document.querySelectorAll('a');
	let processedUrls = [];
	for (let link of links) {
		if (link.hasAttribute('href')) {
			let url = link.getAttribute('href');
			try {
				url = new URL(url, baseURL).href;
				processedUrls.push(url);
			} catch (err) {
				console.log(`${err.message}: ${url}`);
			}
		}
	}
	return processedUrls;
}

async function fetchHTML(currentURL) {
	console.log(`crawling ${currentURL}`);

	let res;
	try {
		res = await fetch(currentURL);
	} catch (err) {
		throw new Error(`Network Error: ${err.message}`);
	}

	if (res.status > 399) {
		throw new Error(`HTML Error: ${res.status} ${res.statusText}`);
	}

	const contentType = res.headers.get('content-type');
	if (!contentType || !contentType.includes('text/html')) {
		throw new Error(
			`Non-HTML response Error: ${res.status} ${res.statusText}`
		);
	}

	return res.text();
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
	const baseURLObj = new URL(baseURL);
	const currentURLObj = new URL(currentURL);
	if (currentURLObj.hostname !== baseURLObj.hostname) {
		return pages;
	}

	const normalizedCurrent = normalizeURL(currentURL);
	if (pages[normalizedCurrent]) {
		pages[normalizedCurrent]++;
		return pages;
	}

	let html;
	try {
		html = await fetchHTML(currentURL);
	} catch (err) {
		console.log(err.message);
		return pages;
	}
	pages[normalizedCurrent] = 1;

	const urls = getURLsFromHTML(html, currentURL);
	for (let url of urls) {
		{
			pages = await crawlPage(baseURL, url, pages);
		}
	}

	return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
