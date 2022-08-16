import api from '../_api.js';

/**
 * Endpoint to access the graphql backend
 * At one time everything was routed through here to add the token to the request
 * but now this is handled by KitQl
 */
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
