import { json } from '@sveltejs/kit';
import refreshAuthToken from '$lib/customApiCalls/refreshAuthToken';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Refresh token endpoint
 *
 * This handles refreshing the JWT token through a SvelteKit endpoint
 * (rather than client -> gql api directly) so the JWT can be stored in the browser's
 * HttpOnly cookie. The cookie then gets parsed on requests and the token stored in the
 * `event.locals` object, to be used by future GraphQL requests requiring authentication.
 */
export const POST: RequestHandler = async (event) => {
	const request = event.request;

	const formData = await request.formData();
	const refresh_token = formData.get('refresh_token');

	if (!refresh_token || typeof refresh_token !== 'string') {
		return new Response('No refresh token provided.', {
			status: 400,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}

	const { errors, token, refreshToken } = await refreshAuthToken(refresh_token);

	if (errors) error(400, { message: JSON.stringify(errors) });

	event.cookies.set('token', token.token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});

	event.cookies.set('refresh_token', refreshToken.token, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 * 5 // 5 weeks
	});

	return json({
		token: token.token,
		refresh_token: refreshToken.token,
		user: token.payload.username,
		success: true
	});
};
