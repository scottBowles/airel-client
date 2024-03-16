import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { CurrentAndLastLogUrlsStore } from '$houdini';

export const load = (async (event) => {
	const currentAndLastLogUrlsQuery = new CurrentAndLastLogUrlsStore();
	const { data } = await currentAndLastLogUrlsQuery.fetch({ event });
	const url = data?.gameLogs.edges[1]?.node?.url;
	if (!url) {
		return {};
	}
	redirect(302, url);
}) satisfies PageServerLoad;
