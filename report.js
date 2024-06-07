function printPages(pages) {
	console.log(`Starting the report`);
	const sortedPages = sortPages(pages);
	for (let sortedPage of sortedPages) {
		const url = sortedPage[0];
		const count = sortedPage[1];
		console.log(`Found ${count} internal links to  ${url}`);
	}
}
function sortPages(pages) {
	const sortedPages = Object.entries(pages).sort((a, b) => {
		if (a[1] === b[1]) {
			return a[0].localeCompare(b[0]);
		}
		return b[1] - a[1];
	});
	return sortedPages;
}

export { printPages, sortPages };
