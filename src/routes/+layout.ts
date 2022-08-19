import { kitQLClient } from '$lib/graphql/kitQLClient';
import '../app.css';

import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: LayoutLoad = async ({ data }) => {
	const { isLoggedIn, token } = data;

	kitQLClient.setHeaders({ Authorization: `JWT ${token}` });

	return { isLoggedIn };
};
