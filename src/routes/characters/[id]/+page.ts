import characterDetails from '$lib/graphql/customStores/characterDetails';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	await characterDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
