import { redirect } from '@sveltejs/kit';

export async function load({ session }) {
	if (session.isLoggedIn) {
		throw redirect(302, '/');
	}
	return {};
}
