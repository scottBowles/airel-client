import * as cookie from 'cookie';
// import { PUBLIC_PAGES } from '$lib/constants';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.token = cookies.token;
	event.locals.isLoggedIn = !!cookies.token;

	// if (
	// 	!request.locals.isLoggedIn &&
	// 	// !PUBLIC_PAGES.includes(request.path) &&
	// 	!request.path.startsWith('/api')
	// ) {
	// 	// what else should we do to log the user out? remove user from session?
	// 	return {
	// 		status: 301,
	// 		headers: {
	// 			location: '/login'
	// 		}
	// 	};
	// }

	return await resolve(event);
}

export function getSession(event) {
	const { isLoggedIn, token } = event.locals;
	return { isLoggedIn, token };
}
