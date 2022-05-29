<script context="module" lang="ts">
	import { page } from '$app/stores';
	import {
		KQL_PlaceAddImage,
		KQL_PlaceById,
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
		await KQL_PlaceById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_PlaceById);
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
		KQL_PlaceById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_PlaceById.query({ variables, settings: { policy: 'cache-and-network' } });
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

<DetailBase {place} {form} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_PlaceById} /> -->
