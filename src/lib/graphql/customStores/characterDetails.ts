import { KQL_NpcById } from '$lib/graphql/_kitql/graphqlStores';
import { writable } from 'svelte/store';

function characterDetails() {
	const stores = {};

	KQL_NpcById.subscribe((value) => {
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
		return KQL_NpcById.query(params);
	}

	function queryLoad(params) {
		initializeStoreIfNeeded(params.variables);
		return KQL_NpcById.queryLoad(params);
	}

	return {
		// subscribe: KQL_NpcById.subscribe,
		query,
		queryLoad,
		resetCache: KQL_NpcById.resetCache,
		patch: KQL_NpcById.patch,
		byId: (variables) => {
			const queryKey = JSON.stringify(variables);
			return stores[queryKey] || writable({});
		}
	};
}

export default characterDetails();
