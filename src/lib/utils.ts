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

export function withToken(fetch, session) {
	function fetchWithToken(path: RequestInfo, opts: RequestInit = {}): Promise<Response> {
		const headers = {
			...opts.headers,
			Authorization: `JWT ${session.token}`
		};
		return fetch(path, {
			...opts,
			headers
		});
	}
	if (session.token) {
		return fetchWithToken;
	}
	return fetch;
}

export function somethingWentWrong(error: string) {
	toast.push(`<strong>Something went wrong</strong><br />${error}`);
}
