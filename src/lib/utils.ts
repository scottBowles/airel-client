export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export function post(endpoint, data) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export const withToken = (fetch, session) =>
	session.token
		? (path, opts = {}) => {
				const headers = {
					...opts.headers,
					Authorization: `JWT ${session.token}`
				};
				return fetch(path, {
					...opts,
					headers
				});
		  }
		: fetch;
