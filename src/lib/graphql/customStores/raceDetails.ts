import { KQL_RaceById } from '$lib/graphql/_kitql/graphqlStores';
import { writable } from 'svelte/store';

function raceDetails() {
	const stores = {};

	KQL_RaceById.subscribe((value) => {
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
		return KQL_RaceById.query(params);
	}

	function queryLoad(params) {
		initializeStoreIfNeeded(params.variables);
		return KQL_RaceById.queryLoad(params);
	}

	return {
		// subscribe: KQL_RaceById.subscribe,
		query,
		queryLoad,
		resetCache: KQL_RaceById.resetCache,
		patch: KQL_RaceById.patch,
		byId: (variables) => {
			const queryKey = JSON.stringify(variables);
			return stores[queryKey] || writable({});
		}
	};
}

export default raceDetails();
