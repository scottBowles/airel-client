import { KQL_Races } from '$lib/graphql/_kitql/graphqlStores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	await KQL_Races.queryLoad({ fetch });
	return {};
};
