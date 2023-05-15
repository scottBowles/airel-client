import { toast } from '@zerodevx/svelte-toast';

export { fromGlobalId } from './fromGlobalId';

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export function post(endpoint: string, data = {}) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

/** Can't use this as is since session doesn't exist anymore */
// export function withToken(fetch, session) {
// 	function fetchWithToken(path: RequestInfo, opts: RequestInit = {}): Promise<Response> {
// 		const headers = {
// 			...opts.headers,
// 			Authorization: `JWT ${session.token}`
// 		};
// 		return fetch(path, {
// 			...opts,
// 			headers
// 		});
// 	}
// 	if (session.token) {
// 		return fetchWithToken;
// 	}
// 	return fetch;
// }

export function somethingWentWrong(error: string) {
	toast.push(`<strong>Something went wrong</strong><br />${error}`);
}

/** SORT FUNCTIONS */

export const alphabeticallyBy =
	<T extends string, K extends { [key in T]: string }>(key: T) =>
	(a: K, b: K) =>
		a[key] > b[key] ? 1 : -1;

const placePrecendence = {
	STAR: 7,
	PLANET: 6,
	MOON: 5,
	REGION: 4,
	TOWN: 3,
	DISTRICT: 2,
	LOCATION: 1
} as const;
type PlaceType = keyof typeof placePrecendence;

export const placeByPrecendence = <T extends { readonly placeType: PlaceType | null }>(
	a: T,
	b: T
) => {
	const aPrecedence = a?.placeType ? placePrecendence[a.placeType] : 0;
	const bPrecedence = b?.placeType ? placePrecendence[b.placeType] : 0;
	return bPrecedence - aPrecedence;
};

export const logByGameDate = <T extends { gameDate: Date | null }>(a: T, b: T) =>
	(b.gameDate?.getTime() || 0) - (a.gameDate?.getTime() || 0);

export function adjustForTimezone(date: Date) {
	const offset = date.getTimezoneOffset();
	return new Date(date.getTime() + offset * 60 * 1000);
}
