// All taken from from graphql-relay-js because sveltekit wasn't bringing fromGlobalId into
// the client bundle for some reason.

type Base64String = string;

interface ResolvedGlobalId {
	type: string;
	id: string;
}

const b64CharacterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function fromBase64Char(base64Char: string | undefined): number {
	if (base64Char === undefined) {
		return -1;
	}
	return base64Char === '=' ? 0 : b64CharacterSet.indexOf(base64Char);
}

function fromCodePoint(code: number): string {
	if (code > 0x10ffff) {
		/*
		 * Previously we used Node's API for parsing Base64 and following code
		 * Buffer.from(i, 'base64').toString('utf8')
		 * That silently ignored incorrect input and returned empty string instead
		 * Let's keep this behaviour for a time being and hopefully fix it in the future.
		 */
		return '';
	}
	return String.fromCodePoint(code);
}

function utf8ArrayToString(input: Array<number>) {
	let result = '';
	for (let i = 0; i < input.length; ) {
		const a = input[i++];
		if ((a & 0x80) === 0) {
			result += fromCodePoint(a);
			continue;
		}

		const b = input[i++];
		if ((a & 0xe0) === 0xc0) {
			result += fromCodePoint(((a & 0x1f) << 6) | (b & 0x3f));
			continue;
		}

		const c = input[i++];
		if ((a & 0xf0) === 0xe0) {
			result += fromCodePoint(((a & 0x0f) << 12) | ((b & 0x3f) << 6) | (c & 0x3f));
			continue;
		}

		const d = input[i++];
		result += fromCodePoint(
			((a & 0x07) << 18) | ((b & 0x3f) << 12) | ((c & 0x3f) << 6) | (d & 0x3f)
		);
	}

	return result;
}

function unbase64(input: Base64String): string {
	const utf8Array = [];

	for (let i = 0; i < input.length; i += 4) {
		const a = fromBase64Char(input[i]);
		const b = fromBase64Char(input[i + 1]);
		const c = fromBase64Char(input[i + 2]);
		const d = fromBase64Char(input[i + 3]);

		if (a === -1 || b === -1 || c === -1 || d === -1) {
			/*
			 * Previously we used Node's API for parsing Base64 and following code
			 * Buffer.from(i, 'utf8').toString('base64')
			 * That silently ignored incorrect input and returned empty string instead
			 * Let's keep this behaviour for a time being and hopefully fix it in the future.
			 */
			return '';
		}

		const bitmap24 = (a << 18) | (b << 12) | (c << 6) | d;
		utf8Array.push((bitmap24 >> 16) & 255);
		utf8Array.push((bitmap24 >> 8) & 255);
		utf8Array.push(bitmap24 & 255);
	}

	let paddingIndex = input.length - 1;
	while (input[paddingIndex] === '=') {
		--paddingIndex;
		utf8Array.pop();
	}

	return utf8ArrayToString(utf8Array);
}

export function fromGlobalId(globalId: string): ResolvedGlobalId {
	const unbasedGlobalId = unbase64(globalId);
	const delimiterPos = unbasedGlobalId.indexOf(':');
	return {
		type: unbasedGlobalId.substring(0, delimiterPos),
		id: unbasedGlobalId.substring(delimiterPos + 1)
	};
}
