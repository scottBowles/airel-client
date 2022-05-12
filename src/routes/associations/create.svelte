<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_AssociationCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';
</script>

<script>
	let association = { imageIds: [] };

	async function onFormSubmit(e) {
		const variables = { ...association };
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {
			variables[key] = value;
		});

		const { data, errors: resErrors } = await KQL_AssociationCreate.mutate({
			variables
		});

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
		}

		const { association: newAssociation, errors, ok } = data.associationCreate;
		if (ok) {
			goto(`/associations/${newAssociation.id}`);
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
			association.imageIds = [...association.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {association} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_AssociationById} /> -->
