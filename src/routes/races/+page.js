import { KQL_Races } from '$lib/graphql/_kitql/graphqlStores';

export const load = async ({ fetch }) => {
	await KQL_Races.queryLoad({ fetch });
	return {};
};
