import { KQL_ArtifactById } from '$lib/graphql/_kitql/graphqlStores';
import { writable } from 'svelte/store';

function artifactDetails() {
	const stores = {};

	KQL_ArtifactById.subscribe((value) => {
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
		return KQL_ArtifactById.query(params);
	}

	function queryLoad(params) {
		initializeStoreIfNeeded(params.variables);
		return KQL_ArtifactById.queryLoad(params);
	}

	return {
		// subscribe: KQL_ArtifactById.subscribe,
		query,
		queryLoad,
		resetCache: KQL_ArtifactById.resetCache,
		patch: KQL_ArtifactById.patch,
		byId: (variables) => {
			const queryKey = JSON.stringify(variables);
			return stores[queryKey] || writable({});
		}
	};
}

export default artifactDetails();
