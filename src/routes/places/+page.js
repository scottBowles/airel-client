import { KQL_Places } from '$lib/graphql/_kitql/graphqlStores';

export const load = async ({ fetch }) => {
	await KQL_Places.queryLoad({ fetch });
	return {};
};
