import { sortPages } from './report.js';

test('', () => {
	const input = {
		'lukesmith.xyz/': 162,
		'lukesmith.xyz/tags/linux': 5,
		'lukesmith.xyz/articles/every-web-browser-absolutely-sucks': 5,
		'lukesmith.xyz/tags/software': 11,
		'lukesmith.xyz/articles/obvious-technical-solutions': 7,
		'lukesmith.xyz/tags/technology': 13,
		'lukesmith.xyz/articles/blockchain-blasphemy': 8,
		'lukesmith.xyz/tags/crypto': 7,
		'lukesmith.xyz/tags/updates': 21,
	};
	const actual = sortPages(input);
	const expected = [
		['lukesmith.xyz/', 162],
		['lukesmith.xyz/tags/updates', 21],
		['lukesmith.xyz/tags/technology', 13],
		['lukesmith.xyz/tags/software', 11],
		['lukesmith.xyz/articles/blockchain-blasphemy', 8],
		['lukesmith.xyz/articles/obvious-technical-solutions', 7],
		['lukesmith.xyz/tags/crypto', 7],
		['lukesmith.xyz/articles/every-web-browser-absolutely-sucks', 5],
		['lukesmith.xyz/tags/linux', 5],
	];
	expect(actual).toEqual(expected);
});
