<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_ArtifactCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyArtifact } from './_utils';
</script>

<script>
	const artifact = writable(emptyArtifact);

	async function onFormSubmit() {
		const variables = $artifact;
		const { data, errors: resErrors } = await KQL_ArtifactCreate.mutate({ variables });

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { artifact: newArtifact, errors, ok } = data.artifactCreate;
		if (ok) {
			goto(`/artifacts/${newArtifact.id}`);
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
			$artifact.imageIds = [...$artifact.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {artifact} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_ArtifactById} /> -->
