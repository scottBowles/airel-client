import { toast } from '@zerodevx/svelte-toast';

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

export const alphabetically = (a, b) => (a.name > b.name ? 1 : -1);

const placePrecendence = {
	STAR: 7,
	PLANET: 6,
	MOON: 5,
	REGION: 4,
	TOWN: 3,
	DISTRICT: 2,
	LOCATION: 1
};

export const placeByPrecendence = (a, b) =>
	placePrecendence[b.placeType] - placePrecendence[a.placeType];
