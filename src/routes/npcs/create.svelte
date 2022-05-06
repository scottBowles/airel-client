<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_NpcCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';
</script>

<script>
	let npc = { imageIds: [] };

	async function onFormSubmit(e) {
		const variables = { ...npc };
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {
			variables[key] = value;
		});

		const { data, errors: resErrors } = await KQL_NpcCreate.mutate({
			variables
		});

		if (resErrors) {
			// handle resErrors
		}

		const { npc: newNpc, errors, ok } = data.npcCreate;
		if (ok) {
			goto(`/npcs/${newNpc.id}`);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			npc.imageIds = [...npc.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {npc} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_NpcById} /> -->
