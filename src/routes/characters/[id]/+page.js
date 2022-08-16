import characterDetails from '$lib/graphql/customStores/characterDetails';

export const load = async ({ fetch, params }) => {
	await characterDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
