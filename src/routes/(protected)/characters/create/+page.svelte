<script lang="ts">
	import { fromGlobalId } from '$lib/utils';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateCharacterStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import RelatedRaceSelect from '$lib/components/RelatedRaceSelect.svelte';
	import RelatedAssociationMultiSelect from '$lib/components/RelatedAssociationMultiSelect.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const createMutation = new CreateCharacterStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		if (res.data?.createCharacter.__typename === 'Character') {
			const { id: globalId } = res.data.createCharacter;
			const { id } = fromGlobalId(globalId);
			goto(`/characters/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate>
		<svelte:fragment slot="properties">
			<Spacer lg />
			<RelatedRaceSelect />
			<Spacer lg />
			<RelatedAssociationMultiSelect />
			<Spacer lg />
		</svelte:fragment>
	</LayoutCreate>
</form>
