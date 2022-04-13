import api from './_api.js';

export async function post({ request, locals }) {
	const token = locals.token;
	const payload = await request.json();
	const res = await api({ payload, token });

	return {
		status: res.status,
		headers: {
			'Content-Type': 'application/json'
		},
		body: await res.json()
	};
}
