import { page } from '$app/stores';
import artifactDetails from '$lib/graphql/customStores/artifactDetails';
import {
	KQL_ArtifactAddImage,
	KQL_ArtifactLock,
	KQL_ArtifactPatch
} from '$lib/graphql/_kitql/graphqlStores';
import { somethingWentWrong } from '$lib/utils';
import { KitQLInfo } from '@kitql/all-in';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import DetailBase from '../_DetailBase.svelte';
import { emptyArtifact } from '../_utils';

export const load = async ({ fetch, params }) => {
	await artifactDetails.queryLoad({ fetch, variables: { id: params.id } });
	return {};
};
