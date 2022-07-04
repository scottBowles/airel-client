import { KQL_ItemById } from '$lib/graphql/_kitql/graphqlStores';
import { writable } from 'svelte/store';

function itemDetails() {
	const stores = {};

	KQL_ItemById.subscribe((value) => {
		const queryKey = JSON.stringify(value.variables);
		if (stores[queryKey]) {
			stores[queryKey].set(value);
		} else {
			stores[queryKey] = writable(value);
		}
	});

	function initializeStoreIfNeeded(variables) {
		const queryKey = JSON.stringify(variables);
		stores[queryKey] ??= writable({});
	}

	function query(params) {
		initializeStoreIfNeeded(params.variables);
		return KQL_ItemById.query(params);
	}

	function queryLoad(params) {
		initializeStoreIfNeeded(params.variables);
		return KQL_ItemById.queryLoad(params);
	}

	return {
		// subscribe: KQL_ItemById.subscribe,
		query,
		queryLoad,
		resetCache: KQL_ItemById.resetCache,
		patch: KQL_ItemById.patch,
		byId: (variables) => {
			const queryKey = JSON.stringify(variables);
			return stores[queryKey] || writable({});
		}
	};
}

export default itemDetails();
