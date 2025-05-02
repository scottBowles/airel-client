import { setSession } from '$houdini';
import type { JwtPayload } from '$lib/types';
import { jwtDecode } from 'jwt-decode';
import { PUBLIC_PAGES } from '$lib/constants';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import refreshAuthToken from '$lib/customApiCalls/refreshAuthToken';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public';

const populateTokensToLocals = (async ({ event, resolve }) => {
	console.log(1);
	const authToken = event.cookies.get('token');
	const refreshToken = event.cookies.get('refresh_token');

	event.locals.token = authToken;
	event.locals.refresh_token = refreshToken;

	return await resolve(event);
}) satisfies Handle;

const populateUserToLocals = (async ({ event, resolve }) => {
	console.log(2);
	console.log('PUBLIC_GRAPHQL_URL', PUBLIC_GRAPHQL_URL);
	event.locals.user = undefined;
	event.locals.token = event.cookies.get('token');
	event.locals.refresh_token = event.cookies.get('refresh_token');
	console.log('token cookie', event.locals.token);
	console.log('refresh_token cookie', event.locals.refresh_token);

	if (event.locals.token && event.locals.refresh_token) {
		const decodedJson = jwtDecode(event.locals.token) as { payload: string };
		console.log('decodedJson', decodedJson);
		const decoded = JSON.parse(decodedJson.payload) as JwtPayload;
		console.log('decoded', decoded);
		event.locals.user = decoded.username;
		console.log('event.locals.user', event.locals.user);

		const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
		const buffer = 15 * 1000;
		const now = new Date().valueOf();
		const exp = new Date(decoded.exp).valueOf() - timezoneOffset - buffer;
		const shouldRefresh = exp < now;
		console.log('shouldRefresh', shouldRefresh);

		if (shouldRefresh) {
			console.log('refreshing token');
			const tokensRes = await refreshAuthToken(event.locals.refresh_token);
			console.log('tokensRes', tokensRes);
			if (tokensRes.success) {
				event.locals.token = tokensRes.token.token;
				event.locals.refresh_token = tokensRes.refreshToken.token;
				event.locals.user = tokensRes.token.payload.username;
			} else {
				event.locals.user = undefined;
			}
		}
	}

	return await resolve(event);
}) satisfies Handle;

const setCookies = (async ({ event, resolve }) => {
	console.log(3);
	const authToken = event.locals.token;
	const refreshToken = event.locals.refresh_token;
	if (authToken && refreshToken) {
		event.cookies.set('token', authToken, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			sameSite: 'lax',
			httpOnly: true,
			secure: true
		});
		event.cookies.set('refresh_token', refreshToken, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7 * 5, // 5 weeks
			sameSite: 'lax',
			httpOnly: true,
			secure: true
		});
	}
	return await resolve(event);
}) satisfies Handle;

const setHoudiniSession = (async ({ event, resolve }) => {
	console.log(4);
	const { token, refresh_token } = event.locals;
	setSession(event, { token, refresh_token });
	console.log(5);
	return await resolve(event);
}) satisfies Handle;

const doNothing = (async ({ event, resolve }) => {
	console.log(6);
	return await resolve(event);
}) satisfies Handle;

// const gatekeep = (async ({ event, resolve }) => {
// 	if (
// 		!event.locals.user &&
// 		!PUBLIC_PAGES.includes(event.url.pathname) &&
// 		!event.url.pathname.startsWith('/endpoints')
// 	) {
// 		throw redirect(302, '/login');
// 	}

// 	return await resolve(event);
// }) satisfies Handle;

export const handle = sequence(
	populateTokensToLocals,
	populateUserToLocals,
	setCookies,
	setHoudiniSession,
	doNothing
	// gatekeep
);

// Moving to the new api and current SvelteKit and Houdini, this will change a little.
// I think in the latest SvelteKit, the file will become `hooks.server.js` and will only
// run on the server. We'll get the auth token from the cookie and store it in Houdini's
// session using the `setSession` function. This will be used by the GraphQL client to
// add the token to the request headers that go to the Django app.

// In the event that the token is expired (or maybe even near expiration), we'll need to
// refresh it. We'll do that here by calling the `refreshToken` mutation. If it succeeds,
// we'll need to update the cookie and the session.

// If refreshing the token fails, we'll need to clear the cookie and session.

// If refreshing the token fails or if the token isn't present, we'll need to make sure
// the user can't access any of the protected routes.

// When the token expires during client-side navigation, we need to figure out how to
// refresh it, whether within Houdini error handling or in SvelteKit or what. Maybe it
// can be done from the Django app, updating the cookie, though we'll still need to
// figure out how to update the session. When refreshed, make sure to pass
// `revoke_refresh_token=True` along with the `refresh_token` parameter to make sure the
// old refresh token is revoked.
