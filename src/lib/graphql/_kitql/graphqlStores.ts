import { browser } from '$app/env';
import * as Types from '$lib/graphql/_kitql/graphqlTypes';
import { defaultStoreValue, RequestStatus, ResponseResultType, type PatchType, type RequestParameters, type RequestQueryParameters, type RequestResult } from '@kitql/client';
import { get, writable } from 'svelte/store';
import { kitQLClient } from '../kitQLClient';
 
/**
 * Init KitQL (to have clientStarted = true!)
 *
 * Waiting for: https://github.com/sveltejs/kit/issues/4447
 */
export function KQL__Init() {}
 
/* Internal. To skip await on a client side navigation in the load function (from queryLoad)! */
let clientStarted = false; // Will be true on a client side navigation
if (browser) {
	addEventListener('sveltekit:start', () => {
		clientStarted = true;
	});
}
 
/**
 * ResetAllCaches in One function!
 */
export function KQL__ResetAllCaches() {
	KQL_ArtifactById.resetCache();
	KQL_Artifacts.resetCache();
	KQL_AssociationById.resetCache();
	KQL_Associations.resetCache();
	KQL_ItemById.resetCache();
	KQL_Items.resetCache();
	KQL_Me.resetCache();
	KQL_NpcById.resetCache();
	KQL_Npcs.resetCache();
	KQL_PlaceById.resetCache();
	KQL_Places.resetCache();
	KQL_RaceById.resetCache();
	KQL_Races.resetCache();
}
 
/* Operations 👇 */
function KQL_ArtifactByIdStore() {
	const operationName = 'KQL_ArtifactById';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.ArtifactByIdQuery, Types.ArtifactByIdQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.ArtifactByIdQueryVariables>
		): Promise<RequestResult<Types.ArtifactByIdQuery, Types.ArtifactByIdQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_ArtifactById).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.ArtifactByIdQuery, Types.ArtifactByIdQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.ArtifactByIdQuery, Types.ArtifactByIdQueryVariables>({
				skFetch: fetch,
				document: Types.ArtifactByIdDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.ArtifactByIdQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.ArtifactByIdQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.ArtifactByIdQuery, variables: Types.ArtifactByIdQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.ArtifactByIdQuery, Types.ArtifactByIdQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_ArtifactById), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_ArtifactById), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `ArtifactById` Operation
 */
export const KQL_ArtifactById = KQL_ArtifactByIdStore();

function KQL_ArtifactsStore() {
	const operationName = 'KQL_Artifacts';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.ArtifactsQuery, Types.ArtifactsQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.ArtifactsQueryVariables>
		): Promise<RequestResult<Types.ArtifactsQuery, Types.ArtifactsQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_Artifacts).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.ArtifactsQuery, Types.ArtifactsQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.ArtifactsQuery, Types.ArtifactsQueryVariables>({
				skFetch: fetch,
				document: Types.ArtifactsDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.ArtifactsQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.ArtifactsQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.ArtifactsQuery, variables: Types.ArtifactsQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.ArtifactsQuery, Types.ArtifactsQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_Artifacts), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_Artifacts), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `Artifacts` Operation
 */
export const KQL_Artifacts = KQL_ArtifactsStore();

function KQL_AssociationAddImageStore() {
	const operationName = 'KQL_AssociationAddImage';
	const operationType = ResponseResultType.Mutation;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AssociationAddImageMutation, Types.AssociationAddImageMutationVariables>>({...defaultStoreValue, operationName, operationType});

		async function mutateLocal(
			params?: RequestParameters<Types.AssociationAddImageMutationVariables>
		): Promise<RequestResult<Types.AssociationAddImageMutation, Types.AssociationAddImageMutationVariables>> {
			let { fetch, variables } = params ?? {};

			const storedVariables = get(KQL_AssociationAddImage).variables;
			variables = variables ?? storedVariables;

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AssociationAddImageMutation, Types.AssociationAddImageMutationVariables>({
				skFetch: fetch,
				document: Types.AssociationAddImageDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		mutate: mutateLocal,

	};
}
/**
 * KitQL Svelte Store with the latest `AssociationAddImage` Operation
 */
export const KQL_AssociationAddImage = KQL_AssociationAddImageStore();

function KQL_AssociationByIdStore() {
	const operationName = 'KQL_AssociationById';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AssociationByIdQuery, Types.AssociationByIdQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.AssociationByIdQueryVariables>
		): Promise<RequestResult<Types.AssociationByIdQuery, Types.AssociationByIdQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_AssociationById).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.AssociationByIdQuery, Types.AssociationByIdQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AssociationByIdQuery, Types.AssociationByIdQueryVariables>({
				skFetch: fetch,
				document: Types.AssociationByIdDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.AssociationByIdQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.AssociationByIdQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.AssociationByIdQuery, variables: Types.AssociationByIdQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.AssociationByIdQuery, Types.AssociationByIdQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_AssociationById), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_AssociationById), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `AssociationById` Operation
 */
export const KQL_AssociationById = KQL_AssociationByIdStore();

function KQL_AssociationLockStore() {
	const operationName = 'KQL_AssociationLock';
	const operationType = ResponseResultType.Mutation;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AssociationLockMutation, Types.AssociationLockMutationVariables>>({...defaultStoreValue, operationName, operationType});

		async function mutateLocal(
			params?: RequestParameters<Types.AssociationLockMutationVariables>
		): Promise<RequestResult<Types.AssociationLockMutation, Types.AssociationLockMutationVariables>> {
			let { fetch, variables } = params ?? {};

			const storedVariables = get(KQL_AssociationLock).variables;
			variables = variables ?? storedVariables;

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AssociationLockMutation, Types.AssociationLockMutationVariables>({
				skFetch: fetch,
				document: Types.AssociationLockDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		mutate: mutateLocal,

	};
}
/**
 * KitQL Svelte Store with the latest `AssociationLock` Operation
 */
export const KQL_AssociationLock = KQL_AssociationLockStore();

function KQL_AssociationPatchStore() {
	const operationName = 'KQL_AssociationPatch';
	const operationType = ResponseResultType.Mutation;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AssociationPatchMutation, Types.AssociationPatchMutationVariables>>({...defaultStoreValue, operationName, operationType});

		async function mutateLocal(
			params?: RequestParameters<Types.AssociationPatchMutationVariables>
		): Promise<RequestResult<Types.AssociationPatchMutation, Types.AssociationPatchMutationVariables>> {
			let { fetch, variables } = params ?? {};

			const storedVariables = get(KQL_AssociationPatch).variables;
			variables = variables ?? storedVariables;

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AssociationPatchMutation, Types.AssociationPatchMutationVariables>({
				skFetch: fetch,
				document: Types.AssociationPatchDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		mutate: mutateLocal,

	};
}
/**
 * KitQL Svelte Store with the latest `AssociationPatch` Operation
 */
export const KQL_AssociationPatch = KQL_AssociationPatchStore();

function KQL_AssociationReleaseLockStore() {
	const operationName = 'KQL_AssociationReleaseLock';
	const operationType = ResponseResultType.Mutation;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AssociationReleaseLockMutation, Types.AssociationReleaseLockMutationVariables>>({...defaultStoreValue, operationName, operationType});

		async function mutateLocal(
			params?: RequestParameters<Types.AssociationReleaseLockMutationVariables>
		): Promise<RequestResult<Types.AssociationReleaseLockMutation, Types.AssociationReleaseLockMutationVariables>> {
			let { fetch, variables } = params ?? {};

			const storedVariables = get(KQL_AssociationReleaseLock).variables;
			variables = variables ?? storedVariables;

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AssociationReleaseLockMutation, Types.AssociationReleaseLockMutationVariables>({
				skFetch: fetch,
				document: Types.AssociationReleaseLockDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		mutate: mutateLocal,

	};
}
/**
 * KitQL Svelte Store with the latest `AssociationReleaseLock` Operation
 */
export const KQL_AssociationReleaseLock = KQL_AssociationReleaseLockStore();

function KQL_AssociationsStore() {
	const operationName = 'KQL_Associations';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AssociationsQuery, Types.AssociationsQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.AssociationsQueryVariables>
		): Promise<RequestResult<Types.AssociationsQuery, Types.AssociationsQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_Associations).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.AssociationsQuery, Types.AssociationsQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AssociationsQuery, Types.AssociationsQueryVariables>({
				skFetch: fetch,
				document: Types.AssociationsDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.AssociationsQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.AssociationsQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.AssociationsQuery, variables: Types.AssociationsQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.AssociationsQuery, Types.AssociationsQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_Associations), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_Associations), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `Associations` Operation
 */
export const KQL_Associations = KQL_AssociationsStore();

function KQL_ItemByIdStore() {
	const operationName = 'KQL_ItemById';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.ItemByIdQuery, Types.ItemByIdQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.ItemByIdQueryVariables>
		): Promise<RequestResult<Types.ItemByIdQuery, Types.ItemByIdQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_ItemById).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.ItemByIdQuery, Types.ItemByIdQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.ItemByIdQuery, Types.ItemByIdQueryVariables>({
				skFetch: fetch,
				document: Types.ItemByIdDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.ItemByIdQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.ItemByIdQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.ItemByIdQuery, variables: Types.ItemByIdQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.ItemByIdQuery, Types.ItemByIdQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_ItemById), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_ItemById), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `ItemById` Operation
 */
export const KQL_ItemById = KQL_ItemByIdStore();

function KQL_ItemsStore() {
	const operationName = 'KQL_Items';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.ItemsQuery, Types.ItemsQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.ItemsQueryVariables>
		): Promise<RequestResult<Types.ItemsQuery, Types.ItemsQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_Items).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.ItemsQuery, Types.ItemsQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.ItemsQuery, Types.ItemsQueryVariables>({
				skFetch: fetch,
				document: Types.ItemsDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.ItemsQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.ItemsQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.ItemsQuery, variables: Types.ItemsQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.ItemsQuery, Types.ItemsQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_Items), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_Items), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `Items` Operation
 */
export const KQL_Items = KQL_ItemsStore();

function KQL_LoginStore() {
	const operationName = 'KQL_Login';
	const operationType = ResponseResultType.Mutation;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.LoginMutation, Types.LoginMutationVariables>>({...defaultStoreValue, operationName, operationType});

		async function mutateLocal(
			params?: RequestParameters<Types.LoginMutationVariables>
		): Promise<RequestResult<Types.LoginMutation, Types.LoginMutationVariables>> {
			let { fetch, variables } = params ?? {};

			const storedVariables = get(KQL_Login).variables;
			variables = variables ?? storedVariables;

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.LoginMutation, Types.LoginMutationVariables>({
				skFetch: fetch,
				document: Types.LoginDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		mutate: mutateLocal,

	};
}
/**
 * KitQL Svelte Store with the latest `Login` Operation
 */
export const KQL_Login = KQL_LoginStore();

function KQL_MeStore() {
	const operationName = 'KQL_Me';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.MeQuery, Types.MeQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.MeQueryVariables>
		): Promise<RequestResult<Types.MeQuery, Types.MeQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_Me).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.MeQuery, Types.MeQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.MeQuery, Types.MeQueryVariables>({
				skFetch: fetch,
				document: Types.MeDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.MeQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.MeQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.MeQuery, variables: Types.MeQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.MeQuery, Types.MeQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_Me), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_Me), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `Me` Operation
 */
export const KQL_Me = KQL_MeStore();

function KQL_NpcByIdStore() {
	const operationName = 'KQL_NpcById';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.NpcByIdQuery, Types.NpcByIdQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.NpcByIdQueryVariables>
		): Promise<RequestResult<Types.NpcByIdQuery, Types.NpcByIdQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_NpcById).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.NpcByIdQuery, Types.NpcByIdQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.NpcByIdQuery, Types.NpcByIdQueryVariables>({
				skFetch: fetch,
				document: Types.NpcByIdDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.NpcByIdQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.NpcByIdQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.NpcByIdQuery, variables: Types.NpcByIdQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.NpcByIdQuery, Types.NpcByIdQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_NpcById), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_NpcById), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `NpcById` Operation
 */
export const KQL_NpcById = KQL_NpcByIdStore();

function KQL_NpcsStore() {
	const operationName = 'KQL_Npcs';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.NpcsQuery, Types.NpcsQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.NpcsQueryVariables>
		): Promise<RequestResult<Types.NpcsQuery, Types.NpcsQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_Npcs).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.NpcsQuery, Types.NpcsQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.NpcsQuery, Types.NpcsQueryVariables>({
				skFetch: fetch,
				document: Types.NpcsDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.NpcsQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.NpcsQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.NpcsQuery, variables: Types.NpcsQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.NpcsQuery, Types.NpcsQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_Npcs), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_Npcs), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `Npcs` Operation
 */
export const KQL_Npcs = KQL_NpcsStore();

function KQL_PlaceByIdStore() {
	const operationName = 'KQL_PlaceById';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.PlaceByIdQuery, Types.PlaceByIdQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.PlaceByIdQueryVariables>
		): Promise<RequestResult<Types.PlaceByIdQuery, Types.PlaceByIdQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_PlaceById).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.PlaceByIdQuery, Types.PlaceByIdQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.PlaceByIdQuery, Types.PlaceByIdQueryVariables>({
				skFetch: fetch,
				document: Types.PlaceByIdDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.PlaceByIdQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.PlaceByIdQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.PlaceByIdQuery, variables: Types.PlaceByIdQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.PlaceByIdQuery, Types.PlaceByIdQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_PlaceById), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_PlaceById), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `PlaceById` Operation
 */
export const KQL_PlaceById = KQL_PlaceByIdStore();

function KQL_PlacesStore() {
	const operationName = 'KQL_Places';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.PlacesQuery, Types.PlacesQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.PlacesQueryVariables>
		): Promise<RequestResult<Types.PlacesQuery, Types.PlacesQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_Places).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.PlacesQuery, Types.PlacesQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.PlacesQuery, Types.PlacesQueryVariables>({
				skFetch: fetch,
				document: Types.PlacesDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.PlacesQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.PlacesQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.PlacesQuery, variables: Types.PlacesQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.PlacesQuery, Types.PlacesQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_Places), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_Places), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `Places` Operation
 */
export const KQL_Places = KQL_PlacesStore();

function KQL_RaceByIdStore() {
	const operationName = 'KQL_RaceById';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.RaceByIdQuery, Types.RaceByIdQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.RaceByIdQueryVariables>
		): Promise<RequestResult<Types.RaceByIdQuery, Types.RaceByIdQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_RaceById).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.RaceByIdQuery, Types.RaceByIdQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.RaceByIdQuery, Types.RaceByIdQueryVariables>({
				skFetch: fetch,
				document: Types.RaceByIdDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.RaceByIdQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.RaceByIdQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.RaceByIdQuery, variables: Types.RaceByIdQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.RaceByIdQuery, Types.RaceByIdQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_RaceById), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_RaceById), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `RaceById` Operation
 */
export const KQL_RaceById = KQL_RaceByIdStore();

function KQL_RacesStore() {
	const operationName = 'KQL_Races';
	const operationType = ResponseResultType.Query;

	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.RacesQuery, Types.RacesQueryVariables>>({...defaultStoreValue, operationName, operationType});

		async function queryLocal(
			params?: RequestQueryParameters<Types.RacesQueryVariables>
		): Promise<RequestResult<Types.RacesQuery, Types.RacesQueryVariables>> {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_Races).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.RacesQuery, Types.RacesQueryVariables>({
						variables, operationName, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.RacesQuery, Types.RacesQueryVariables>({
				skFetch: fetch,
				document: Types.RacesDocument,
				variables, 
				operationName, 
				operationType, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		}

	return {
		subscribe,

		/**
		 * Can be used for SSR, but simpler option is `.queryLoad`
		 * @returns fill this store & the cache
		 */
		query: queryLocal,

		/**
		 * Ideal for SSR query. To be used in SvelteKit load function
		 * @returns fill this store & the cache
		 */
		queryLoad: async (
			params?: RequestQueryParameters<Types.RacesQueryVariables>
		): Promise<void> => {
			if (clientStarted) {
				queryLocal(params); // No await in purpose, we are in a client navigation.
			} else {
				await queryLocal(params);
			}
		},

		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.RacesQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(operationName, { variables, allOperationKey });
			if (withResetStore) {
				set({ ...defaultStoreValue, operationName });
			}
		},

		/**
		 * Patch the store &&|| cache with some data.
		 */
		// prettier-ignore
		patch(data: Types.RacesQuery, variables: Types.RacesQueryVariables | null = null, type: PatchType = 'cache-and-store'): void {
			let updatedCacheStore = undefined;
			if(type === 'cache-only' || type === 'cache-and-store') {
				updatedCacheStore = kitQLClient.cacheUpdate<Types.RacesQuery, Types.RacesQueryVariables>(operationName, data, { variables });
			}
			if(type === 'store-only' ) {
				let toReturn = { ...get(KQL_Races), data, variables } ;
				set(toReturn);
			}
			if(type === 'cache-and-store' ) {
				set({...get(KQL_Races), ...updatedCacheStore});
			}
			kitQLClient.logInfo(operationName, "patch", type);
		}
	};
}
/**
 * KitQL Svelte Store with the latest `Races` Operation
 */
export const KQL_Races = KQL_RacesStore();
