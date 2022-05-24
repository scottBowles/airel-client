<script>
	import { goto } from '$app/navigation';
	import { KQL_AssociationCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyAssociation } from './_utils';

	const form = writable(emptyAssociation);

	async function onFormSubmit(e) {
		const variables = $form;
		const { data, errors: resErrors } = await KQL_AssociationCreate.mutate({ variables });

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { association: newAssociation, errors, ok } = data.associationCreate;
		if (ok) goto(`/associations/${newAssociation.id}`);
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
<!-- <KitQLInfo store={KQL_AssociationById} /> -->
