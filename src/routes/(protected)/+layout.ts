import { MeStore } from '$houdini';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const MeQuery = new MeStore();

	const result = await MeQuery.fetch({ event });

	if (result.errors) {
		throw redirect(301, `/login?redirect=${event.url.pathname}`);
	}

	return { me: result.data?.me };
};
