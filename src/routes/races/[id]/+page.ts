import raceDetails from '$lib/graphql/customStores/raceDetails';

export const load = async ({ fetch, params }) => {
	await raceDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
