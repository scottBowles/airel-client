import { API_PATH } from '$lib/config/settings';

export async function post({ request, locals }) {
	const token = locals.token;
	const payload = await request.json();

	const res = await fetch(API_PATH, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${token}`
		},
		body: JSON.stringify(payload)
	});

	return {
		status: res.status,
		headers: {
			'Content-Type': 'application/json'
		},
		body: await res.json()
	};
}
