import { redirect } from '@sveltejs/kit';
import { PUBLIC_PAGES } from '$lib/constants';
import { kitQLClient } from '$lib/graphql/kitQLClient';
import '../app.css';

export async function load({ session, url }) {
	if (!session.isLoggedIn && !PUBLIC_PAGES.includes(url.pathname)) {
		throw redirect(302, '/login');
	}
	kitQLClient.setHeaders({ Authorization: `JWT ${session.token}` });
	return {};
}
