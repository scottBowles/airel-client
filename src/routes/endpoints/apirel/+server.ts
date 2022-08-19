import api from '../api.js';

/**
 * Endpoint to access the graphql backend
 * At one time everything was routed through here to add the token to the request
 * but now this is handled by KitQl
 */
export async function POST({ request, locals }) {
	const token = locals.token;
	const payload = await request.json();
	const res = await api({ payload, token });

	const body = await res.json();
	return new Response(JSON.stringify(body), {
		status: res.status,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
