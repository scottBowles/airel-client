import { KQL_Items } from '$lib/graphql/_kitql/graphqlStores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	await KQL_Items.queryLoad({ fetch });
	return {};
};
