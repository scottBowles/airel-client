import { KQL_AssociationById } from '$lib/graphql/_kitql/graphqlStores';
import { writable } from 'svelte/store';

function associationDetails() {
	const stores = {};

	KQL_AssociationById.subscribe((value) => {
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
		return KQL_AssociationById.query(params);
	}

	function queryLoad(params) {
		initializeStoreIfNeeded(params.variables);
		return KQL_AssociationById.queryLoad(params);
	}

	return {
		// subscribe: KQL_AssociationById.subscribe,
		query,
		queryLoad,
		resetCache: KQL_AssociationById.resetCache,
		patch: KQL_AssociationById.patch,
		byId: (variables) => {
			const queryKey = JSON.stringify(variables);
			return stores[queryKey] || writable({});
		}
	};
}

export default associationDetails();
