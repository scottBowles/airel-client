import { PUBLIC_GRAPHQL_URL } from '$env/static/public';

type Input = {
	payload:
		| string
		| {
				query: string;
				variables?: Record<string, unknown>;
		  };
	token?: string;
	opts?: HeadersInit;
};

/**
 * Helper to make requests to the graphql backend
 * Most of the time requests should be made through KitQl, but this is here for
 * exceptions
 */
async function api({ payload, token, opts }: Input): Promise<Response> {
	return fetch(PUBLIC_GRAPHQL_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { authorization: `JWT ${token}` }),
			...opts
		},
		body: JSON.stringify(payload)
	});
}

export default api;
