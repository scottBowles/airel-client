import * as cookie from 'cookie';
import { PUBLIC_PAGES } from '$lib/constants';

export async function handle({ event, resolve }) {
	console.log('enter handle hook');
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.token = cookies.token;
	event.locals.isLoggedIn = !!cookies.token;

	console.log('handle', { locals: event.locals, pathname: event.url.pathname });

	// Redirect to login page if appropriate
	// if (
	// 	!event.locals.isLoggedIn &&
	// 	!event.url.pathname.startsWith('/endpoints') &&
	// 	!PUBLIC_PAGES.includes(event.url.pathname)
	// ) {
	// 	console.log('redirecting in handle hook to /login');
	// 	return new Response(null, {
	// 		status: 302,
	// 		headers: {
	// 			Location: '/login'
	// 		}
	// 	});
	// }

	// Redirect away from login page if logged in
	// if (event.locals.isLoggedIn && event.url.pathname === '/login') {
	// 	console.log('redirecting in handle hook to /');
	// 	return new Response(null, {
	// 		status: 302,
	// 		headers: {
	// 			Location: '/'
	// 		}
	// 	});
	// }

	const response = await resolve(event);

	return response;
}

export function getSession(event) {
	const { isLoggedIn, token } = event.locals;
	return { isLoggedIn, token };
}
