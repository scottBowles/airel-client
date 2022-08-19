import { KQL_Associations } from '$lib/graphql/_kitql/graphqlStores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	await KQL_Associations.queryLoad({ fetch });
	return {};
};
