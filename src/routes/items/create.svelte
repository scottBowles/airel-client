<script>
	import { goto } from '$app/navigation';
	import { KQL_ItemCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyItem } from './_utils';

	const form = writable(emptyItem);

	$: console.log({ form: $form });

	async function onFormSubmit() {
		const variables = $form;
		const { data, errors: resErrors } = await KQL_ItemCreate.mutate({ variables });

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { item: newItem, errors, ok } = data.itemCreate;
		if (ok) goto(`/items/${newItem.id}`);
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
<!-- <KitQLInfo store={KQL_ItemById} /> -->
