import associationDetails from '$lib/graphql/customStores/associationDetails';

export const load = async ({ fetch, params }) => {
	await associationDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
