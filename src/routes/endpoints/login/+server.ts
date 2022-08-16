import api from '../_api.js';

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
	const { username, password } = await requestFromClient.json();

	/* Construct payload */
	const query = `
		mutation login($username: String!, $password: String!) {
			tokenAuth(input: { username: $username, password: $password }) {
				token
				payload
			}
		}
	`;
	const variables = { username, password };
	const payload = { query, variables };

	/* Send request to GraphQL server */
	const res = await api({ payload });
	const json = await res.json();
	const {
		data: { tokenAuth },
		errors
	} = json;
	const body = JSON.stringify({ tokenAuth, errors });

	/* If there are errors, remove the token cookie from the client */
	if (errors) {
		return {
			status: 401,
			body,
			headers: {
				'set-cookie': 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
			}
		};
	}
	/* On a successful login, at a token cookie to the client */
	return {
		status: 200,
		body,
		headers: {
			'set-cookie': `token=${tokenAuth.token}; Path=/; HttpOnly`
		}
	};
}
