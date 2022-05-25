<script>
	import { goto } from '$app/navigation';
	import { KQL_PlaceCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyPlace } from './_utils';

	const form = writable(emptyPlace);

	async function onFormSubmit() {
		const variables = $form;
		const { data, errors: resErrors } = await KQL_PlaceCreate.mutate({ variables });

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { place: newPlace, errors, ok } = data.placeCreate;
		if (ok) goto(`/places/${newPlace.id}`);
		if (errors) somethingWentWrong(errors);
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(JSON.stringify(error));
			return;
		}
		if (result?.event === 'success') {
			$form.imageIds = [...$form.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {form} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_PlaceById} /> -->
