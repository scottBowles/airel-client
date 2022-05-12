<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_NpcCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
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
			somethingWentWrong(resErrors[0].message);
		}

		const { npc: newNpc, errors, ok } = data.npcCreate;
		if (ok) {
			goto(`/npcs/${newNpc.id}`);
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
			npc.imageIds = [...npc.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {npc} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_NpcById} /> -->
