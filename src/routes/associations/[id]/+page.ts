import associationDetails from '$lib/graphql/customStores/associationDetails';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	await associationDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
