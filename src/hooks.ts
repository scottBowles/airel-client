import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.token = cookies.token;
	event.locals.isLoggedIn = !!cookies.token;

	const response = await resolve(event);

	return response;
}

export function getSession(event) {
	const { isLoggedIn, token } = event.locals;
	return { isLoggedIn, token };
}
