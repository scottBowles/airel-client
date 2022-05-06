<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_PlaceCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';
</script>

<script>
	let place = { imageIds: [] };

	async function onFormSubmit(e) {
		const variables = { ...place };
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {
			variables[key] = value;
		});

		const { data, errors: resErrors } = await KQL_PlaceCreate.mutate({
			variables
		});

		if (resErrors) {
			// handle resErrors
		}

		const { place: newPlace, errors, ok } = data.placeCreate;
		if (ok) {
			goto(`/places/${newPlace.id}`);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			place.imageIds = [...place.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {place} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_PlaceById} /> -->
