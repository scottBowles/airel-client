<script lang="ts">
	import { fromGlobalId } from '$lib/utils';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateAssociationStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import RelatedCharacterMultiSelect from '$lib/components/RelatedCharacterMultiSelect.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const createMutation = new CreateAssociationStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;

		if (!name) error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		if (res.data?.createAssociation.__typename === 'Association') {
			const { id: globalId } = res.data.createAssociation;
			const { id } = fromGlobalId(globalId);
			goto(`/associations/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate>
		<svelte:fragment slot="properties">
			<Spacer lg />
			<RelatedCharacterMultiSelect entityDisplayName="Members" />
			<Spacer lg />
		</svelte:fragment>
	</LayoutCreate>
</form>
