<script context="module" lang="ts">
	import { page } from '$app/stores';
	import {
		KQL_ArtifactAddImage,
		KQL_ArtifactById,
		KQL_ArtifactLock,
		KQL_ArtifactPatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyArtifact } from './_utils';

	export const load = async ({ fetch, params }) => {
		await KQL_ArtifactById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script lang="ts">
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_ArtifactById);
	$: ({ artifact } = data || {});

	$: console.log({ artifact });

	const form = writable(emptyArtifact);
	onMount(setForm);

	function setForm() {
		$form = {
			name: artifact.name,
			description: artifact.description,
			markdownNotes: artifact.markdownNotes,
			items: artifact.items.edges.map(({ node }) => node.id),
			imageIds: artifact.imageIds
		};
	}
	$: console.log($form);

	function patchStore(patch) {
		const update = { artifact: { ...artifact, ...patch } };
		KQL_ArtifactById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_ArtifactById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_ArtifactLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			somethingWentWrong(lockRes.errors[0].message);
			return;
		}
		patchStore(lockRes.data.artifactLock.artifact);
		setForm();
		return;
	}

	async function onFormSubmit() {
		const patch = {
			name: $form.name,
			description: $form.description,
			markdownNotes: $form.markdownNotes,
			items: $form.items
		};

		const { data, errors: resErrors } = await KQL_ArtifactPatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) somethingWentWrong(resErrors[0].message);

		const { artifact: updatedArtifact, errors, ok } = data.artifactPatch;
		if (ok) patchStore(updatedArtifact);
		if (errors) somethingWentWrong(errors);
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(error.message);
			return;
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_ArtifactAddImage.mutate({
				variables: {
					id,
					imageId: result.info.public_id
				}
			});
			if (resErrors) {
				somethingWentWrong(resErrors[0].message);
			}
			const { artifact, errors, ok } = data.artifactAddImage;
			if (ok) patchStore(artifact);
			if (ok && artifact.lockedBySelf) $form.imageIds = artifact.imageIds;
			if (errors) somethingWentWrong(errors);
		}
	}
</script>

<DetailBase {artifact} {form} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_ArtifactById} /> -->
