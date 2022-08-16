import { KQL_Items } from '$lib/graphql/_kitql/graphqlStores';

export const load = async ({ fetch }) => {
	await KQL_Items.queryLoad({ fetch });
	return {};
};
