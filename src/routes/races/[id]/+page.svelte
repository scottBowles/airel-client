<script context="module" lang="ts">
	import { page } from '$app/stores';
	import raceDetails from '$lib/graphql/customStores/raceDetails';
	import { KQL_RaceAddImage, KQL_RaceLock, KQL_RacePatch } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyRace } from './_utils';

	export const load = async ({ fetch, params }) => {
		await raceDetails.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: raceStore = raceDetails.byId(variables);
	$: ({ status, errors, data } = $raceStore);
	$: ({ race } = data || {});

	const form = writable({ ...emptyRace });
	onMount(setForm);

	function setForm() {
		if (race) {
			$form = race;
		}
	}

	function patchStore(patch) {
		const update = { race: { ...race, ...patch } };
		raceDetails.patch(update, variables);
	}

	function refreshFromNetwork() {
		raceDetails.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_RaceLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			somethingWentWrong(lockRes.errors[0].message);
			return;
		}
		patchStore(lockRes.data.raceLock.race);
		setForm();
		return;
	}

	async function onFormSubmit() {
		const patch = {
			name: $form.name,
			description: $form.description,
			markdownNotes: $form.markdownNotes
		};

		const { data, errors: resErrors } = await KQL_RacePatch.mutate({ variables: { id, ...patch } });

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { race: updatedRace, errors, ok } = data.racePatch;
		if (ok) patchStore(updatedRace);
		if (errors) somethingWentWrong(errors);
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(error);
			return;
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_RaceAddImage.mutate({
				variables: { id, imageId: result.info.public_id }
			});

			if (resErrors) {
				somethingWentWrong(resErrors[0].message);
				return;
			}

			const { race, errors, ok } = data.raceAddImage;
			if (ok) patchStore(race);
			if (ok && race.lockedBySelf) $form.imageIds = race.imageIds;
			if (errors) somethingWentWrong(errors);
		}
	}
</script>

<DetailBase
	{race}
	{form}
	{status}
	{errors}
	{onEditClick}
	{onFormSubmit}
	{onImageUpload}
	{patchStore}
/>
<!-- <KitQLInfo store={raceDetails} /> -->
