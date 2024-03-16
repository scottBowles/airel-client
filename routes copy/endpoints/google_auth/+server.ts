import { error, redirect } from '@sveltejs/kit';
import googleLogin from '$lib/customApiCalls/googleLogin';

/**
 * Login endpoint
 *
 * This handles login through a SvelteKit endpoint (rather than client -> gql api directly)
 * so the JWT can be stored in the browser's HttpOnly cookie. The cookie then gets parsed
 * on requests and the token stored in the `event.locals` object, to be used by future
 * GraphQL requests requiring authentication.
 */
export async function POST(event) {
	// This is the callback handed to the google login button. Get the token from the
	// response and send it to the backend to be verified and a JWT created.
	const request = event.request;

	const formData = await request.formData();
	const credential = formData.get('credential') as string;
	const csrf_token_body = formData.get('g_csrf_token');

	const csrf_token_cookie = event.cookies.get('g_csrf_token');

	const csrfError = !csrf_token_cookie
		? 'No CSRF token in cookie.'
		: !csrf_token_body
		? 'No CSRF token in body.'
		: csrf_token_cookie !== csrf_token_body
		? 'Failed to verify double submit cookie.'
		: null;

	if (csrfError) {
		return new Response(csrfError, {
			status: 400,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}

	const { errors, token, refreshToken } = await googleLogin(credential);

	if (errors) error(400, { message: JSON.stringify(errors) });

	// redirect to the home page with the cookie set
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

	const redirectUrl = event.url.searchParams.get('redirect') || '/';

	redirect(303, redirectUrl);
}
