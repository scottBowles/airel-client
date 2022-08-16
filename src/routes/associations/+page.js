import { KQL_Associations } from '$lib/graphql/_kitql/graphqlStores';

export const load = async ({ fetch }) => {
	await KQL_Associations.queryLoad({ fetch });
	return {};
};
