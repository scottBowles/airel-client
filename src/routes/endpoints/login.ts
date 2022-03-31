import { login } from '$lib/graphql/Auth.gq';

/**
 * Login endpoint
 *
 * This handles login through a SvelteKit endpoint (rather than client -> gql api directly)
 * so the JWT can be stored in the browser's HttpOnly cookie. The cookie then gets parsed
 * on requests and the token stored in the `event.locals` object, to be used by future
 * GraphQL requests requiring authentication.
 */
export async function post(event) {
	/* Receive request from client in SvelteKit backend */
	const requestFromClient = event.request;
	const json = await requestFromClient.json();
	const { username, password } = json;

	/* Send request to GraphQL server */
	const res = await login({ variables: { username, password } });
	const {
		tokenAuth: { payload, token },
		errors
	} = res;

	/* Send response to client from SvelteKit backend, setting cookies */
	if (errors) {
		return { status: 400, body: JSON.stringify(errors) };
	}

	return {
		status: 200,
		body: JSON.stringify({ payload, token }),
		headers: {
			'set-cookie': `token=${token}; Path=/; HttpOnly`
		}
	};
}
