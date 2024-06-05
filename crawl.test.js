import { test, expect } from '@jest/globals';
import { getURLsFromHTML, normalizeURL } from './crawl.js';

test('normalizeURL for http requests ', () => {
	const input = 'http://blog.boot.dev/path/';
	const actual = normalizeURL(input);
	const expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL for https requests ', () => {
	const input = 'https://blog.boot.dev/path/';
	const actual = normalizeURL(input);
	const expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL for / not present', () => {
	const input = 'https://blog.boot.dev/path';
	const actual = normalizeURL(input);
	const expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL for capitals present in https', () => {
	const input = 'https://BLOG.boot.dev/path';
	const actual = normalizeURL(input);
	const expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL for capitals present in http', () => {
	const input = 'http://BLOG.boot.dev/path';
	const actual = normalizeURL(input);
	const expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('getURLsfromHTML relative paths to absolute paths', () => {
	const input = `<html>
    <body>
        <a href="/xyz.html"><span>Go to Boot.dev</span></a>
    </body></html>`;
	const baseURL = 'https://blog.boot.dev';
	const actual = getURLsFromHTML(input, baseURL);
	const expected = ['https://blog.boot.dev/xyz.html'];
	expect(actual).toEqual(expected);
});

test('getURLsfromHTML finds all the anchor tags', () => {
	const input = `<html>
    <body>
        <a href="/abc.html"><span>Go to Boot.dev</span></a>
        <a href="/def.html"><span>Go to Boot.dev</span></a>
        <a href="/ghi.html"><span>Go to Boot.dev</span></a>
        <a href="/jkl.html"><span>Go to Boot.dev</span></a>
        <a href="http://bigchungus.gyatt/mno.html"><span>Go to Boot.dev</span></a>
        <a href="/pqr.html"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/lmnop.html"><span>Go to Boot.dev</span></a>
    </body></html>`;
	const baseURL = 'https://blog.boot.dev';
	const actual = getURLsFromHTML(input, baseURL);
	const expected = [
		'https://blog.boot.dev/abc.html',
		'https://blog.boot.dev/def.html',
		'https://blog.boot.dev/ghi.html',
		'https://blog.boot.dev/jkl.html',
		'http://bigchungus.gyatt/mno.html',
		'https://blog.boot.dev/pqr.html',
		'https://blog.boot.dev/lmnop.html',
	];
	expect(actual).toEqual(expected);
});
