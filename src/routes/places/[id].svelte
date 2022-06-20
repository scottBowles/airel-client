<script context="module" lang="ts">
	import { page } from '$app/stores';
	import placeDetails from '$lib/graphql/customStores/placeDetails';
	import {
		KQL_PlaceAddImage,
		KQL_PlaceLock,
		KQL_PlacePatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyPlace } from './_utils';

	export const load = async ({ fetch, params }) => {
		await placeDetails.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	$: ({ id } = $page.params);
	$: variables = { id }; // for requests

	$: store = placeDetails.byId(variables);
	$: ({ status, errors, data } = $store);
	$: ({ place } = data || {});

	const form = writable({ ...emptyPlace });
	onMount(setForm);

	function setForm() {
		if (place) {
			$form = {
				name: place.name,
				description: place.description,
				markdownNotes: place.markdownNotes,
				imageIds: place.imageIds,
				placeType: place.placeTypeDisplay,
				parent: place.parent?.id,
				children: place.children.edges.map(({ node }) => node.id)
			};
		}
	}

	function patchStore(patch) {
		const update = { place: { ...place, ...patch } };
		placeDetails.patch(update, variables);
	}

	function refreshFromNetwork() {
		placeDetails.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_PlaceLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			somethingWentWrong(lockRes.errors[0].message);
			return;
		}
		patchStore(lockRes.data.placeLock.place);
		setForm();
		return;
	}

	async function onFormSubmit() {
		const patch = {
			name: $form.name,
			description: $form.description,
			markdownNotes: $form.markdownNotes,
			placeType: $form.placeType,
			parent: $form.parent,
			children: $form.children
		};

		const { data, errors: resErrors } = await KQL_PlacePatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { place: updatedPlace, errors, ok } = data.placePatch;
		if (ok) patchStore(updatedPlace);
		if (errors) somethingWentWrong(errors);
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(error);
			return;
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_PlaceAddImage.mutate({
				variables: { id, imageId: result.info.public_id }
			});

			if (resErrors) {
				somethingWentWrong(resErrors[0].message);
				return;
			}

			const { place, errors, ok } = data.placeAddImage;
			if (ok) patchStore(place);
			if (ok && place.lockedBySelf) $form.imageIds = place.imageIds;
			if (errors) somethingWentWrong(errors);
		}
	}
</script>

<DetailBase
	{place}
	{form}
	{status}
	{errors}
	{onEditClick}
	{onFormSubmit}
	{onImageUpload}
	{patchStore}
/>
<!-- <KitQLInfo store={placeDetails} /> -->
