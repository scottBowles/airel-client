import { KQL_Npcs } from '$lib/graphql/_kitql/graphqlStores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	await KQL_Npcs.queryLoad({ fetch });
	return {};
};
