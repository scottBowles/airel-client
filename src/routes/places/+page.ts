import { KQL_Places } from '$lib/graphql/_kitql/graphqlStores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	await KQL_Places.queryLoad({ fetch });
	return {};
};
