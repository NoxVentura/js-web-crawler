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

async function crawlPage(currentURL) {
	console.log(`crawling ${currentURL}`);
	// try {
	const res = await fetch(currentURL, {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	// } catch (err) {
	// throw new Error(`Network Error: ${err.message}`);
	// }

	// if (res.status > 399) {
	// 	console.log(`HTML Error: ${res.status} ${res.statusText}`);
	// }
	// const contentType = res.headers.get('content-type');
	// if (!contentType || !contentType.includes('text/html')) {
	// console.log(`Non-HTML response Error: ${res.status} ${res.statusText}`);
	// return;
	// }

	console.log(await res.text());
}

export { normalizeURL, getURLsFromHTML, crawlPage };
