import { crawlPage } from './crawl.js';
import { printPages } from './report.js';
async function main() {
	if (process.argv.length < 3) {
		console.log('no website provided');
		return;
	}
	if (process.argv.length > 3) {
		console.log('too many arguments provided');
		return;
	}

	const baseURL = process.argv[2];
	console.log(`The program is starting at ${baseURL}`);
	const pages = await crawlPage(baseURL);
	printPages(pages);
}

main();
