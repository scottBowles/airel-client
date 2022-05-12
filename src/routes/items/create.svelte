<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_ItemCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';
</script>

<script>
	let item = { imageIds: [] };

	async function onFormSubmit(e) {
		const variables = { ...item };
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {
			variables[key] = value;
		});

		const { data, errors: resErrors } = await KQL_ItemCreate.mutate({
			variables
		});

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { item: newItem, errors, ok } = data.itemCreate;
		if (ok) {
			goto(`/items/${newItem.id}`);
		}
		if (errors) {
			somethingWentWrong(errors);
		}
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(JSON.stringify(error));
			return;
		}
		if (result?.event === 'success') {
			item.imageIds = [...item.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {item} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_ItemById} /> -->
