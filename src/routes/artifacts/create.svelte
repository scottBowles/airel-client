<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_ArtifactCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';
</script>

<script>
	let artifact = { imageIds: [] };

	async function onFormSubmit(e) {
		const variables = { ...artifact };
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {
			variables[key] = value;
		});

		const { data, errors: resErrors } = await KQL_ArtifactCreate.mutate({
			variables
		});

		if (resErrors) {
			// handle resErrors
		}

		const { artifact: newArtifact, errors, ok } = data.artifactCreate;
		if (ok) {
			goto(`/artifacts/${newArtifact.id}`);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			artifact.imageIds = [...artifact.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {artifact} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_ArtifactById} /> -->
