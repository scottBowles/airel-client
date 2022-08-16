import { KQL_Npcs } from '$lib/graphql/_kitql/graphqlStores';

export const load = async ({ fetch }) => {
	await KQL_Npcs.queryLoad({ fetch });
	return {};
};
