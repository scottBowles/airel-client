import placeDetails from '$lib/graphql/customStores/placeDetails';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	await placeDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
