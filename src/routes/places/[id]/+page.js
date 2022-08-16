import placeDetails from '$lib/graphql/customStores/placeDetails';

export const load = async ({ fetch, params }) => {
	await placeDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
