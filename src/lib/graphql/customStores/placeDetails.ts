import { KQL_PlaceById } from '$lib/graphql/_kitql/graphqlStores';
import { writable } from 'svelte/store';

function placeDetails() {
	const stores = {};

	KQL_PlaceById.subscribe((value) => {
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
		return KQL_PlaceById.query(params);
	}

	function queryLoad(params) {
		initializeStoreIfNeeded(params.variables);
		return KQL_PlaceById.queryLoad(params);
	}

	return {
		// subscribe: KQL_PlaceById.subscribe,
		query,
		queryLoad,
		resetCache: KQL_PlaceById.resetCache,
		patch: KQL_PlaceById.patch,
		byId: (variables) => {
			const queryKey = JSON.stringify(variables);
			return stores[queryKey] || writable({});
		}
	};
}

export default placeDetails();
