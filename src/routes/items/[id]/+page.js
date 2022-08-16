import itemDetails from '$lib/graphql/customStores/itemDetails';

export const load = async ({ fetch, params }) => {
	await itemDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
