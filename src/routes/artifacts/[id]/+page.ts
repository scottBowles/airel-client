import artifactDetails from '$lib/graphql/customStores/artifactDetails';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	await artifactDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
