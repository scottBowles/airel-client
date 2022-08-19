import itemDetails from '$lib/graphql/customStores/itemDetails';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	await itemDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
